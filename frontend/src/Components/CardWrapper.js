import React from "react";
import styled from 'styled-components'
import CardCom from './CardComponent'
import mongoose from "mongoose";
import { Avatar, Card, Divider, Flex, Layout } from "antd";
import axios from "axios";
const { Meta } = Card;

const spaceStyle = {
    width: '80vw',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
}
// const posts = await axios.get('/posts')
const CardWrapper = () =>{


    return(
        <div style={spaceStyle}>
            <Card hoverable style={{width: 300}} cover={<img alt="thumbnail" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>}>
                <Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title="Card title"
                    description="This is the description"
                />
            </Card>
        </div>
    )
}
export default CardWrapper