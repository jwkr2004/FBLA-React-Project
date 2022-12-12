const mongoose = require("mongoose")
const LoginSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean
    }
});
module.exports = mongoose.model('Login', LoginSchema);