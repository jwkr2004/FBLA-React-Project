const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require("bcrypt");
const session = require("express-session");
const { v4: uuidv4 } = require('uuid');

const app = express();
const Login = require("./model/LoginSchema");
const eventsSchema = require("./model/EventsSchema");
const Students = require("./model/StudentsSchema");

const url = "mongodb://localhost:27017/EventTrackerDB";

mongoose
    .connect(url)
    .then(() => {
        console.log("Connected to the database!")
    })
    .catch(err => {
        console.error('Connection error', err.message)
    })

var properties = {
    genid: function (req) {
        return uuidv4();
      },
    secret: 'EuF6C2rqPh55nGyuyuAbG9hyCLmqLQNb',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000, secure: true}
}

app.use(express.urlencoded({extended:false}));
app.use(session(properties));
app.use(passport.initialize());
app.use(passport.session());
app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
);


app.get("/", async(req, res) => {
    res.end();
});

app.post("/newevent", async(req, res) => {
    const data = new eventsSchema(req.body);
    console.log(data);
    await data.save();
    res.end();
});

app.listen(3001, () => {
    console.log("Server running on Port 3001.");
});