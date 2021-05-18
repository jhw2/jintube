import React, { memo, useState } from 'react';
import { Input } from 'antd';

const { TextArea } = Input;
const UploadDesc = memo(({onChangeInput})=>{
    const [videoDesc, setVideoDesc] = useState("");
    return (
        <div>
            <label>description</label>
            <TextArea onChange={(e)=>onChangeInput(e, setVideoDesc)} value={videoDesc} />
        </div>
    )
})
export default UploadDesc;