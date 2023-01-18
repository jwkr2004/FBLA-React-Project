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
module.exports = mongoose.model('accounts', AccountSchema, 'accounts');