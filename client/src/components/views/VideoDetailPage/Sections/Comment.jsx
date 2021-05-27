import React, { memo } from 'react';
import CommentForm from './CommentForm';
import SingleComment from './SingleComment';

const Comment = memo(({CommentList, videoId, refresh})=>{ 
    return(
        <div className='comment-list'>
            <h6 className='line-title'>Reply</h6>
            {CommentList.map((comment, i)=>{
                if(!comment.replyTo){
                    return <SingleComment key={comment._id} comment={comment} videoId={videoId} refresh={refresh} />
                }else{
                    return ''
                }
            })}
            <CommentForm videoId={videoId} refresh={refresh} />
        </div>
    )
})
export default Comment;