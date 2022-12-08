const mongoose = require("mongoose")
const StudentsSchema = new mongoose.Schema({
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    grade: {
        type: String
    },
    points: {
        type: String
    }
});
module.exports = mongoose.model('Students', StudentsSchema);