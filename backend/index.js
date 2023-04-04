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
// Defines the location of the database
const url = "mongodb://localhost:27017/EventTrackerDB";
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
    var date = new Date();
    var data = new Reports({time: date, accounts: req.body.data, title: req.body.title});
    data.save();
    res.send({ message: "Report Created" });
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
    console.log(rid);
    Reports.find({ _id: rid }, (err, report) => {
        console.log(report);
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
//Updates a Event
app.post("/editevent", async(req, res) => {
    var event = req.body;
    console.log(event);
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
        res.send({user});
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
    // Finds the user in the database that matches the currently logged in user
    let doc = await Accounts.findOne({ username: req.body.user.username });
    // If the user does not yet have the currently selected event added to their account, the event is added. Otherwise a message is sent to the front-end
    if (!doc.events.includes(req.body.event.EName)){
        // Adds the event to the list of events that the user is involved in
        doc.events.push(req.body.event.EName);
        // Updates the user's points in the database
        doc.points = doc.points + req.body.event.Points;
        await doc.save();
        req.session.user.points = doc.points;
        // Sends a message to the front-end if the user has successfully joined an event
        res.send({ message: "Joined Event" });
    }
    else if (doc.events.includes(req.body.event.EName)) {
        // Sends a message to the front-end if the user has already joined a specific event
        res.send({ message: "Event Already Joined" });
    }
    else {
        res.send();
    };
});
// Starts the back-end server on port 3001
app.listen(3001, () => {
    console.log("Server running on Port 3001.");
});