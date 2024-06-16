import {useNavigate} from 'react-router-dom'
import styled from "styled-components";
import { Flex, message, Upload, Typography, Button} from 'antd';
import React, {useState} from 'react';
import axios from 'axios';


const Read = () => {
    const uploaderStyle = {
        width: '100%',
        justifyContent:'center',
        alignitems:'center'
    }
    const post = {title: 'study with me', description: "룰루랄라"}
    const navigate = useNavigate()
    const readStyle = styled.div`
        width: 100%,
        height : 900px,
        display: flex,
        justifyContent: center,
        alignItems: center,
        gap: 10px,
        flexFlow: column,
        color: #222,
        fontSize: 1.2rem,
    `

    const Img = styled.div`
        width:
    `



    return(
        <readStyle>
            <h1>{post.title}</h1>
            <div>
                 <div>여기에 이미지가 옵니다</div>
                 <div>작성자</div>
                <div>{post.description}</div>
            </div>
            <Flex gap="small" style={uploaderStyle}>
                <Button type="primary"size='large' onClick={()=>navigate('/')}>참여하기</Button>
                <Button type="text" size='large' onClick={()=>navigate('/')}>뒤로가기</Button>
            </Flex>
        </readStyle>


    )
}

export default Read