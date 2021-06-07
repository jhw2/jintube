import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, Card, Avatar } from 'antd';
import VideoApi from '../../../http/VideoApi';
import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;
const LandingPage = () => {
    const [renderCard, setRenderCard] = useState('');

    const drawCard = (cards)=>{
        const cardList = [];
        console.log(cards)
        cards.forEach((card, i)=>{
            const { _id: id , writer, title, description, filepath, thumbnail, duration, views, createdAt } = card;
            const url = '/video/' + id;
            const minutes = Math.floor(duration /60);
            const seconds = Math.floor(duration - minutes * 60);
            cardList.push(
                <Col className='thumbnail' lg={6} md={8} xs={24} key={filepath}>
                    <p className='img-wrap'>
                        <a href={url}><img src={`http://localhost:5000/${thumbnail}`} alt={title} /></a>
                        <span className='duration'>{minutes} : {seconds}</span>
                    </p>
                    <Meta avatar={ <Avatar src={writer.image} /> } title={title} description={description} />
                    <p><a href={url}>{writer.name}</a></p>
                    <p><a href={url}><span>{views} - {moment(createdAt).format('MMM Do YY')}</span></a></p>
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
        <div className='cont'>
            <Title level={2}>Recommended</Title>
            <Row gutter={[32, 16]}>
                {renderCard}
            </Row>
            
        </div>
    )
}

export default LandingPage
