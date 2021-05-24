import React, { useEffect, useState } from 'react';
import { Row, Col, Avatar, List, Card } from 'antd';
import fileUpload from '../../../http/FileUpload';
import SideVideo from './Sections/SideVideo';

const { Meta } = Card;
const VideoDetailPage = (props)=>{
    const videoId = props.match.params.videoId;
    const [videoDetail, setVideoDetail] = useState({}); 
    const { title, description, filepath, thumbnail, views, writer } = videoDetail;
    
    useEffect(()=>{
        fileUpload.getVideoDetail({videoId}).then(response=>{
            if(response.data.success){
                setVideoDetail(response.data.videoDetail);
            }else{
                alert('정보 조회 실패')
            }
        });
    },[]);

    return(
        <Row gutter={[16, 16]}>
            <Col lg={18} xs={24}>
                <div>
                    <video src={'http://localhost:5000/uploads/'+filepath} type="video/mp4" controls/>
                </div>
                <div>
                    <List.Item actions >
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