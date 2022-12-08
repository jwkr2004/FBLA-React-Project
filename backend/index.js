var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
const app = express();
//var session = require('express-session');
const Login = require("./model/LoginSchema");
const eventsSchema = require("./model/EventsSchema");
const Students = require("./model/StudentsSchema");
const url = "mongodb://localhost:27017/EventTrackerDB";
mongoose.connect("mongodb://localhost:27017/EventTrackerDB")

/*mongoose
    .connect(url)
    .then(() => {
        console.log("Connected to the database!")
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })
*/
var properties = {
    secret: 'fihf97r2y3fyigh29g08w7p34j803h0vit',
    cookie: {}
}

//app.use(session(properties));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
);
/*app.post("/test", (req, res) => {
    const data = new LoggedIn({
        fname: req.body.fName,
        lname: req.body.lName,
    });
    data.save();
    console.log(req.body);
    res.end();
});*/

app.post("/newEvent", async(req, res) => {
    const data = new eventsSchema(req.body);
    console.log(req.body);
    console.log(data);
    await data.save();
    res.end();
});

app.listen(3001, () => {
    console.log("Server running on Port 3001.");
});