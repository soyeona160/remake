import { Flex, message, Upload, Typography } from 'antd';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
const { Title ,Text, Link } = Typography;



const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};


const Write = () =>{
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [roomLink, setRoomLink] = useState("");
  const [thumbNail, setThumbnail] = useState("")
  const navigate = useNavigate()


    const [loading, setLoading] = useState(false);

    const [imageUrl, setImageUrl] = useState();

    const handleChange = (info) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url) => {
          setLoading(false);
          setImageUrl(url);
        });
      }
    };

    const uploadButton = (
      <button
        style={{
          border: 0,
          background: 'none',
          width: '500px'
        }}
        type="button"
      >
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div
          style={{
            marginTop: 8,
          }}
        >
          표지 등록
        </div>
      </button>
    );

    const onSubmit = (e) =>{
        e.preventDefault()
        let data = {
            title: title,
            description: description,
            password: password,
            roomLink: roomLink
        }

        axios.post('http://127.0.0.1:5001/posts/write', data, { withCredentials: true })
        .then(function (response) {
             console.log(response)
             navigate('/')

          })
        .catch(function (error) {
            console.log(error);})
    }

    const wrapStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        flexFlow: 'column',
        color: '#222',
        fontSize: '1.2rem',

    }

    const textareaStyle = {
        resize: 'none',
        height: '20vh'
    }
    const uploaderStyle = {
        width: '100%',
        justifyContent:'center',
        alignitems:'center'
    }

    return(
        <div style={wrapStyle}>
            <Title level={2}>모집하기</Title>
            <Title level={4}>게시글을 작성해 동료를 모으세요!</Title>

            <Upload name="uploadFile" listType="picture-card" className="thumbnail-uploader"
                showUploadList={false} beforeUpload={beforeUpload} onChange={handleChange}>
                {imageUrl ? (<img src={imageUrl} alt="thumbnail" 
                style={{width: '100%'}}/>) : (uploadButton)}
            </Upload>

            <Form
            variant="filled"
            layout="vertical"
            onSubmit={onSubmit}
            style={{
            width: '100%',
            minWidth: 600,
            display: 'flex',
            flexFlow: 'column',
            gap: '15px',
            justifyContent:'center'
          }}
        >
          <Form.Item
            label="제목"
            name="title"
            rules={[
              {
                required: true,
                message: '제목을 정해주세요!',
              },
            ]}
          >
            <Input  placeholder='제목을 입력하세요' onChange={(e)=>{
                setTitle(e.target.value)
            }}/>
          </Form.Item>
    
          <Form.Item
            label="본문"
            name="description"
            rules={[
              {
                required: true,
                message: '본문을 작성해주세요!',
              },
            ]}
          >
            <Input.TextArea style={textareaStyle}  placeholder='화상통화의 목적, 규칙, 열정 등에 대해 적어주세요!' onChange={(e)=>{
                setDescription(e.target.value)
            }}/>
          </Form.Item>
      
          <Form.Item
            label="비밀번호"
            name="password">
            <Input  placeholder='입력 시 해당 모집은 비밀이 됩니다.' onChange={(e)=>{
                setPassword(e.target.value)
            }}/>
          </Form.Item>
          <Form.Item
            label="링크"
            name="roomLink"
            rules={[
              {
                required: true,
                message: '화상채팅방 링크를 추가해주세요!',
              },
            ]}
          >
            <Input placeholder='화상채팅방 링크를 추가해주세요!' onChange={(e)=>{
                setRoomLink(e.target.value)
            }} />
          </Form.Item>
            <Flex gap="small" style={uploaderStyle}>
                <Button type="primary" htmlType="submit" size='large' onClick={onSubmit}>등록하기</Button>
                <Button type="text" size='large' onClick={()=>navigate('/')}>취소하기</Button>
            </Flex>
        </Form>
        </div>
    );

}

export default Write