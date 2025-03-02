const express = require('express');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.get('/', async(req ,res)=>{
   const users =  await userModel.find({});
    res.status(201).send(users);
})

router.post('/register' , async(req , res)=>{
    try{
        const {fname , lname , email , password , role } = req.body;
        const existingUser = await userModel.find({email});
        if(existingUser.length > 0){
         return res.status(401).json({message : "email already exist"})
        }else{
            const hashedPassword = await bcrypt.hash(password , 10)
            const newUser =  new userModel({
                fname , 
                lname,
                email,
                role : role || 'user',
                password : hashedPassword
            })
            await newUser.save();
            res.status(201).json({ message: "User registered successfully!" });
        }
    }catch(err){
       res.status(500).json({message : err.message})
    }

})

router.delete('/:id' , async(req , res)=>{
    await userModel.deleteOne({_id : req.params.id});
    res.status(201).send({message : "Deleted Successfully"});
})

router.put('/:id' , async(req , res)=>{
    await userModel.updateOne({_id : req.params.id} , req.body);
    const updatedUser = await userModel.findById(req.params.id)
    res.status(201).send(updatedUser);
})


module.exports = router;