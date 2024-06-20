import { AutoComplete, Carousel } from 'antd';
import { Typography } from "antd";
import React, {useEffect, useState} from "react";
import CarouselImg from '../../src/gradient.jpg'
import CardCom from '../Components/CardComponent'
import CardWrapper from "../Components/CardWrapper";
import { Space} from "antd";
import { Avatar, Card, Divider, Flex, Layout } from "antd";
import axios from 'axios';
// import { url } from 'inspector';
const { Header, Footer, Sider, Content } = Layout;
const { Title ,Text, Link } = Typography;

const contentStyles = {
    width: '100%',
  margin: 0,
  height: '350px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center'
};

const DividerStyle = {
    margin: '30px 0',
    fontWeight: 'bold',
    fontSize: '1.3rem'
}

 const contentStyle = {
    textAlign: 'center',
    width: '60%',
    color: '#fff',
    margin: '50px auto'
  };



const Main = () =>{
    const onChange = (currentSlide) => {
        console.log(currentSlide);
      };

    

    const [isLogin, setIsLogin] = useState(false)
    const [List, setList] = useState([])
    const getList = async()=>{
        const posts = (await axios.get(`http://127.0.0.1:5001/posts`)).data.posts
        console.log(posts)
        setList(posts)
    }

    useEffect(()=>{
        getList()
    },[])

    return(
        <Flex>
            <Content style={contentStyle}>
                    <Carousel afterChange={onChange}>
                        <div>
                            <img src={CarouselImg} style={contentStyles}></img>
                        </div>
                        <div>
                            <div style={contentStyles}></div>
                        </div>
                    </Carousel>
                    <Divider style={DividerStyle}>캔메이트를 찾아보세요!</Divider>
                    <CardWrapper posts={List}></CardWrapper>
            </Content>
        </Flex>
    )
}

export default Main