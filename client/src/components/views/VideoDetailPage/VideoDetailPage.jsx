import './style.css';
import React, { useCallback, useEffect, useState } from 'react';
import { SERVER_URL } from '../../Config';
import moment from 'moment';
import { Row, Col, Avatar, List } from 'antd';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import DeleteBtn from './Sections/DeleteBtn';
import Comment from './Sections/Comment';
import LikeDislike from './Sections/LikeDislike';
import VideoApi from '../../../http/VideoApi';
import CommentApi from '../../../http/CommentApi';

let playOn = false;
const VideoDetailPage = (props)=>{
    const videoId = props.match.params.videoId;
    const [videoDetail, setVideoDetail] = useState({}); 
    const [CommentList, setCommentList] = useState([]); 
    const [views, setViews] = useState();
    
    const rightBtn = localStorage.getItem('userId') === videoDetail?.writer?._id ? <DeleteBtn history={props.history} videoId={videoId} /> : <Subscribe history={props.history} userTo={videoDetail?.writer?._id} userFrom={localStorage.getItem('userId')}  />;
    
    const updateViews = useCallback((e)=>{
        if(!playOn){
            VideoApi.updateViews({videoId}).then(response=>{
                if(!response.data.success){
                    alert('정보 조회 실패')
                    return false;
                } 
                playOn = true;
                setViews(response.data.views);
            });
        }
    },[videoId]);
    const onEnded = useCallback((e)=>{
        playOn = false;
    },[]);

    const refresh = (comment)=>{
        const newComment = [...CommentList, ...comment];
        setCommentList(newComment);
    }
    const delComment = (commentId)=>{
        const newComment = CommentList.filter(comment=>comment._id !== commentId);
        setCommentList(newComment);
    }

    useEffect(()=>{
        VideoApi.getVideoDetail({videoId}).then(response=>{
            if(!response.data.success){
                alert('정보 조회 실패')
                return false;
            }
            setVideoDetail(response.data.videoDetail);
            setViews(response.data?.videoDetail?.views);
        });
        CommentApi.getComment({postId: videoId}).then(response=>{
            if(!response.data.success){
                alert('댓글 조회 실패')
                return false;
            }
            setCommentList(response.data.commentList);
        }); 
    },[videoId]);

    if(!videoDetail || videoDetail && Object.keys(videoDetail).length === 0){
        return '';
    }
    return(
        <Row gutter={[16, 16]}>
            <Col lg={18} xs={24}>
                <div className='videoWrap'>
                    <video src={`${SERVER_URL}uploads/${videoDetail?.filepath}`} type="video/mp4" onPlay={updateViews} onEnded={onEnded} controls/>
                </div>
                <div>   
                   
                    <List.Item actions={[<LikeDislike videoId={videoId} userId={localStorage.getItem('userId')} history={props.history} />, rightBtn]} >
                        <List.Item.Meta avatar={ <Avatar src={videoDetail?.writer.image} /> } title={videoDetail.title} description={videoDetail.description} />
                    </List.Item>
                    <p className='views'><span>조회: {views} · {moment(videoDetail.createdAt).format('YYYY-MM-DD')}</span></p>

                    <Comment CommentList={CommentList} videoId={videoDetail.videoId} refresh={refresh} delComment={delComment} history={props.history} />
                    
                </div>
            </Col>
            <Col lg={6} xs={24}>
                <SideVideo videoId={videoId} />
            </Col>
        </Row>
    )
}

export default VideoDetailPage;