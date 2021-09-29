const schedule = require('node-schedule');
const { TempVideo } = require("../models/TempVideo");
const fs = require("fs");
const { logger } = require('../logger/logger');

/** 
 * 비디오 업로드시 임시 저장된 파일 삭제 처리 스케줄(하루 한번)
 */
module.exports ={
    start : ()=>{ 
        const job = schedule.scheduleJob({hour: 16, minute: 49}, ()=>{ 
            logger.info('=============== TEMP VIDEO DELETE START ================');
    
            TempVideo.find({ 'expiryDate': {'$lte': new Date()} }).exec((err, videos)=>{
                if (err) logger.error(err);
                //파일삭제
                videos.forEach( async (video) => {
                    const { _id, filepath, thumbnail } = video;
                    await Promise.all([`uploads/${filepath}`, thumbnail].map(file =>{
                            new Promise((res, rej) => {
                                fs.unlink(file, err => {
                                    if (err) logger.error(err);
                                });
                            })
                        }
                    ));
                    //db삭제
                    TempVideo.findOneAndDelete({"_id": _id}).exec((err, doc)=>{
                        if (err) logger.error(err);
                        logger.info(`${video.filepath} was deleted.`);
                    });
                });
            });
        });
    
        return job;
    }
} 