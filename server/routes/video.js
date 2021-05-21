const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const multer = require('multer');
let ffmpeg = require('fluent-ffmpeg');


//=================================
//          file upload
//=================================
let storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads/");
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb)=>{
        const ext = path.extname(file.originalname);
        if(text != 'mp4'){
            return cb(res.statuis(400).end('only mp4 is allowed', false));
        }
        cb(null, true);
    },
});
const upload = multer({ storage: storage}).single('file');

router.post("/uploadfiles", (req, res) => {
    upload(req, res, err =>{
        if(err){
            return res.json({success: false, err});
        }
        return res.json({success: true, url: res.req.file.path, filename: res.req.file.filename})
    })
});

router.post("/thumbnail", (req, res) => {
    let filePath = "", fileDuration = "";
    ffmpeg.ffprobe(req.body.url, (err, metadata)=>{
        fileDuration = metadata.format.duration;  
    }) 

    ffmpeg(req.body.url).on('filenames', (filenames)=>{
        filePath = 'uploads/thumbnails/' + filenames[0];
    }).on('end', ()=>{
        return res.json({success: true, url: filePath, fileDuration: fileDuration})
    }).on('error', (err)=>{
        return res.json({success: false, err}) 
    }).screenshot({
        count: 3,
        folder: 'uploads/thumbnails',
        size: '320x240',
        filenames: 'thumbnail-%b.png'
    }) 
});

router.post("/uploadVideo", (req, res) => {
    const video = new Video(req.body);
    video.save((err, doc)=>{
        if(err) return res.json({success: false, err});
        res.status(200).json({success: true});
    });
});


router.get("/getVideos", (req, res) => {
    Video.find().populate('writer').exec((err, videos)=>{
        if(err) return res.json({success: false, err});
        res.status(200).json({success: true, videos});
    });
});
  
module.exports = router;
