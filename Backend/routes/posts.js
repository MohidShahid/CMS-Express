const express = require('express');
const router = express.Router();
const postModel = require('../models/postModel');

router.post('/create', async(req , res)=>{
    try{
        const {title , content} = req.body;
        const newPost = new postModel({title , content});
        console.log(req.body);
        await newPost.save();
        res.status(201).send(newPost);
    } catch(error){
        res.status(500).send(error)
    }

})

router.delete('/:id' , async(req, res)=>{
   const post = await postModel.deleteOne({_id : req.params.id});
   res.json({message : "post deleted"  , post});
})

router.get('/', async(req , res)=>{
   const posts = await postModel.find();
   res.json(posts)
})

module.exports = router;