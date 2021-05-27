import React, { memo } from 'react';
import SingleComment from './SingleComment';

const ReplyComment = memo(({CommentList, videoId, refresh})=>{ 
    
    return(
        <div>
            <p> {CommentList.length !== 0 && '댓글 ' + CommentList.length + '개'}</p>
           {CommentList.map((comment, i)=>{
                return <SingleComment key={comment._id} comment={comment} videoId={videoId} refresh={refresh} />;
            })}
        </div>
    )
})
export default ReplyComment;