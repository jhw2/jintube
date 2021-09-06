import './style.css';
import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, Card, Avatar } from 'antd';
import VideoApi from '../../../http/VideoApi';
import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;
const zeroFill = (num)=>{
    return Number(num) < 10 ? '0'+num : num;
}
const LandingPage = () => {
    const [renderCard, setRenderCard] = useState('');

    const drawCard = (cards)=>{
        const cardList = [];
        cards.forEach((card, i)=>{
            const { _id: id , writer, title, description, filepath, thumbnail, duration, views, createdAt } = card;
            const url = '/video/' + id;
            const minutes = zeroFill(Math.floor(duration /60));
            const seconds = zeroFill(Math.floor(duration - minutes * 60));
            cardList.push(
                <Col className='thumbnail' lg={6} md={8} xs={24} key={filepath}>
                    <p className='img-wrap'>
                        <a href={url}><img src={`http://localhost:5000/${thumbnail}`} alt={title} /></a>
                        <span className='duration'>{minutes} : {seconds}</span>
                    </p>
                    <div className='txt'>
                        <a href={url}><Meta avatar={ <Avatar src={writer.image} /> } title={title} description={description} /></a>
                        <p className='nm'><a href={url}>{writer.name}</a></p>
                        <p className='views'><a href={url}><span>조회: {views} · {moment(createdAt).format('MMM Do YY')}</span></a></p>
                    </div>
                </Col>
            )
        });
        setRenderCard(cardList);
    }

    useEffect(()=>{
        VideoApi.getVideos().then(response=>{
            if(!response.data.success){
                alert('데이터 조회 실패');
                return false;
            }
            drawCard(response.data.videos);
        });
    },[]);

    
    return (
        <div>
            <Title level={2}>Recommended</Title>
            <Row gutter={[32, 16]}>
                {renderCard}
            </Row>
            
        </div>
    )
}

export default LandingPage
