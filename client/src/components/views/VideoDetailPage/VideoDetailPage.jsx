import React, { useEffect, useState } from 'react';
import { Row, Col, Avatar, List } from 'antd';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';
import LikeDislike from './Sections/LikeDislike';
import VideoApi from '../../../http/VideoApi';
import CommentApi from '../../../http/CommentApi';

const VideoDetailPage = (props)=>{
    const videoId = props.match.params.videoId;
    const [videoDetail, setVideoDetail] = useState({}); 
    const [CommentList, setCommentList] = useState([]); 
    const { title, description, filepath, writer } = videoDetail;

    const subscribeBtn = writer && writer._id === localStorage.getItem('userId') ? '' : <Subscribe history={props.history} userTo={writer && writer._id} userFrom={localStorage.getItem('userId')}  />;
    
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
                    <video src={filepath && 'http://192.168.219.109:5000/uploads/'+filepath} type="video/mp4" controls/>
                </div>
                <div>
                   
                    <List.Item actions={[<LikeDislike videoId={videoId} userId={localStorage.getItem('userId')} history={props.history} />, subscribeBtn]} >
                        <List.Item.Meta avatar={ writer && <Avatar src={writer.image} /> } title={title} description={description} />
                    </List.Item>

                    <Comment CommentList={CommentList} videoId={videoId} refresh={refresh} delComment={delComment} history={props.history} />
                    
                </div>
            </Col>
            <Col lg={6} xs={24}>
                <SideVideo />
            </Col>
        </Row>
    )
}

export default VideoDetailPage;