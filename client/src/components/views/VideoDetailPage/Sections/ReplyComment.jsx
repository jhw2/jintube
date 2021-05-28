import React, { memo, useState, useCallback } from 'react';
import SingleComment from './SingleComment';

const ReplyComment = memo(({CommentList, videoId, refresh})=>{ 
    const [openReply, setOpenReply] = useState(false);
    const onClickReplyOpen = useCallback(()=>{
        setOpenReply(!openReply);
    }, [openReply]);
    return(
        <div>
            <p onClick={onClickReplyOpen}> {CommentList.length !== 0 && '댓글 ' + CommentList.length + '개'}</p>
           {openReply && CommentList.map((comment, i)=>{
                return <SingleComment key={comment._id} comment={comment} videoId={videoId} refresh={refresh} />;
            })}
        </div>
    )
})
export default ReplyComment;