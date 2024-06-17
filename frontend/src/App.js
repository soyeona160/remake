import React  from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Routes/Login'
import Main from './Routes/Main'
import Write from './Routes/Write'
import Read from './Routes/Read'
import Signup from './Routes/Signup'
import HeaderComponent from './Components/HeaderComponent'
import "./index.css"

import { Avatar, Card, Divider, Flex, Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;

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
        <HeaderComponent> 캔메이트 </HeaderComponent>
        <Content style={contentStyle}>
          <BrowserRouter>
            <Routes>
            <Route path='/' element={<Main/>}></Route>
              <Route path='/users/login' element={<Login/>}></Route>
              <Route path='/users/signup' element={<Signup/>}></Route>
              <Route path='/posts/write' element={<Write/>}></Route>
              <Route path='/posts/read/:id' element={<Read/>}></Route>
            </Routes>
          </BrowserRouter>
        </Content>
        <Footer style={footerStyle}>Footer</Footer>
    </Layout>
</Flex>
  );
}

export default App;
