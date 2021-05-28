import React, { useState, memo } from 'react';
import { useSelector } from 'react-redux';
import CommentApi from '../../../../http/CommentApi';

const Comment = memo(({videoId, addClass = '', replyTo, refresh})=>{
    const user = useSelector(state=>state.user);
    const [comment, setComment] = useState('');
    const disabled = user.userData && user.userData._id ? '' : 'disabled';

    const handleClick = (e)=>{
        setComment(e.target.value);
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        
        const params ={writer: user.userData._id, postId: videoId, content: e.target.comment.value, replyTo};
        CommentApi.saveComment(params).then(response=>{
            if(!response.data.success){
                alert('댓글 저장 실패');
                return false;
            }
            refresh(response.data.result);
            setComment('');
        }); 

    }
    
    return(
        <div className={'reply ' + addClass}>
            <form onSubmit={onSubmit}>
                <textarea  onChange={handleClick} name='comment' value={comment} placeholder='댓글을 작성해주세요' disabled={disabled}></textarea>
                <button disabled={disabled}>댓글입력</button>
            </form>
        </div>
    )
})
export default Comment;