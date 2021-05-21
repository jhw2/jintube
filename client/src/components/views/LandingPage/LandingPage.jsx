import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, Card, Avatar } from 'antd';
import fileUpload from '../../../http/FileUpload';
import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;
const LandingPage = () => {
    const [renderCard, setRenderCard] = useState('');

    const drawCard = (cards)=>{
        const cardList = [];
        console.log(cards)
        cards.forEach((card, i)=>{
            const { writer, title, description, filepath, thumbnail, duration, views, createdAt } = card;
            const minutes = Math.floor(duration /60);
            const seconds = Math.floor(duration - minutes * 60);
            cardList.push(
                <Col lg={6} md={8} xs={24} key={filepath}>
                    <p><img src={`http://localhost:5000/${thumbnail}`} alt={title} /></p>
                    <div className='duration'>
                        <span>{minutes} : {seconds}</span>
                    </div>
                    <Meta avatar={ <Avatar src={writer.image} /> } title={title} description={description} />
                    <p>{writer.name}</p>
                    <p><span>{views} - {moment(createdAt).format('MMM Do YY')}</span></p>
                </Col>
            )
        });
        setRenderCard(cardList);
    }

    useEffect(()=>{
        fileUpload.uploadVideo().then(response=>{
            if(response.data.success){
                drawCard(response.data.videos);
            }else{
                alert('데이터 조회 실패');
            }
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
