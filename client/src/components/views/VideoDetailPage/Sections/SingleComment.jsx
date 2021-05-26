import React, {useState, memo } from 'react';
import { Comment, Avatar, Button, Input } from 'antd';
import CommentForm from './CommentForm';
import CommentApi from '../../../../http/CommentApi';

const { TextArea } = Input;
const SingleComment = memo(({comment, videoId, refresh})=>{
    const [openReply, setOpenReply] = useState(false);
    const { _id, writer, content } = comment;
    const onClickReplyOpen = ()=>{
        setOpenReply(!openReply);
    }
    const actions = [<span onClick={onClickReplyOpen} key='comment-basic-reply-to'>Reply to</span>]
    return(
        <div>
            <Comment actions={actions} author={writer && writer.name} avatar={<Avatar src={writer && writer.image} alt={writer && writer.name} />} content={content} />
            {openReply && <CommentForm replyTo={_id} addClass='reReply' videoId={videoId} refresh={refresh} />}
            
        </div>
    )
})
export default SingleComment;