const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const { TempVideo } = require("../models/TempVideo");

const multer = require('multer');
const path = require('path');
let ffmpeg = require('fluent-ffmpeg');
const { logger } = require('../logger/logger');


//=================================
//          file upload
//=================================
let storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads/");
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const fileFilter = (req, file, cb)=>{
    const ext = path.extname(file.originalname);
    if(ext !== '.mp4'){
        return cb('mp4동영상만 업로드 가능합니다.', false);
    }
    cb(null, true);
}
const upload = multer({ storage, fileFilter }).single('file');

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

        //업로드 된 동영상 및 썸네일 이미지 임시 db 저장
        const tempVideo = new TempVideo({'filepath': req.body.url.replace('uploads\\', ''), 'thumbnail': filePath});
        tempVideo.save((err, doc)=>{
            if(err) logger.error(err);
        });

        return res.json({success: true, url: filePath, fileDuration: fileDuration});
    }).on('error', (err)=>{
        return res.json({success: false, err}) 
    }).screenshot({
        //timestamps: ['2%'],
        count: 1,
        folder: 'uploads/thumbnails',
        size: '320x200',
        filename: "thumbnail-%b.png",
    });

});

router.post("/uploadVideo", (req, res) => {
    const video = new Video(req.body);

    TempVideo.findOneAndDelete({ 'filepath': req.body.filepath }, (err, doc)=>{//업로드된 임시 비디오 db 삭제 
        if(err) return res.status(400).json({success: false, err});

        if(doc === null){
            return res.status(200).json({success: false, err: '동영상을 다시 업로드해주세요.'});
        }

        video.save((err, doc)=>{
            if(err) return res.status(400).json({success: false, err});
            res.status(200).json({success: true});
        });
    })
});


router.get("/getVideos/:type", (req, res) => {
    let videoFind = Video.find({'onDelete': false}).populate('writer').sort({createdAt: -1});
    if(req.params.type === 'old'){
        videoFind = Video.find({'onDelete': false}).populate('writer').sort({createdAt: 1});
    }else if(req.params.type === 'popular'){
        videoFind = Video.find({'onDelete': false}).populate('writer').sort({views: -1});
    }
    videoFind.exec((err, videos)=>{
        if(err) return res.status(400).json({success: false, err});
        res.status(200).json({success: true, videos});
    });
});

router.post("/getVideoDetail", (req, res) => {
    Video.findOne({"_id": req.body.videoId, 'onDelete': false}).populate('writer').exec((err, videoDetail)=>{
        if(err) return res.status(400).json({success: false, err});
        res.status(200).json({success: true, videoDetail});
    });
});

router.post("/deleteVideo", (req, res) => {
    Video.findOneAndUpdate({"_id": req.body.videoId}, { onDelete: true} ).exec((err)=>{
        if(err) return res.status(400).json({success: false, err});
        res.status(200).json({success: true});
    });

});

router.post("/updateViews", (req, res) => {
    Video.findOne({"_id": req.body.videoId}).populate('writer').exec((err, videoDetail)=>{
        Video.findOneAndUpdate({"_id": req.body.videoId}, {"views": videoDetail.views + 1}).exec((err, videoDetail)=>{
            if(err) return res.status(400).json({success: false, err});
            res.status(200).json({success: true, views: videoDetail.views + 1});
        });
    });
});
  
module.exports = router;
