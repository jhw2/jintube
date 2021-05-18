import React, { memo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Form, Icon } from 'antd';
import fileUpload from '../../../http/FileUpload';

const DropZone = memo(()=>{
    const [filePath, setFilePath] = useState("");
    const [fileDuration, setFileDuration] = useState("");
    const onDrop = (files)=>{
        let formData = new FormData;
        formData.append('file', files[0]);
        fileUpload.uploadFile(formData).then(response =>{
            const {data} = response;
            if(data.success){
                const {url, filename} = data;
                fileUpload.getThumbnail({url, filename}).then(response=>{
                    const {data} = response;
                    if(data.success){
                        const {url, fileDuration} = data;
                        setFilePath(url);
                        setFileDuration(fileDuration)
                    }else{
                        alert('썸네일 생성 실패');
                    }
                });
            }else{
                alert('업로드 실패');
            }
        })
    }
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
    return (
        <div>
            <Form >
                <div className='dropZone' {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Icon type='plus' />
                </div>
                <div>
                    <img src={`http://localhost:5000/${filePath}`} alt='' />                    
                </div>
            </Form>
        </div>
    )
})
export default DropZone;