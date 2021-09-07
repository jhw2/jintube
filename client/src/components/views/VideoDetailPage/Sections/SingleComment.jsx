import React, { memo, useState, useEffect, useCallback } from 'react';
import { Comment, Avatar } from 'antd';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import UpdateCommentForm from './UpdateCommentForm';
import ReplyComment from './ReplyComment';
import LikeDislike from './LikeDislike';
import CommentApi from '../../../../http/CommentApi';

const SingleComment = memo(({comment, videoId, delComment, history})=>{
    const user = useSelector(state=>state.user);
    const { _id : replyTo, writer, content } = comment;

    const [contentTxt, setContentTxt] = useState(content);
    const [openReplyForm, setOpenReplyForm] = useState(false);
    const [openUpdateForm, setopenUpdateForm] = useState(false);
    const [commentList, setCommentList] = useState([]); 
    const [openReply, setOpenReply] = useState(false);
    
    const currentUserId = localStorage.getItem('userId');

    const onClickReplyOpen = useCallback(()=>{
        setOpenReply(!openReply);
    }, [openReply]);
    const onClickReplyFormOpen = useCallback(()=>{
        setOpenReplyForm(!openReplyForm);
        setopenUpdateForm(false);
    }, [openReplyForm]);

    const insertComment =  useCallback((content)=>{
        const params ={writer: user.userData._id, postId: videoId, content, replyTo};
        CommentApi.saveComment(params).then(response=>{
            if(!response.data.success){
                alert('댓글 저장 실패');
                return false;
            }
            const newComment = [...commentList, ...response.data.result];
            setCommentList(newComment);
            setOpenReplyForm(false);
            if(setOpenReply){
                setOpenReply(true);
            }
        }); 
    }, [replyTo, videoId, user, commentList, setOpenReplyForm, setOpenReply]);

    const updateCommentOpen = useCallback(()=>{
        setOpenReplyForm(false);
        setopenUpdateForm(!openUpdateForm); 
    },[openUpdateForm]);
    const updateComment = useCallback((content)=>{
        const params ={id: replyTo, content};
        CommentApi.updateComment(params).then(response=>{
            if(!response.data.success){
                alert('댓글 수정 실패');
                return false;
            }
            setContentTxt(response.data.result);
            setopenUpdateForm(false);
        }); 
    },[replyTo]);
    

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
    const reDelComment = useCallback((commentId)=>{
        const newComment = commentList.filter(comment=>comment._id !== commentId);
        setCommentList(newComment);
    },[commentList])

    useEffect(()=>{
        CommentApi.getComment({postId: videoId, replyTo}).then(response=>{
            if(!response.data.success){
                alert('댓글 조회 실패')
                return false;
            }
            setCommentList(response.data.commentList);
        });
    },[videoId, replyTo]);
    
    const updateButton = currentUserId === writer._id ? <span className='btn ic-update' onClick={updateCommentOpen}>수정</span> : null;
    const deleteButton = currentUserId === writer._id ? <span className='btn ic-del' onClick={deleteComment}>삭제</span> : null;
    const actions = [<LikeDislike commentId={replyTo} userId={currentUserId} history={history} />, <span onClick={onClickReplyFormOpen} key='comment-basic-reply-to'>Reply to</span>, updateButton, deleteButton];
    return(
        <div className='singleComment'>
            <Comment actions={actions} author={writer && writer.name} avatar={<Avatar src={writer && writer.image} alt={writer && writer.name} />} content={contentTxt} />
            {openReplyForm && <CommentForm onSubmit={insertComment} />}
            {openUpdateForm && <UpdateCommentForm onSubmit={updateComment} content={contentTxt} />}
            <ReplyComment commentList={commentList} videoId={videoId} replyTo={replyTo} openReply={openReply} onClickReplyOpen={onClickReplyOpen} delComment={reDelComment}></ReplyComment>
        </div>
    )
})
export default SingleComment;