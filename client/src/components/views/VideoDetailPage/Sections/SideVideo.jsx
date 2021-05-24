import React, { useEffect, useState } from 'react';
import moment from 'moment';
import fileUpload from '../../../../http/FileUpload';

const SideVideo = (props)=>{
    const [sideList, setSideList] = useState([]);

    const drawSideList = (lists)=>{
        const sideList = lists.map((list, i)=>{
            const { _id: id , writer, title, filepath, thumbnail, duration, views, createdAt } = list;
            const url = '/video/' + id;
            const minutes = Math.floor(duration /60);
            const seconds = Math.floor(duration - minutes * 60);
            return (
                <li>
                    <div className='img'>
                        <a href={url}><img src={'http://localhost:5000/'+thumbnail} alt='' /></a>
                        <div className='duration'>
                            <span>{minutes} : {seconds}</span>
                        </div>
                    </div>
                    <div className='txt'>
                        <h6><a href={url} >{title}</a></h6>
                        <p><a href={url}>{writer.name}</a></p>
                        <p><a href={url}><span>{views} - {moment(createdAt).format('MMM Do YY')}</span></a></p>
                    </div>
                </li>
            )

        })
        
        setSideList(sideList)
    }
    useEffect(()=>{
        fileUpload.getVideos().then(response=>{
            if(response.data.success){
                drawSideList(response.data.videos);
            }else{
                alert('데이터 조회 실패');
            }
        });
    },[]);
    return(
        <ul className='sideVideo'>
            {sideList}
        </ul>
    )
}

export default SideVideo;