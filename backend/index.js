// Imports all of the necessary Node Modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const CookieParser = require("cookie-parser");
// Creates a variable to call the express module
const app = express();
// Defines the paths for the Schemas used
const Accounts = require("./model/AccountSchema");
const Events = require("./model/EventsSchema");
const Reports = require("./model/ReportSchema");
const Requests = require("./model/RequestSchema");
// Defines the location of the database
const url = "mongodb://127.0.0.1/EventTrackerDB";
// Sets the number of saltrounds for password hashing
const saltRounds = 10;
// Connnects to the MongoDB Database using Mongoose
mongoose
    .set('strictQuery', true)
    .connect(url)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.error("Connection error", err.message);
    });

// Sets up cors functionality to allow for interaction between the front-end and the back-end server
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    })
);
// Adds JSON, CookieParser, and BodyParser functionality
app.use(express.json());
app.use(CookieParser());
app.use(bodyParser.urlencoded({extended:true}));
// Defines the properties for the session when a user logs in
app.use(session({
    key: "UserID",
    secret: "EuF6C2rqPh55nGyuyuAbG9hyCLmqLQNb",
    resave: false,
    saveUninitialized: false,
    // Sets up the session's cookie and sets it to expire in 1 hour
    cookie: {expires: 60 * 60 * 1000, secure: false}
}));
//Generates a report
app.post("/generatereport", (req, res) => {
    function selectPrize(points) {
        if(points >= 2000) {
            return "Extra Credit"
        }
        else if(points >= 1000) {
            return "Pizza Party"
        }
        else if(points >= 500) {
            return "School Spirit T-Shirt"
        }
        else if(points >= 300) {
            return "Cookies"
        }
        else if(points >= 200) {
            return "Lanyard"
        }
        else if(points >= 100) {
            return "Spirit Stickers"
        }
        else if(points >= 0) {
            return "Raffle Ticket Entry"
        }
    }
    Accounts.find({ isAdmin: false }, (err, data) => {
        if(err) {
            console.error(err)
        }
        var arr = [
            {
                prize:"",
                name:""
            },
            {
                prize:"",
                name:""
            },
            {
                prize:"",
                name:""
            },
            {
                prize:"",
                name:""
            },
            {
                prize:"",
                name:""
            },
            {
                prize:"",
                name:""
            },
            {
                prize:"",
                name:""
            },
            {
                prize:"",
                name:""
            }
        ]
        let students = {
            grade9:[],
            grade10:[],
            grade11:[],
            grade12:[]
        };
        data.forEach((val, index) => {
            students[`grade${data[index].grade}`].push(data[index]);
        });
        var incr = 0;
        Object.keys(students).forEach((val, index, array) => {
            // students[val].sort((p1, p2) => (p1.points < p2.points) ? 1 : (p1.points > p2.points) ? -1 : 0);
            // winners["g"+Number(9+Number(index))+"Most"].name = students[val][0].username;
            // students[val].shift();
            // winners["g"+Number(9+Number(index))+"Rand"].name = students[val][Math.floor(Math.random()*students[val].length)].username;
            students[val].sort((p1, p2) => (p1.points < p2.points) ? 1 : (p1.points > p2.points) ? -1 : 0);
            var mPoints = students[val][0]
            arr[incr].name = mPoints.username;
            arr[incr].prize = selectPrize(mPoints.points);
            students[val].shift();     
            incr++;
            var random = students[val][Math.floor(Math.random()*students[val].length)]
            arr[incr].name = random.username;
            arr[incr].prize = selectPrize(random.points);
            incr++;
        });
        var date = new Date();
        // console.log(req.body.data);
        var data = new Reports({time: date, accounts: req.body.data, title: req.body.title, winners:arr});
        console.log("Test", arr);
        data.save();
        res.send({ message: "Report Created" });
    });
});
//Get all reports that where created
app.get("/getreports", (req, res) => {
    Reports.find({}, (err, reports) => {
        if(err) {
            console.error(err);
        }
        res.send(reports);
    });
});
//Get the report the user clicks
app.post("/getreportbyid", async(req, res) => {
    var rid = req.body.rid;
    Reports.find({ _id: rid }, (err, report) => {
        if(err) {
            res.send({message: "Report Not Found"});
        }
        if(report !== undefined) {
            res.send({report});
        }
    });  
});
// Upon receiving a post, creates a new event and stores it in the database
app.post("/newevent", (req, res) => {
    // Saves the newly created event to the database
    var data = new Events(req.body);
    data.save();
    // Sends a message to the front-end if the event is successfully created
    res.send({ message: "Event Created" });
});
//us a Event
app.post("/editevent", async(req, res) => {
    var event = req.body;
    // console.log(event);
    var data = await Events.findOneAndUpdate({_id: event.eid}, {Image:event.Image, EName:event.EName, EBio:event.EBio, Points:event.Points, DateandTime:event.DateandTime})
    data.save();
    res.send({message:"Event Updated"});
});
//Deletes a Event
app.post("/deleteevent", async(req, res) => {
    var event = req.body;
    Events.findOneAndDelete({_id: event.eid}, (err) => {
        if(err) {
            console.error(err);
        }
    });
    res.send({message:"Event Deleted"});
});
//Deletes a Acco3unt
app.post("/deleteaccount", async(req, res) => {
    var user = req.body;
    Accounts.findOneAndDelete({_id: user.uid}, (err) => {
        if(err) {
            console.error(err);
        }
    });
    res.send({message:"Account Deleted"});
});
// Adds the new account to the database and hashes the password
app.post("/newaccount", (req, res) => {
    // Checks the database to see if the username entered already exists
    Accounts.find({username: req.body.username}, (err, user) => {
        if(err) {
            console.error(err);
        };
        if(user.length > 0) {
            // Sends a message to the front-end if the username already exists
            res.send({message:"Username Already Exists"});
        }
        else {
            // If the username does not exist, the password is hashed and the account is stored in the database
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                if(err) {
                    console.error(err);
                }
                req.body.password = hash;
                var data = new Accounts(req.body);
                data.save();
            });
            // Sends a message to the front-end if the account is created
            res.send({message:"Account Created"});
        };
    });
});
//Updates a account 
app.post("/editaccount", async(req, res) => {
    var user = req.body;
    var data = await Accounts.findOneAndUpdate({_id: user.uid}, {username:user.username, isAdmin:user.isAdmin, firstname:user.firstname, lastname:user.lastname, grade:user.grade, points:user.points})
    data.save();
    res.send({message:"Account Updated"});
});
//Deletes a Account
app.post("/deleteaccount", async(req, res) => {
    var user = req.body;
    Accounts.findOneAndDelete({_id: user.uid}, (err) => {
        if(err) {
            console.error(err);
        }
    });
    res.send({message:"Account Deleted"});
});
// Logs the user in if the username and password entered match the username and password in the database
app.post("/login", async(req, res) => {
    // Checks the database to see if the username entered exists
    Accounts.find({username: req.body.username}, (err, user) => {
        if (err) {
            console.error(err);
            // Sends a message to the front-end if an error occured
            res.send({error:err, message:"An Error Has Occured"});
        };
        if(user.length > 0) {
            // Unhashes the password for the account in the database and compares it to the password entered
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    console.error(err);
                };
                if(result) {
                    req.session.user = user[0];
                    // Sends a message to the front-end if the user has logged in
                    res.send({ user: user[0], message: `User, ${user[0].username} has logged in.` });
                }
                else {
                    // Sends a message to the front-end if the user has entered the wrong password for the account
                    res.send({message:"Incorrect Password"});
                };
            });
        }
        else {
            // Sends a message to the front-end if there isn't a user found in the database that matches the login
            res.send({message:"User Not Found"});
        };
    });
});
// Gets the currently logged in user
app.get("/getuser", async(req, res) => {
    var user = req.session.user;
    // If the session exists, the user's details are sent to the front-end
    if(user !== undefined) {
        if(user.theme === undefined) {
            user.theme = 'light';
            res.send({user});
        }
        else {
            res.send({user});
        }
    }
    // If the session does not exist, a message is sent to the front-end 
    else{
        res.send("User Not Logged In");
    };
});
// Gets the user by an ID
app.post("/getuserbyid", async(req, res) => {
    var uid = req.body.uid;
    Accounts.find({ _id: uid }, (err, user) => {
        if(err) {
            res.send({message: "User Not Found"});
        }
        if(user !== undefined) {
            res.send({user});
        }
    });  
});
// Logs the user out of their account and deletes the current session
app.get("/logout", async(req, res) => {
    req.session.destroy();
    res.clearCookie("UserID", { path: "/" });
    res.send();
});
// Checks to see if a user is currently logged in
app.get("/isloggedin", async(req, res) => {
    // If the cookie exists but the session does not, deletes the cookie
    if(req.cookies.UserID && !req.session.user) {
        res.clearCookie("UserID", { path: "/" });
        res.send();
    }
    // If the session exists but the cookie does not, deletes the session
    else if(!req.cookies.UserID && req.session.user) {
        req.session.destroy();
        res.send();
    }
    // If the cookie and the session exist, a message is sent to the front end that the user is logged in if the cookie's UserID is not undefined
    else {
        if(req.cookies.UserID !== undefined) {
            res.send({loggedin:true, user: req.session});
        }
        else {
            res.send({loggedin:false});
        };
    };
});
// Gets all students from the database
app.get("/getstudents", async(req, res) => {
    // Adds every user to the students array if the user in the database is not an admin. Sort is also used to sort the array alphabetically
    const students = await Accounts.find({ isAdmin: false }).sort({ username: "asc"});
    // Sends the students array of all students to the front end
    res.send(students);
});
// Gets all Events from the Database
app.get("/getevents", async(req, res) => {
    Events.find({}, (err, events) => {
        if(err) {
            console.error(err);
        }
        // Sends all of the events found to the front-end
        res.send(events);
    });
});
app.get("/getUsers", async (req, res) => {
    const users = await Accounts.find({});
    res.send({users});
});
app.post("/geteventbyid", async(req, res) => {
    var eid = req.body.eid;
    Events.find({ _id: eid }, (err, event) => {
        if(err) {
            res.send({message: "Event Not Found"})
        }
        else {
            res.send({event});
        }
    })
});
app.get("/", async (req, res) => {
    Events.find({}, (err, events) => {
        if (err) {
            console.error(err);
        }
        // Sends all of the events found to the front-end
        res.send(events);
    });
});
// Updates the user's points
app.post("/updatepoints", async(req, res) => {
    let doc = await Requests.findOne({ Student: req.body.user.username, Event: req.body.event.EName });
    let doc2 = await Accounts.findOne({ username: req.body.user.username });
    if (!doc2.events.includes(req.body.event.EName) && !doc) {
        var date = new Date();
        var data = new Requests({ Student: req.body.user.username, Event: req.body.event.EName, Points: req.body.event.Points, Date: date });
        await data.save();
        res.send({ message: "Event Requested" });
    }
    else if (doc2.events.includes(req.body.event.EName)) {
        res.send({ message: "Event Already Joined" });
    }
    else if(doc){
        res.send({ message: "Event Already Requested" });
    }
    else {
        res.send();
    }
});
app.post("/addPoints", async (req, res) => {
    let request = req.body.request;
    let doc = await Accounts.findOne({ username: request.Student });
    if (doc) {
        doc.events.push(request.Event);
        doc.points = doc.points + request.Points;
        await doc.save();
        Requests.findOneAndDelete({ Student: request.Student, Event: request.Event }, (err) => {
            if (err) {
                console.error(err);
            }
            res.send({ message: "Joined Event" });
        });
    }
    else {
        res.send({ message: "Already Joined Event"});
    }
});
app.post("/declineRequest", async (req, res) => {
    Requests.findOneAndDelete({ Student: req.body.request.Student, Event: req.body.request.Event }, (err) => {
        if (err) {
            console.error(err);
        }
        res.send({ message: "Requested Deleted" });
    });
});

    // // If the user does not yet have the currently selected event added to their account, the event is added. Otherwise a message is sent to the front-end
    // if (!doc){
    //     // Adds the event to the list of events that the user is involved in
    //     // doc.events.push(req.body.event.EName);
    //     // // Updates the user's points in the database
    //     // doc.points = doc.points + req.body.event.Points;
    //     var data = new Request(req.body.user.username, req.body.event.EName, req.body.event.Points, {});
    //     await data.save();
    //     // Sends a message to the front-end if the user has successfully joined an event
    //     res.send({ message: "Requested" });
    // }
    // else if(doc){
    //     // Sends a message to the front-end if the user has already joined a specific event
    //     res.send({ message: "Event Already Requested" });
    // }
    // else {
    //     res.send();
    // };
    
// Gets all the request from the database
app.get("/getrequests", async (req, res) => {
    Requests.find({}, (err, requests) => {
        if (err) {
            console.error(err);
        }
        // Sends all of the requests found to the front-end
        res.send(requests);
    });
});
app.post("/updateTheme", async(req, res) => {
    let doc = req.body;
    let doc2 = await Accounts.findOne({ username: doc.user });
    if(doc2){
        doc2.theme = doc.theme;
        doc2.save();
        await console.log(doc2.theme, "=", doc.theme);
    }
    console.log("Updated Account", doc2)
});
// Starts the back-end server on port 3001
app.listen(3001, () => {
    console.log("Server running on Port 3001.");
});