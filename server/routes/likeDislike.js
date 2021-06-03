const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { DisLike } = require("../models/DisLike");

//=================================
//          comment
//=================================

router.post("/getLikes", (req, res) => {
    const param = req.body.videoId ? {'videoId': req.body.videoId} : {'commentId': req.body.commentId};
    Like.find(param).exec((err, likes)=>{
        if(err) return res.status(400).json({success: false, err});
        res.status(200).json({success: true, likes});
    });
})

router.post("/getDisLikes", (req, res) => {
    const param = req.body.videoId ? {'videoId': req.body.videoId} : {'commentId': req.body.commentId};
    DisLike.find(param).exec((err, disLikes)=>{
        if(err) return res.status(400).json({success: false, err});
        res.status(200).json({success: true, disLikes});
    });
})

router.post("/onLiked", (req, res) => {
    const like = new Like(req.body);
    const param = req.body.videoId ? {'videoId': req.body.videoId, userId: req.body.userId} : {'commentId': req.body.commentId, userId: req.body.userId};
    like.save((err, doc)=>{
        if(err) return res.status(400).json({success: false, err});
        DisLike.findOneAndDelete(param).exec((err, doc)=>{
            if(err) return res.status(400).json({success: false, err});
            res.status(200).json({success: true});
        });
    });
})

router.post("/unLiked", (req, res) => {
    const param = req.body.videoId ? {'videoId': req.body.videoId, userId: req.body.userId} : {'commentId': req.body.commentId, userId: req.body.userId};
    Like.findOneAndDelete(param).exec((err, doc)=>{
        if(err) return res.status(400).json({success: false, err});
        res.status(200).json({success: true});
    });
})

router.post("/onDisLiked", (req, res) => {
    const disLike = new DisLike(req.body);
    const param = req.body.videoId ? {'videoId': req.body.videoId, userId: req.body.userId} : {'commentId': req.body.commentId, userId: req.body.userId};
    disLike.save((err, doc)=>{
        if(err) return res.status(400).json({success: false, err});
        Like.findOneAndDelete(param).exec((err, doc)=>{
            if(err) return res.status(400).json({success: false, err});
            res.status(200).json({success: true});
        });
    })
});

router.post("/unDisLiked", (req, res) => {
    const param = req.body.videoId ? {'videoId': req.body.videoId, userId: req.body.userId} : {'commentId': req.body.commentId, userId: req.body.userId};
    DisLike.findOneAndDelete(param).exec((err, doc)=>{
        if(err) return res.status(400).json({success: false, err});
        res.status(200).json({success: true});
    });
})


module.exports = router;
