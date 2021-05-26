import React, { useState, memo } from 'react';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import SingleComment from './SingleComment';
import CommentApi from '../../../../http/CommentApi';

const Comment = memo(({CommentList, videoId, refresh})=>{ 
    console.log(CommentList.length, videoId)
    return(
        <div>
            <h6 className='line-title'>Reply</h6>
            {CommentList.map((comment, i)=>{
                if(!comment.replyTo){
                    return <SingleComment key={comment._id} comment={comment} videoId={videoId} refresh={refresh} />
                }
            })}
            <CommentForm videoId={videoId} refresh={refresh} />
        </div>
    )
})
export default Comment;