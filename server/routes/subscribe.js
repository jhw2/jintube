const express = require('express');
const router = express.Router();
const { Subscriber } = require("../models/Subscriber");

//=================================
//          subscribe
//=================================
router.get("/getSubscribeCount", (req, res) => {
    Subscriber.find({ 'userTo': req.body.userTo }).exec((err, subscribe)=>{
        if(err){return res.status(400).json({success: false, err});}

        return res.status(200).json({success: true, subscribeCount: subscribe.length, subscribed: subscribe.length > 0});
    });
});

router.post("/getSubscribed", (req, res) => {
    Subscriber.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom }).exec((err, subscribe)=>{
        if(err){return res.status(400).json({success: false, err});}
        return res.status(200).json({success: true, subscribed: subscribe.length > 0}); 
    });
});

router.post("/unSubscribed", (req, res) => {
    Subscriber.findOneAndDelete({userTo: req.body.userTo, userFrom: req.body.userFrom}).exec((err, doc)=>{
        if(err) return res.status(400).json({success: false, err});
        res.status(200).json({success: true});
    })
})

router.post("/onSubscribed", (req, res) => {
    const subscriber = new Subscriber(req.body);
    subscriber.save((err, doc)=>{
        if(err) return res.status(400).json({success: false, err});
        res.status(200).json({success: true});
    })
})

module.exports = router;
