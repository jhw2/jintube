import React, { memo, useState } from 'react';
import { Input } from 'antd';

const { TextArea } = Input;
const UploadDesc = memo(({onChangeInput})=>{
    const [videoDesc, setVideoDesc] = useState("");
    return (
        <div className='mb5'>
            <label>Description</label>
            <TextArea onChange={(e)=>onChangeInput(e, setVideoDesc)} value={videoDesc} name='description' required/>
        </div>
    )
})
export default UploadDesc;