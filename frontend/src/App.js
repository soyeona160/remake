import React  from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Routes/Login'
import Main from './Routes/Main'
import Write from './Routes/Write'
import Read from './Routes/Read'
import { Avatar, Card, Divider, Flex, Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;

const headerStyle = {
    textAlign: 'center',
    width: '100%',
    height: 70,
    paddingInline: 48,
    lineHeight: '64px',
    display: 'flex',
    background:'white',
    boxShadow: '0 0 5px -4px #999'
  };

  const contentStyle = {
    textAlign: 'center',
    width: '60%',
    margin: '50px auto'
  };
  const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    width: '100%',
    background: '#999'
  };
  const layoutStyle = {
    width: '100vw',
    minWidth: 'calc(50% - 8px)',
  };



function App() {
  return (
    <Flex>
    <Layout style={layoutStyle}>
        <Header style={headerStyle}> 캔메이트 </Header>
        <Content style={contentStyle}>
          <BrowserRouter>
            <Routes>
            <Route path='/' element={<Main/>}></Route>
              <Route path='/users/login' element={<Login/>}></Route>
              <Route path='/posts/write' element={<Write/>}></Route>
              <Route path='/posts/read' element={<Read/>}></Route>
            </Routes>
          </BrowserRouter>
        </Content>
        <Footer style={footerStyle}>Footer</Footer>
    </Layout>
</Flex>
  );
}

export default App;
