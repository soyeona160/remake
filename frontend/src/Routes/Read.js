import { Flex, message, Upload, Typography } from 'antd';
import React, {useState} from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
const { Title ,Text, Link } = Typography;


const Read = () => {
    const post = {title: 'study with me', description: "룰루랄라"}
    return(
        <div>
            <h1>{post.title}</h1>
            <div>
                <span>{post.description}</span>
            </div>
        </div>
    )
}

export default Read