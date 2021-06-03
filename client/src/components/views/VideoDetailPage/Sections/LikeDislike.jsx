import React, { memo, useEffect, useState, useCallback } from 'react';
import { Tooltip, Icon } from 'antd';
import LikeDislikeApi from '../../../../http/LikeDislikeApi';

const LikeDislike = memo(({videoId, commentId, userId, history})=>{ 
    const [likes, setLikes] = useState(0);
    const [likeAction, setLikeAction] = useState('outlined');
    const [disLikes, setDisLikes] = useState(0);
    const [disLikeAction, setDisLikeAction] = useState('outlined');

    const setLikeState = useCallback(({success, likes, setCount, setAction})=>{
        if(!success){
            alert('좋아요 정보 조회 실패');
            return false;
        }
        setCount(likes.length);
        const checked = likes.filter(like=>like.userId === userId).length === 0 ? 'outlined' : 'filled';
        setAction(checked); 
    }, [userId]);

    const callLikeDisLike = useCallback(()=>{
        const param = videoId ? {videoId} : {commentId};
        LikeDislikeApi.getLikes(param).then(({data})=>{
            const {success, likes} = data;
            setLikeState({success, likes, setCount: setLikes, setAction: setLikeAction});
        });
        LikeDislikeApi.getDisLikes(param).then(({data})=>{
            const {success, disLikes: likes} = data;
            setLikeState({success, likes, setCount: setDisLikes, setAction: setDisLikeAction});
        });
    },[videoId, commentId, setLikeState])

    useEffect(()=>{
        callLikeDisLike()
    },[callLikeDisLike]);

    const toggleLiked = useCallback(({currentAction, onApi, unApi})=>{
        const param = videoId ? {videoId, userId} : {commentId, userId};
        if(!userId){
            alert('로그인 후 가능합니다.');
            history.push("/login");
            return false;
        }
        if(currentAction === 'outlined'){
            onApi(param).then(response=>{
                if(!response.data.success){
                    alert('좋아요 저장 실패');
                    return false;
                }
                callLikeDisLike();
            });
        }else{
            unApi(param).then(response=>{
                if(!response.data.success){
                    alert('좋아요 삭제 실패');
                    return false;
                }
                callLikeDisLike();
            });
        }
        
    }, [videoId, commentId, userId, history, callLikeDisLike]);

    const onLiked = useCallback(()=>{
        toggleLiked({currentAction: likeAction, onApi: LikeDislikeApi.onLiked, unApi: LikeDislikeApi.unLiked});
    }, [likeAction, toggleLiked]);

    const onDisLiked = useCallback(()=>{
        toggleLiked({currentAction: disLikeAction, onApi: LikeDislikeApi.onDisLiked, unApi: LikeDislikeApi.unDisLiked});
    }, [disLikeAction, toggleLiked]);

    return(
        <div>
           <span key='comment-basic-like'>
                <Tooltip title='Like'>
                    <Icon type='like' theme={likeAction} onClick={onLiked}></Icon>
                </Tooltip>
                <span>{likes}</span>
           </span>
           <span key='comment-basic-dislike'>
                <Tooltip title='Dislike'>
                    <Icon type='dislike' theme={disLikeAction} onClick={onDisLiked}></Icon>
                </Tooltip>
                <span>{disLikes}</span>
           </span>
        </div>
    )
})
export default LikeDislike;