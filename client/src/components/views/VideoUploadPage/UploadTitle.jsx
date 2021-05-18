import React, { memo, useState } from 'react';
import { Input } from 'antd';

const UploadTitle = memo(({onChangeInput})=>{
    const [videoTitle, setVideoTitle] = useState("");
    return (
        <div>
            <label>title</label>
            <Input onChange={(e)=>onChangeInput(e, setVideoTitle)} value={videoTitle}></Input>
        </div>
    )
})
export default UploadTitle;