import React, { useState, useCallback } from 'react';
import { Typography, message, Input, Form, Button} from 'antd';
import DropZone from './DropZone';
import UploadTitle from './UploadTitle';
import UploadDesc from './UploadDesc';
import Select from './Select';
import fileUpload from '../../../http/FileUpload';
import { useSelector } from 'react-redux';
import { PromiseProvider } from 'mongoose';


const { Title } = Typography;
const privateOptions = [
    {value: 0, label: 'Private'},
    {value: 1, label: 'Public'},
];
const categoryOptions = [
    {value: 0, label: 'Film & animation'},
    {value: 1, label: 'Autos & Vehicles'},
    {value: 2, label: 'Music'},
    {value: 3, label: 'Pets & Animals'},
]
const VideoUploadPage = (props)=>{  
    const user = useSelector(state => state.user);
    const [filePath, setFilePath] = useState("");
    const [thumbFilePath, setThumbFilePath] = useState("");
    const [fileDuration, setFileDuration] = useState("");

    const onChangeInput = useCallback((e, set)=>{
        e.preventDefault();
        set(e.target.value);
    },[])

    const onSubmit = useCallback((e)=>{
        e.preventDefault();
        const { title, description, privacy, category } = e.target;

        const params = {
            writer: user.userData._id, 
            title: title.value, 
            description: description.value, 
            privacy: privacy.value, 
            filepath: filePath, 
            category: category.value, 
            duration: fileDuration, 
            thumbnail: thumbFilePath
        };
        fileUpload.uploadVideo(params).then(response=>{
            if(response.data.success){
                message.success('업로드 성공');
                setTimeout(()=>{props.history.push('/')}, 2000)
                
            }else{
                alert('업로드실패')
            }
        });
    },[user, filePath, fileDuration])

    return(
        <div>
            <div style={{textAlign: 'center', margin: '20px 0'}}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit={onSubmit}>
                <DropZone setFilePath={setFilePath} thumbFilePath={thumbFilePath} setThumbFilePath={setThumbFilePath} setFileDuration={setFileDuration}></DropZone>
                <UploadTitle onChangeInput={onChangeInput}></UploadTitle>
                <UploadDesc onChangeInput={onChangeInput}></UploadDesc>

                <div>
                    <Select onChangeInput={onChangeInput} options={privateOptions} defaultValue={0} name='privacy'></Select>
                    <Select onChangeInput={onChangeInput} options={categoryOptions} defaultValue={"Film & Animation"} name='category'></Select>
                </div>

                <input type='submit' value='업로드' className='ant-btn ant-btn-primary ant-btn-lg' />
            </Form>
        </div>
    )
}

export default VideoUploadPage;