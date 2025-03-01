const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname : String,
    lname : String,
    email : String,
    password : String,
    profileImg : String,
    post : [{type : mongoose.Schema.Types.ObjectId , ref : 'Post'}]
});

module.exports = mongoose.model('User' , userSchema);