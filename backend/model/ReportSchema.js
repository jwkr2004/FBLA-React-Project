const mongoose = require("mongoose");
const AccountSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    grade: {
        type: Number
    },
    points: {
        type: Number
    },
    events: {
        type: Array
    }
});

// const PrizeNameSchema = new mongoose.Schema({
//     prize: {
//         type: String
//     },
//     name: {
//         type: String
//     },
// });

const WinnerSchema = new mongoose.Schema({
    prize: {
        type: String
    },
    name: {
        type: String
    }
});

const ReportSchema = new mongoose.Schema({
    time: {
        type: Date
    },
    accounts:[AccountSchema],
    title: {
        type: String
    },
    winners:[WinnerSchema]
});
module.exports = mongoose.model('reports', ReportSchema);