import React from "react";
import styled from 'styled-components'
import CardCom from './CardComponent'
import mongoose from "mongoose";
import { Avatar, Card, Divider, Flex, Layout } from "antd";
import axios from "axios";
const { Meta } = Card;

const spaceStyle = {
    width: '60vw',
    minWidth: '600px',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    overflow: 'hidden',
    justfyContent: 'center',
    alignItems: 'center',
    border: '1px solid blue'

}

const posts = [ {title: 'study with me', description:'설명으로가야하나'},{title: 'study with me', description:' '},{title: 'study with me', description:' '},{title: 'study with me', description:' '}, {title: 'study with me', description:' '},{title: 'study with me', description:' '},{title: 'study with me', description:' '},{title: 'study with me', description:' '} ]
// const posts = await axios.get('/posts')
const CardWrapper = () =>{


    return(
        <div style={spaceStyle}>
            { posts.map((item)=>{
                return(
                    <Card 
                    hoverable style={{width: 260}} 
                    cover={
                            <img alt="thumbnail" 
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }>

                        <Meta
                            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                            title={item.title}
                            description={item.description}
                        />
                    </Card>
                    )
            })}
        </div>
    )
}
export default CardWrapper