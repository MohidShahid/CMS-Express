const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

const connectdb = async () =>{
    try{
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Database Connected Successfully")
    }catch(err){
        console.log("Database Connection FAILED" , err.message);
    }
}

module.exports = connectdb;