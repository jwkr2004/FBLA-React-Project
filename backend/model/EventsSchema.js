const mongoose = require("mongoose")
const EventsSchema = new mongoose.Schema({
    image: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    points: {
        type: Number
    }
});
module.exports = mongoose.model('events', EventsSchema);