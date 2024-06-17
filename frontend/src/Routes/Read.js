import {useNavigate, useParams} from 'react-router-dom'
import styled from "styled-components";
import { Flex, message, Upload, Typography, Button, Divider, Image} from 'antd';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
const { Title ,Text, Link } = Typography;



const Read = () => {
    const  {id} = useParams()
    const [loading, setLoading]= useState(true)
    const [post, setPost] = useState({})

    const getPost = async()=>{
        const posted = await (await axios.get(`http://127.0.0.1:5001/posts/read/${id}`)).data
        // console.log(posted)
        setPost(posted)
        setLoading(false)
    }

    let postDate = new Date(post.createdAt)
    let year = postDate.getFullYear()
    let month = ('0'+(postDate.getMonth()+1)).slice(-2)
    let day = ('0'+postDate.getDate()).slice(-2)
    let hour = postDate.getHours()
    console.log(year, month, day, hour)

    useEffect(()=>{
        getPost();
    }, [])

    const uploaderStyle = {
        width: '100%',
        justifyContent:'center',
        alignitems:'center'
    }
    // const post = {title: 'study with me', description: "룰루랄라"}
    const navigate = useNavigate()
    const readStyle = styled.div`
        width: 100%,
        height : 900px,
        display: flex,
        justifyContent: start,
        alignItems: center,
        gap: 10px,
        flexFlow: column,
        color: #222,
        fontSize: 1.2rem,
        background: black
    `

    const Img = styled.div`
        width:
    `

    const Info = {
        width: '50%',
        textAlign: 'start',
        display: 'flex',
        flexFlow:'column',
        gap: '20px'
    }
    



    return(

        <div>
            {loading? (<h2>로딩중 . . .</h2>):
                (<readStyle>
                <Title>{post.title}</Title>
                <Flex gap='large'>
                    <Image width={400}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>

                    <div style={Info}>
                        <div>작성자 : {post.author.name}</div>
                        <div>작성일 : {year+'년 '+month+'월 '+day+'일 '+hour+'시 '}</div>
                        <Divider>캔메이트 소개</Divider>
                        <div>{post.description}</div>
                        <Flex gap="small" style={uploaderStyle}>
                            <Button type="primary"size='large' onClick={()=>navigate(`${post.room}`)}>참여하기</Button>
                            <Button type="text" size='large' onClick={()=>navigate('/')}>뒤로가기</Button>
                        </Flex>
                    </div>      

                    
                </Flex>

            </readStyle>)
        }   
        </div>
    )
}

export default Read