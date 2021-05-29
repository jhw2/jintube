import React, { useState, memo } from 'react';
import { useSelector } from 'react-redux';

const Comment = memo(({onSubmit})=>{
    const user = useSelector(state=>state.user);
    const [comment, setComment] = useState('');
    const disabled = user.userData && user.userData._id ? '' : 'disabled';

    const handleClick = (e)=>{
        setComment(e.target.value);
    }
    const onSubmitHandle = (e)=>{
        e.preventDefault();
        onSubmit(e.target.comment.value);
        setComment('');
    }
    return(
        <div className='reply reReply'>
            <form onSubmit={onSubmitHandle}>
                <textarea  onChange={handleClick} name='comment' value={comment} placeholder='댓글을 작성해주세요' disabled={disabled}></textarea>
                <button disabled={disabled}>댓글입력</button>
            </form>
        </div>
    )
})
export default Comment;