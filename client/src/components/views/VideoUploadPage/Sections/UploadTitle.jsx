import React, { memo, useState } from 'react';
import { Input } from 'antd';

const UploadTitle = memo(({onChangeInput})=>{
    const [videoTitle, setVideoTitle] = useState("");
    return (
        <div className='mb5'>
            <label>Title</label>
            <Input onChange={(e)=>onChangeInput(e, setVideoTitle)} value={videoTitle} name='title' required></Input>
        </div>
    )
})
export default UploadTitle;