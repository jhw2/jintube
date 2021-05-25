import React, { useEffect, useState } from 'react';
import { Row, Col, Avatar, List } from 'antd';
import VideoApi from '../../../http/VideoApi';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';

const VideoDetailPage = (props)=>{
    const videoId = props.match.params.videoId;
    const [videoDetail, setVideoDetail] = useState({}); 
    const { title, description, filepath, writer } = videoDetail;
    
    useEffect(()=>{
        VideoApi.getVideoDetail({videoId}).then(response=>{
            if(response.data.success){
                setVideoDetail(response.data.videoDetail);
            }else{
                alert('정보 조회 실패')
            }
        });
    },[videoId]);

    return(
        <Row gutter={[16, 16]}>
            <Col lg={18} xs={24}>
                <div>
                    <video src={filepath && 'http://localhost:5000/uploads/'+filepath} type="video/mp4" controls/>
                </div>
                <div>
                   
                    <List.Item actions={[<Subscribe userTo={writer && writer._id} userForm={localStorage.getItem('userId')} />]} >
                        <List.Item.Meta avatar={ writer && <Avatar src={writer.image} /> } title={title} description={description} />
                    </List.Item>
                </div>
            </Col>
            <Col lg={6} xs={24}>
                <SideVideo />
            </Col>
        </Row>
    )
}

export default VideoDetailPage;