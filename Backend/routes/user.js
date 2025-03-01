const express = require('express');
const userModel = require('../models/userModel');

const router = express.Router();

router.get('/', async(req ,res)=>{
   const users =  await userModel.find({});
    res.status(201).send(users);
})

router.post('/create' , async(req , res)=>{
   await  userModel.create(req.body);
   res.status(201).send({message : "User created Successfully"});
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