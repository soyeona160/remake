import { AutoComplete, Carousel } from 'antd';
import { Typography } from "antd";
import React, {useState} from "react";
import CardCom from '../Components/CardComponent'
import CardWrapper from "../Components/CardWrapper";
import { Space} from "antd";
import { Avatar, Card, Divider, Flex, Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;
const { Title ,Text, Link } = Typography;


const contentStyles = {
  margin: 0,
  height: '350px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: 'yellow',
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
    return(
        <Flex>
            <Content style={contentStyle}>
                    <Carousel afterChange={onChange}>
                        <div>
                            <h3 style={contentStyles}>1</h3>
                        </div>
                        <div>
                            <h3 style={contentStyles}>2</h3>
                        </div>
                    </Carousel>
                    <Divider style={DividerStyle}>캔메이트를 찾아보세요!</Divider>
                    <CardWrapper></CardWrapper>
            </Content>
        </Flex>
    )
}

export default Main