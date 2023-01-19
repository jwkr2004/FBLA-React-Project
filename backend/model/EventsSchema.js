const mongoose = require("mongoose")
const EventsSchema = new mongoose.Schema({
    Image: {
        type: String
    },
    EName: {
        type: String
    },
    EBio: {
        type: String
    },
    Points: {
        type: Number
    },
    Date: {
        type: Date
    }
});
module.exports = mongoose.model('events', EventsSchema);