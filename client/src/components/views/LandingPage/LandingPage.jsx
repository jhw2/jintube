import './style.css';
import React, { useCallback, useEffect, useState } from 'react';
import { Typography, Row, Col, Card, Avatar } from 'antd';
import { SERVER_URL } from '../../Config';
import VideoApi from '../../../http/VideoApi';
import Loading from '../VideoUploadPage/Sections/Loading';

import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;
const zeroFill = (num)=>{
    return Number(num) < 10 ? '0' + num : num;
}

const LandingPage = () => {
    const [renderCard, setRenderCard] = useState('');
    const [loading, setLoading] = useState(false);

    const drawCard = useCallback((cards)=>{
        const cardList = [];
        cards.forEach((card, i)=>{
            const { _id: id , writer, title, description, filepath, thumbnail, duration, views, createdAt } = card;
            const url = '/video/' + id;
            const minutes = zeroFill(Math.floor(duration /60));
            const seconds = zeroFill(Math.floor(duration - minutes * 60));
            cardList.push(
                <Col className='thumbnail' lg={6} md={8} xs={24} key={filepath}>
                    <p className='img-wrap'>
                        <a href={url}><img src={SERVER_URL + thumbnail} alt={title} /></a>
                        <span className='duration'>{minutes} : {seconds}</span>
                    </p>
                    <div className='txt'>
                        <a href={url}><Meta avatar={ <Avatar src={writer.image} /> } title={title} description={description} /></a>
                        <p className='nm'><a href={url}>{writer.name}</a></p>
                        <p className='views'><a href={url}><span>조회: {views} · {moment(createdAt).format('YYYY-MM-DD')}</span></a></p>
                    </div>
                </Col>
            )
        });
        setRenderCard(cardList);
    }, []);

    const getVideos = useCallback((type)=>{
        setLoading(true);
        VideoApi.getVideos(type).then(response=>{
            if(!response.data.success){
                alert('데이터 조회 실패');
                return false;
            }
            drawCard(response.data.videos);
            setLoading(false);
        });
    }, [drawCard]); 

    const changeOrder = useCallback(({target})=>{
        getVideos(target.value);
    }, [getVideos]);

    useEffect(()=>{
        getVideos('new')
    }, [getVideos]);

    
    return (
        <div>
            <Loading isVisible={loading} />
            <Title level={2}>
                Recommended 
                <select onChange={changeOrder}>
                    <option value='new'>최신순</option>
                    <option value='old'>오래된순</option>
                    <option value='popular'>인기순</option>
                </select>
            </Title>
            <Row gutter={[32, 16]}>
                {renderCard}
            </Row>
            
        </div>
    )
}

export default LandingPage
