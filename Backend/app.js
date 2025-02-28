const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const postRoutes = require('./routes/posts');


dotenv.config();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res)=>{
  res.send("Hello There Pi is boosting");
})
app.use('/api/posts' , postRoutes);

app.post('/test', (req, res) => {
  console.log("Received data:", req.body);
  res.json({ received: req.body });
});


mongoose.connect(process.env.MONGO_URL)
   .then(() => console.log("MongoDB Connected"))
   .catch((err) => console.log(err));



const PORT = 3000;
app.listen(PORT , ()=>{
    console.log(`app is listening on PORT ${PORT}`)
})
