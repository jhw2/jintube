import React, { useState, memo } from 'react';

const Comment = memo(({content, onSubmit})=>{
    const [commentValue, setComment] = useState(content);

    const handleClick = (e)=>{
        setComment(e.target.value);
    }
    const onSubmitHandle = (e)=>{
        e.preventDefault();
        onSubmit(e.target.comment.value)
    }
    return(
        <div className='reply reReply'>
            <form onSubmit={onSubmitHandle}>
                <textarea  onChange={handleClick} name='comment' value={commentValue} placeholder='댓글을 작성해주세요'></textarea>
                <button>댓글수정</button>
            </form>
        </div>
    )
})
export default Comment;