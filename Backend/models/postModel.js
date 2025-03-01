const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title : String,
    content : String,
    likes : [{type : mongoose.Schema.Types.ObjectId , ref : "User"}],
    comments : [{type : mongoose.Schema.Types.ObjectId , ref :  "User"}],
    author : {type : mongoose.Schema.Types.ObjectId , ref : 'User'}
});

module.exports = mongoose.model("Post" , postSchema);