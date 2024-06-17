import React from "react";
import {useNavigate} from 'react-router-dom'
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
    justifyContent: 'center',
    alignItems: 'center'
}

// const posts = [ {title: 'study with me', author:'집가맨'},{title: 'study with me', author:' '},{title: 'study with me', author:' '},{title: 'study with me', author:' '}, {title: 'study with me', author:' '},{title: 'study with me', author:' '},{title: 'study with me', author:' '},{title: 'study with me', author:' '} ]
// const posts = await axios.get('/posts')
const CardWrapper = ({posts}) =>{
    const navigate = useNavigate()
    console.log(posts)
    return(
        <div style={spaceStyle}>
            { posts.map((item)=>{
                console.log(item.author.name)
                return(
                    <Card 
                    hoverable style={{width: 260}} 
                    cover={
                            <img alt="thumbnail" 
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        } onClick={()=>navigate(`/posts/read/${item._id}`)}>

                        <Meta
                            title={item.title}
                            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                            description={item.author.name}
                        />
                    </Card>
                    )
            })}
        </div>
    )
}
export default CardWrapper