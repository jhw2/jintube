import React, { memo, useState, useEffect, useCallback } from 'react';
import { Comment, Avatar } from 'antd';
import CommentForm from './CommentForm';
import ReplyComment from './ReplyComment';
import CommentApi from '../../../../http/CommentApi';

const SingleComment = memo(({comment, videoId, delComment})=>{
    const [openReplyForm, setOpenReplyForm] = useState(false);
    const [CommentList, setCommentList] = useState([]); 
    const [openReply, setOpenReply] = useState(false);
    const { _id : replyTo, writer, content } = comment;
    const currentUserId = localStorage.getItem('userId');

    const onClickReplyOpen = useCallback(()=>{
        setOpenReply(!openReply);
    }, [openReply]);

    const onClickReplyFormOpen = useCallback(()=>{
        setOpenReplyForm(!openReplyForm);
    }, [openReplyForm]);

    const deleteComment = useCallback(()=>{
        if(window.confirm('정말 삭제 하시겠습니까?')){
            CommentApi.deleteComment({id: replyTo}).then(response=>{
                if(!response.data.success){
                    alert('댓글 삭제 실패')
                    return false;
                }
                delComment(replyTo);
            });
        }
    },[replyTo, delComment]);

    const reRefresh = useCallback((comment)=>{
        const newComment = [...CommentList, ...comment];
        setCommentList(newComment);
        setOpenReplyForm(false);
        if(setOpenReply){
            setOpenReply(true);
        }
    }, [CommentList, setOpenReplyForm, setOpenReply]);
    const reDelComment = (commentId)=>{
        const newComment = CommentList.filter(comment=>comment._id !== commentId);
        setCommentList(newComment);
    }

    useEffect(()=>{
        CommentApi.getComment({postId: videoId, replyTo}).then(response=>{
            if(!response.data.success){
                alert('댓글 조회 실패')
                return false;
            }
            setCommentList(response.data.commentList);
        });
    },[videoId, replyTo]);
    
    const deleteButton = currentUserId === writer._id ? <span className='del' onClick={deleteComment}>삭제</span> : null;
    const actions = [<span onClick={onClickReplyFormOpen} key='comment-basic-reply-to'>Reply to</span>, deleteButton];
    return(
        <div className='singleComment'>
            <Comment actions={actions} author={writer && writer.name} avatar={<Avatar src={writer && writer.image} alt={writer && writer.name} />} content={content} />
            {openReplyForm && <CommentForm replyTo={replyTo} addClass='reReply' videoId={videoId} refresh={reRefresh} />}
            <ReplyComment CommentList={CommentList} videoId={videoId} replyTo={replyTo} openReply={openReply} onClickReplyOpen={onClickReplyOpen} delComment={reDelComment}></ReplyComment>
        </div>
    )
})
export default SingleComment;