import React, { memo } from 'react';
import SingleComment from './SingleComment';

const ReplyComment = memo(({CommentList, videoId, onClickReplyOpen, openReply, delComment})=>{ 
    return(
        <div>
            <p className='commentNum' onClick={onClickReplyOpen}> {CommentList.length !== 0 && '댓글 ' + CommentList.length + '개'}</p>
            {openReply && CommentList.map((comment, i)=>{
                return <SingleComment key={comment._id} comment={comment} videoId={videoId} delComment={delComment} />;
            })}
        </div>
    )
})
export default ReplyComment;