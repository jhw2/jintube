import React, { memo, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon } from 'antd';
import { SERVER_URL } from '../../../Config';
import VideoApi from '../../../../http/VideoApi';
import Loading from './Loading';

const DropZone = memo(({setFilePath, thumbFilePath, setThumbFilePath, setFileDuration})=>{
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback((files)=>{
        let formData = new FormData();
        formData.append('file', files[0]);
        
        setLoading(true);

        VideoApi.uploadFile(formData).then(response =>{
            const {data} = response;
            if(!data.success){
                alert('업로드 실패 '+ data.err);
                setLoading(false);
                return false;
            }
            const {url, filename} = data;
            setFilePath(filename);
            VideoApi.getThumbnail({url, filename}).then(response=>{
                const {data} = response;
                if(!data.success){
                    alert('썸네일 생성 실패');
                    setLoading(false);
                    return false;
                }
                const {url, fileDuration} = data;
                setThumbFilePath(url);
                setFileDuration(fileDuration);
                setLoading(false);
            });
        })
    },[setFilePath, setThumbFilePath, setFileDuration]);

    const {getRootProps, getInputProps} = useDropzone({onDrop});
    return (
        <div className='uploadForm'>
            <Loading isVisible={loading} />
            <div className='dropZone' {...getRootProps()}>
                <input {...getInputProps()} accept=".mp4" />
                <Icon type='plus' />
            </div>
            <div>
                <img src={SERVER_URL+thumbFilePath} alt='' />                    
            </div>
        </div>
    )
})
export default DropZone;