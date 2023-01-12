const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const CookieParser = require("cookie-parser")
const app = express();
const Accounts = require("./model/AccountSchema");
const Events = require("./model/EventsSchema");
// const { redirect } = require("react-router-dom");
const url = "mongodb://localhost:27017/EventTrackerDB";
const saltRounds = 10;

mongoose
    .connect(url)
    .then(() => {
        console.log("Connected to the database!")
    })
    .catch(err => {
        console.error('Connection error', err.message)
    })

app.use(
    cors({
      origin: ['http://localhost:3000'],
      methods: ["GET", "POST"],
      credentials: true,
    })
);

app.use(express.json());
app.use(CookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    key: "UserID",
    secret: 'EuF6C2rqPh55nGyuyuAbG9hyCLmqLQNb',
    resave: false,
    saveUninitialized: false,
    cookie: {expires: 2 * 60 * 60 * 1000}
}));

app.post("/newevent", async(req, res) => {
    var data = new Events(req.body);
    console.log(data);
    data.save();
    res.send({ message: "Event Created" }); 
});

app.post("/newaccount", (req, res) => {
    Accounts.find({username: req.body.username}, (err, user) => {
        if(user.length > 0) {
            res.send({message:"Username Already Exists"});
        }
        else {
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                if(err) {
                    console.log(err);
                }
                req.body.password = hash;
                //console.log(req.body);
                var data = new Accounts(req.body);
                data.save();
            });
            res.send({message:"Account Created"});
        }
    });
});

app.post("/login", async(req, res) => {
    Accounts.find({username: req.body.username}, (err, user) => {
        if (err) {
            res.send({error:err, message:"An Error Has Occured"})
        }
        if(user.length > 0) {
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(result) {
                    req.session.user = user[0];
                    //console.log(req.session.user);
                    res.send({ user: user[0], message: `User, ${user[0].username} has logged in.` });
                }
                else {
                    res.send({message:"Incorrect Password"})
                }
            }) 
        }
        else {
            res.send({message:"User Not Found"})
        }
    });
});

app.get("/", async (req, res) => {
    if(req.cookies.UserID && !req.session.user) {
        //res.clearCookie("UserID")
        //console.log("Deleted Cookie")
    }
    else {
        //console.log(req.session.user)
    }
})

app.get('/AdminStudents', async (req, res) => {

});

app.get('/getuser', async (req, res) => {
    var user = req.session.user;
    //console.log(user)
    if(user !== undefined) {
        res.send({id:user._id, username:user.username, isAdmin:user.isAdmin, firstname:user.firstname, lastname:user.lastname, grade:user.grade, points:user.points})
    }
    else{
        res.send("User Not Logged In")
    }
});

app.get("/logout", async (req, res) => {
    /*Accounts.find({ isAdmin: false }, (err, users) => {
        res.send(users);
    });*/
    req.session.destroy()
    res.send();
});

app.get('/isloggedin', async (req, res) => {
    if(req.cookies.UserID !== undefined) {
        res.send({loggedin:true});
    }
    else {
        res.send({loggedin:false});
    }
    //console.log(req.cookies.UserID);
});
app.get("/getstudents", async (req, res) => {
    Accounts.find({ isAdmin: false }, (err, users) => {
        res.send(users);
    });
});
app.post("/eventSearch", async (req, res) => {
    Events.find({ EName: req.body.search }, (err, result) => {
        res.send(result);
        console.log(result);
    });
})
app.post("/studentSearch", async (req, res) => {
    Accounts.find({ firstname: req.body.search }, (err, result) => {
        res.send(result);
        console.log(result);
    });
})
app.get("/getevents", async (req, res) => {
    Events.find({}, (err, events) => {
        res.send(events)
    });
});
app.get("/getstudents", async (req, res) => {
    // res.send(events);
});
app.listen(3001, () => {
    console.log("Server running on Port 3001.");
});