import './style.css';
import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { Row, Col, Avatar, List } from 'antd';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';
import LikeDislike from './Sections/LikeDislike';
import VideoApi from '../../../http/VideoApi';
import CommentApi from '../../../http/CommentApi';

let playOn = false;
const VideoDetailPage = (props)=>{
    const videoId = props.match.params.videoId;
    const [videoDetail, setVideoDetail] = useState({}); 
    const [CommentList, setCommentList] = useState([]); 
    const { title, description, filepath, writer, createdAt } = videoDetail;
    const [views, setViews] = useState();
    
    const subscribeBtn = localStorage.getItem('userId') === writer?._id ? '' : <Subscribe history={props.history} userTo={writer?._id} userFrom={localStorage.getItem('userId')}  />;
    
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
            setViews(response.data.videoDetail.views);
        });
        CommentApi.getComment({postId: videoId}).then(response=>{
            if(!response.data.success){
                alert('댓글 조회 실패')
                return false;
            }
            setCommentList(response.data.commentList);
        }); 
    },[videoId]);

    return(
        <Row gutter={[16, 16]}>
            <Col lg={18} xs={24}>
                <div>
                    <video src={filepath && 'http://localhost:5000/uploads/'+filepath} type="video/mp4" onPlay={updateViews} onEnded={onEnded} controls/>
                </div>
                <div>   
                   
                    <List.Item actions={[<LikeDislike videoId={videoId} userId={localStorage.getItem('userId')} history={props.history} />, subscribeBtn]} >
                        <List.Item.Meta avatar={ writer && <Avatar src={writer.image} /> } title={title} description={description} />
                    </List.Item>
                    <p className='views'><span>조회: {views} · {moment(createdAt).format('YYYY-MM-DD')}</span></p>

                    <Comment CommentList={CommentList} videoId={videoId} refresh={refresh} delComment={delComment} history={props.history} />
                    
                </div>
            </Col>
            <Col lg={6} xs={24}>
                <SideVideo videoId={videoId} />
            </Col>
        </Row>
    )
}

export default VideoDetailPage;