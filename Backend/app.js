const express = require('express');
const cors = require('cors');
const postRoutes = require('./routes/posts');
const connectDB = require('../Backend/config/dbconfig');
const userRoutes = require('../Backend/routes/user');
const cookieParser = require('cookie-parser');


connectDB();
const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res)=>  res.send("Hello There Pi is boosting"));


app.use('/api/user' , userRoutes);
app.use('/api/posts' , postRoutes);


const PORT = 3000;
app.listen(PORT , ()=>{
    console.log(`app is listening on PORT ${PORT}`)
})
