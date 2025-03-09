const express = require('express');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');
const upload = require('../middleware/fileUpload');
const fs = require('fs').promises;
const path = require('path');
const verifyAdmin = require('../middleware/authAdmin')
const router = express.Router();
const SECRET_KEY = "Glyptodon@2305";

router.get('/', verifyToken, verifyAdmin, async(req ,res)=>{
   const users =  await userModel.find({});
    res.status(201).json(users);
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const getUser = await userModel.findOne({ email });

        if (!getUser) {
            return res.status(401).json({ message: "Invalid Credentials" }).send();
        }

        // ✅ Use `await` instead of a callback
        const isPasswordMatch = await bcrypt.compare(password, getUser.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid Credentials" }).send(); // ✅ Now this will return correctly
        }

        const token = jwt.sign(
            { id: getUser._id, name: getUser.name, role: getUser.role },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: false, 
            maxAge: 3600000,
            sameSite: "strict"
        });

        return res.status(200).json({ message: "Logged In successfully", user: getUser });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal Server Error" }); // ✅ Always return response
    }
});




router.post("/register", upload.single("profileImg"), async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ message: "Email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Ensure file is uploaded before saving
        const profileImgPath = req.file ? req.file.path : "";

        // Create new user
        const newUser = new userModel({
            name,
            email,
            role: role || "user",
            password: hashedPassword,
            profileImg: profileImgPath, // Save file path
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/logout' , (req , res)=>{
    res.clearCookie('authToken');
    res.status(200).json({message : "Logged Out Successfully"})
})
router.delete('/:id' , verifyToken , verifyAdmin , async(req , res)=>{
    await userModel.deleteOne({_id : req.params.id});
    res.status(201).send({message : "Deleted Successfully"});
})

router.put('/:id' , verifyToken, verifyAdmin, async(req , res)=>{
    await userModel.updateOne({_id : req.params.id} , req.body);
    const updatedUser = await userModel.findById(req.params.id)
    res.status(201).send(updatedUser);
})

router.post('/upload' , verifyToken ,  upload.single('profileImg'), async(req , res)=>{
    const user = await userModel.findOne({_id : req.user.id});
    if(user.profileImg){
        fs.unlink(path.resolve(__dirname ,"..", user.profileImg ))
    }
     const updatedUser = await userModel.updateOne({_id : user._id} , { $set: { profileImg: req.file ? req.file.path : "" } });
     res.status(201).json(updatedUser);
})


module.exports = router;
