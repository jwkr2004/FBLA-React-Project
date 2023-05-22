const mongoose = require("mongoose")
const RequestSchema = new mongoose.Schema({
    Student: {
        type: String
    },
    Event: {
        type: String
    },
    Points: {
        type: Number
    },
    Date: {
        type: Date
    }
});
module.exports = mongoose.model('request', RequestSchema);