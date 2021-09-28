import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { SERVER_URL } from '../../../Config';
import VideoApi from '../../../../http/VideoApi';

const SideVideo = ({videoId})=>{
    const [sideList, setSideList] = useState([]);

    useEffect(()=>{
        const drawSideList = (lists)=>{
            const sideList = lists.map((list, i)=>{
                const { _id: id , writer, title, filepath, thumbnail, duration, views, createdAt } = list;
                if(videoId !== id){
                    const url = '/video/' + id;
                    const minutes = Math.floor(duration /60);
                    const seconds = Math.floor(duration - minutes * 60);
                    return (
                        <li key={filepath}>
                            <div className='img'>
                                <a href={url}><img src={SERVER_URL+thumbnail} alt='' /></a>
                                <div className='duration'>
                                    <span>{minutes} : {seconds}</span>
                                </div>
                            </div>
                            <div className='txt'>
                                <h6><a href={url} >{title}</a></h6>
                                <p><a href={url}>{writer.name}</a></p>
                                <p><a href={url}><span>{moment(createdAt).format('YYYY-MM-DD')}</span></a></p>
                                <p><a href={url}><span>조회수: {views}</span></a></p>
                            </div>
                        </li>
                    )
                }else{
                    return '';
                }
    
            })
            
            setSideList(sideList)
        }

        VideoApi.getVideos().then(response=>{
            if(response.data.success){
                drawSideList(response.data.videos);
            }else{
                alert('데이터 조회 실패');
            }
        });
    },[videoId]);
    return(
        <ul className='sideVideo'>
            {sideList}
        </ul>
    )
}

export default SideVideo;