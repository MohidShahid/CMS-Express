const express = require('express');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');
const upload = require('../middleware/fileUpload');

const router = express.Router();
const SECRET_KEY = "Glyptodon@2305";

router.get('/', verifyToken, async(req ,res)=>{
   const users =  await userModel.find({});
    res.status(201).send(users);
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const getUser = await userModel.findOne({ email });

        if (!getUser) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        // 🔐 Compare passwords asynchronously
        bcrypt.compare(password, getUser.password, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: "Error comparing passwords" });
            }
            if (!result) {
                return res.status(401).json({ message: "Invalid Credentials" });
            }
            res.status(200).json({ message: "Logged In successfully" });
        });
        const token = jwt.sign({id : getUser._id , name : getUser.name , role : getUser.role} , SECRET_KEY , {expiresIn : "1h"})
        res.cookie("authToken", token, {
            httpOnly: true,  // Prevents client-side access to the cookie
            secure: false,   // Set to `true` in production with HTTPS
            maxAge: 3600000, // 1 hour expiration
            sameSite: "strict"
        });
        console.log(token);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/register' , upload.single('file') ,async(req , res)=>{
    try{
        const {name ,  email , password , role } = req.body;
        const existingUser = await userModel.find({email});
        if(existingUser.length > 0){
         return res.status(401).json({message : "email already exist"})
        }else{
            const hashedPassword = await bcrypt.hash(password , 10)
            const newUser =  new userModel({
                name,
                email,
                role : role || 'user',
                password : hashedPassword,
                profileImg : req.file
            })
            await newUser.save();
            res.status(201).json({ message: "User registered successfully!" });
        }
    }catch(err){
       res.status(500).json({message : err.message})
    }

})

router.post('/logout' , (req , res)=>{
    res.clearCookie('authToken');
    res.status(200).json({message : "Logged Out Successfully"})
})
router.delete('/:id' , verifyToken , async(req , res)=>{
    await userModel.deleteOne({_id : req.params.id});
    res.status(201).send({message : "Deleted Successfully"});
})

router.put('/:id' , verifyToken, async(req , res)=>{
    await userModel.updateOne({_id : req.params.id} , req.body);
    const updatedUser = await userModel.findById(req.params.id)
    res.status(201).send(updatedUser);
})


module.exports = router;