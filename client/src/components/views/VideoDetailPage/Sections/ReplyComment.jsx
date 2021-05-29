import React, { memo } from 'react';
import SingleComment from './SingleComment';

const ReplyComment = memo(({commentList, videoId, onClickReplyOpen, openReply, delComment})=>{ 
    return(
        <div>
            <p className='commentNum' onClick={onClickReplyOpen}> {commentList.length !== 0 && '댓글 ' + commentList.length + '개'}</p>
            {openReply && commentList.map((comment, i)=>{
                return <SingleComment key={comment._id} comment={comment} videoId={videoId} delComment={delComment} />;
            })}
        </div>
    )
})
export default ReplyComment;