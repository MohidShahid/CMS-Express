const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    profileImg : String,
    role: {
        type: String,
        enum: ["user", "admin", "editor"], // Allowed roles
        default: "user" // Default role
    },
    createdAt : {
        type : Date,
        default : new Date()
    }
},{ timestamps: true });

module.exports = mongoose.model('User' , userSchema);