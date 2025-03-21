const express = require('express');
const router = express.Router();
const postModel = require('../models/postModel');
const verifyToken = require('../middleware/authMiddleware')

router.post('/create', verifyToken , async(req , res)=>{
    try{
        const {title , content} = req.body;
        const newPost = new postModel({title , content, author : req.user.id});
        console.log(req.body);
        await newPost.save();
        res.status(201).send(newPost);
    } catch(error){
        res.status(500).send(error)
    }

})

router.delete('/:id' , verifyToken,  async(req, res)=>{
   const post = await postModel.deleteOne({_id : req.params.id});
   res.json({message : "post deleted"  , post});
})

router.get('/', async(req , res)=>{
   const posts = await postModel.find();
   res.status(200).json(posts);
})

router.get('/:id' , verifyToken , async (req , res)=>{
    const post = await postModel.findOne({_id : req.params.id})
    res.status(200).json(post);
})
router.get('/userId/:id' , verifyToken , async(req , res)=>{
    const posts = await postModel.find({author : req.params.id});
    res.status(200).json(posts);
})

module.exports = router;