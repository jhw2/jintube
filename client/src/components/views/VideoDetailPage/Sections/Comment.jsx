import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import SingleComment from './SingleComment';
import CommentApi from '../../../../http/CommentApi';

const Comment = memo(({CommentList, videoId, refresh, delComment})=>{ 
    const user = useSelector(state=>state.user);
    const insertComment = (content)=>{
        const params ={writer: user.userData._id, postId: videoId, content};
        CommentApi.saveComment(params).then(response=>{
            if(!response.data.success){
                alert('댓글 저장 실패');
                return false;
            }
            refresh(response.data.result);
        }); 
    }
    return(
        <div className='comment-list'>
            <h6 className='line-title'>Reply</h6>
            {CommentList.map((comment, i)=>{
                if(!comment.replyTo){
                    return <SingleComment key={comment._id} comment={comment} videoId={videoId} refresh={refresh} delComment={delComment} />
                }else{
                    return ''
                }
            })}
            <CommentForm onSubmit={insertComment} />
        </div>
    )
})
export default Comment;