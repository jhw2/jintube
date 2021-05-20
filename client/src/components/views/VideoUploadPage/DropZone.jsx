import React, { memo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon } from 'antd';
import fileUpload from '../../../http/FileUpload';

const DropZone = memo(({setFilePath, thumbFilePath, setThumbFilePath, setFileDuration})=>{
    const onDrop = useCallback((files)=>{
        let formData = new FormData;
        formData.append('file', files[0]);
        fileUpload.uploadFile(formData).then(response =>{
            const {data} = response;
            if(data.success){
                const {url, filename} = data;
                setFilePath(filename);
                fileUpload.getThumbnail({url, filename}).then(response=>{
                    const {data} = response;
                    if(data.success){
                        const {url, fileDuration} = data;
                        setThumbFilePath(url);
                        setFileDuration(fileDuration)
                    }else{
                        alert('썸네일 생성 실패');
                    }
                });
            }else{
                alert('업로드 실패');
            }
        })
    },[setFilePath, setThumbFilePath, setFileDuration]);



    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
    return (
        <div>
            <div className='dropZone' {...getRootProps()}>
                <input {...getInputProps()} />
                <Icon type='plus' />
            </div>
            <div>
                <img src={`http://localhost:5000/${thumbFilePath}`} alt='' />                    
            </div>
        </div>
    )
})
export default DropZone;