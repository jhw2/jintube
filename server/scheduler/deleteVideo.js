const schedule = require('node-schedule');
const { Video } = require("../models/Video");
const fs = require("fs");
/** 
 * onDelete true로 표시된 비디오 리스트 삭제 처리 스케줄러
 */
module.exports ={
    start : ()=>{ 
        const job = schedule.scheduleJob({hour: 17, minute: 6,}, ()=>{ 
            console.log('=============== DELETE START ================');
    
            Video.find({"onDelete": true}).exec((err, videos)=>{
                if (err) throw err;
                //파일삭제
                videos.forEach( async (video) => {
                    console.log(`=== ${video.title} ===`);

                    const { _id, filepath, thumbnail } = video;
                    await Promise.all([`uploads/${filepath}`, thumbnail].map(file =>{
                            new Promise((res, rej) => {
                                fs.unlink(file, err => {
                                    if (err) throw err;
                                    console.log(`${file} was deleted.`);
                                });
                            })
                        }
                    ));
                    //db삭제
                    Video.findOneAndDelete({"_id": _id}).exec((err, doc)=>{
                        if (err) throw err;
                        console.log(`${doc.title} was deleted.`);
                    });
                });
            });
        });
    
        return job;
    }
} 