import React from "react";

import styled from 'styled-components'
import { Avatar, Card, Divider, Flex, Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

const HeaderComponent = () =>{


    const headerStyle = {
        textAlign: 'center',
        width: '100%',
        height: 70,
        paddingInline: 48,
        lineHeight: '64px',
        display: 'flex',
        background:'white',
        boxShadow: '0 0 5px -4px #999',
        fontWeight: 900,
        fontSize: '1.4rem',
        cursor: 'pointer'
      };

    return(
        <Header style={headerStyle}><a href='/'>캔메이트</a></Header>
        
    )
}

export default HeaderComponent