const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title : String,
    content : String,
    likes : [{type : mongoose.Schema.Types.ObjectId , ref : "User"}],
    comments : [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User who commented
        text: String, // Comment text
        createdAt: { type: Date, default: Date.now } // Optional: Timestamp for sorting
    }],
    author : {type : mongoose.Schema.Types.ObjectId , ref : 'User'}
}, {timestamps : true});

module.exports = mongoose.model("Post" , postSchema);