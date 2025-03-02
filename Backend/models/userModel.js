const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname : String,
    lname : String,
    email : String,
    password : String,
    profileImg : String,
    role: {
        type: String,
        enum: ["user", "admin", "editor"], // Allowed roles
        default: "user" // Default role
    },
    createdAt : {
        type : String,
        default : new Date()
    }
});

module.exports = mongoose.model('User' , userSchema);