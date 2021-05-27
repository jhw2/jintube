import React, { memo, useState, useEffect, useCallback } from 'react';
import { Comment, Avatar } from 'antd';
import CommentForm from './CommentForm';
import ReplyComment from './ReplyComment';
import CommentApi from '../../../../http/CommentApi';

const SingleComment = memo(({comment, videoId})=>{
    const [openReply, setOpenReply] = useState(false);
    const [CommentList, setCommentList] = useState([]); 
    const { _id : replyTo, writer, content } = comment;

    const onClickReplyOpen = useCallback(()=>{
        setOpenReply(!openReply);
    }, [openReply]);

    const refresh = useCallback((comment)=>{
        const newComment = [...CommentList, ...comment];
        setCommentList(newComment);
    }, [CommentList])

    useEffect(()=>{
        CommentApi.getComment({postId: videoId, replyTo}).then(response=>{
            if(!response.data.success){
                alert('댓글 조회 실패')
                return false;
            }
            setCommentList(response.data.commentList);
        });
    },[videoId, replyTo]);
    
    const actions = [<span onClick={onClickReplyOpen} key='comment-basic-reply-to'>Reply to</span>];
    return(
        <div className='singleComment'>
            <Comment actions={actions} author={writer && writer.name} avatar={<Avatar src={writer && writer.image} alt={writer && writer.name} />} content={content} />
            {openReply && <CommentForm replyTo={replyTo} addClass='reReply' videoId={videoId} refresh={refresh} />}
            <ReplyComment CommentList={CommentList} videoId={videoId} replyTo={replyTo}></ReplyComment>
        </div>
    )
})
export default SingleComment;