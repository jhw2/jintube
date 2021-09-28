import React from 'react';
import { message } from 'antd';
import VideoApi from '../../../../http/VideoApi';

const DeleteBtn = ({history, videoId})=>{
    const deleteVideo = ()=>{
        if(!window.confirm('정말 삭제하시겠습니까?')){
            return false;
        }
        VideoApi.deleteVideo({videoId}).then(response=>{
            if(response.data.success){
                message.success('삭제되었습니다.');
                history.push('/');
            }else{
                alert('삭제실패');
            }
        });
    }
    
    return(
             <button className='deleteBtn' onClick={deleteVideo} type='button'>삭제</button>
    )
}

export default DeleteBtn;