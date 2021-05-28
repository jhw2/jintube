const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================
//          comment
//=================================

router.post("/saveComment", (req, res) => {
    const comment = new Comment(req.body);
    comment.save((err, doc)=>{
        if(err) return res.status(400).json({success: false, err});
        Comment.find({'_id': doc._id}).populate('writer').exec((err, result)=>{
            if(err) return res.status(400).json({success: false, err});
            res.status(200).json({success: true, result});
        })
    })
})

router.post("/getComment", (req, res) => {
    Comment.find({'postId': req.body.postId, replyTo: req.body.replyTo}).populate('writer').exec((err, commentList)=>{
        if(err) return res.status(400).json({success: false, err});
        res.status(200).json({success: true, commentList});
    })
})

router.post("/removeComment", (req, res) => {
    Comment.findOneAndDelete({'_id': req.body.id}).exec((err, doc)=>{
        if(err) return res.status(400).json({success: false, err});
        Comment.deleteMany({'replyTo': req.body.id}).exec((err, doc)=>{
            if(err) return res.status(400).json({success: false, err});
            res.status(200).json({success: true});
        })
    })

    
    
})

module.exports = router;
