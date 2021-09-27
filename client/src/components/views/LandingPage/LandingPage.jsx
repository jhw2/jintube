import './style.css';
import React, { useCallback, useEffect, useState } from 'react';
import { Typography, Row, Col, Card, Avatar } from 'antd';
import { SERVER_URL } from '../../Config';
import VideoApi from '../../../http/VideoApi';
import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;
const zeroFill = (num)=>{
    return Number(num) < 10 ? '0'+num : num;
}
let originalVideoData;

const quickSort = (arr)=>{
    if(arr.length < 2){
        return arr;
    }
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = quickSort(arr.filter(data => data.views < pivot.views));
    const center = arr.filter(data => data.views === pivot.views);
    const right = quickSort(arr.filter(data => data.views > pivot.views));
    return right.concat(center).concat(left);
}
const LandingPage = () => {
    const [renderCard, setRenderCard] = useState('');

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

    const changeOrder = useCallback(({target})=>{
        const orderType = target.value;
        switch(orderType){
            case 'new' :
                drawCard(originalVideoData);
                break;
            case 'old' :
                const newData = [...originalVideoData];
                drawCard(newData.reverse());
                break;
            case 'poppular' :
                drawCard(quickSort(originalVideoData));
                break;
            default: ;
        }

    }, [drawCard]);

    useEffect(()=>{
        VideoApi.getVideos().then(response=>{
            if(!response.data.success){
                alert('데이터 조회 실패');
                return false;
            }
            originalVideoData = response.data.videos.reverse();
            drawCard(originalVideoData);
        });
    }, [drawCard]);

    
    return (
        <div>
            <Title level={2}>
                Recommended 
                <select onChange={changeOrder}>
                    <option value='new'>최신순</option>
                    <option value='old'>오래된순</option>
                    <option value='poppular'>인기순</option>
                </select>
            </Title>
            <Row gutter={[32, 16]}>
                {renderCard}
            </Row>
            
        </div>
    )
}

export default LandingPage
