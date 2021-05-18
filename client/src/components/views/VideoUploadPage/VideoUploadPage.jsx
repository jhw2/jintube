import React from 'react';
import { Typography, Button, message, Input} from 'antd';
import DropZone from './DropZone';
import UploadTitle from './UploadTitle';
import UploadDesc from './UploadDesc';
import Select from './Select';


const { Title } = Typography;
const { TextArea } = Input; 
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
const VideoUploadPage = ()=>{  

    const onChangeInput = (e, set)=>{
        e.preventDefault();
        set(e.target.value);
    }

    return(
        <div>
            <div style={{textAlign: 'center', margin: '20px 0'}}>
                <Title level={2}>Upload Video</Title>
            </div>
            
            <DropZone></DropZone>
            <UploadTitle onChangeInput={onChangeInput}></UploadTitle>
            <UploadDesc onChangeInput={onChangeInput}></UploadDesc>

            

            

            <div>
                <Select onChangeInput={onChangeInput} options={privateOptions} defaultValue={0}></Select>
                <Select onChangeInput={onChangeInput} options={categoryOptions} defaultValue={"Film & Animation"}></Select>
            </div>
            <Button type='primary' size='large'>Submit</Button>
            
        </div>
    )
}

export default VideoUploadPage;