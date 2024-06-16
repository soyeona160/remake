import React, {useState} from "react";
import styled from "styled-components";
import {Link, useNavigate} from 'react-router-dom'
import gradient from '../gradient.jpg'
import logo from '../logo.png'
import axios from 'axios'
import {
    Button,
    Form,
    Input,
  } from 'antd';

const Wrapper = styled.div`
    display: flex;
    width: 60%;
    height: 75vh;
    justify-content : center;
    align-items: center;
    border-radius : 10px;
    overflow : hidden;
    border: 1px solid #333;
    margin : 0 auto;
    min-width: 600px;
`

const Box = styled.div`
    display: flex;
    flex-flow: column;
    width: 600px;
    height: 700px;
    justify-content : center;
    align-items: center;
    gap: 10px;
    overflow : hidden;
    min-width: 600px;
`
const Text = styled.input.attrs({required:true})`
    all:unset;
    width: 70%;
    height: 30px;
    border-bottom: 2px solid #666;
    color: #666;
    font-size: 1rem;
`


    const Signup = () =>{
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [loginCheck, setLoginCheck] = useState(false)
        const [name, setName] = useState('false')
    
        const navigate = useNavigate()
    

        const onSubmit = (e) =>{
            console.log("값: ", email, password, name)
            e.preventDefault()
            let data = {
                name: name,
                email: email,
                password: password
            }
            console.log(data)
        
            axios.post('http://127.0.0.1:5001/users/register', data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }})
            .then(function (response) {
                 console.log(response)
                 if(response) setLoginCheck(true)
                 if(loginCheck) alert('회원가입이 완료되었습니다!')
                 navigate('/users/login')
              })
            .catch(function (error) {
                alert(error);})
        }

        return(
            <div>
                <Wrapper> 
                    <Box>
                    <h1>회원가입</h1>
                    <h3>로그인하여 캔메이트의 다양한 서비스를 경험하세요.</h3>
                    <Form layout="vertical" style={{width: '90%'}} onSubmit={onSubmit} >
                        <Form.Item
                            label="이메일"
                            name="email"
                            value="email"
                            rules={[
                                {
                                required: true,
                                message: '이메일을 입력해주세요!',
                                },
                            ]}
                            >
                            <Input onChange={(e)=>{
                                console.log(e.target.value)
                                setEmail(e.target.value)
                    }}/>
                            </Form.Item>
                    
                            <Form.Item
                            label="이름"
                            name="name"
                            value="name"
                            rules={[
                                {
                                required: true,
                                message: '이름을 입력해주세요1',
                                },
                            ]}
                            >
                            <Input onChange={(e)=>{
                                console.log(e.target.value)
                                setName(e.target.value)
                    }}/>
                            </Form.Item>
    
                            <Form.Item
                            label="비밀번호"
                            name="password"
                            value="password"
                            rules={[
                                {
                                required: true,
                                message: '비밀번호를 입력해주세요!',
                                },
                            ]}
                            >
                        <Input.Password onChange={(e)=>{
                            console.log(e.target.value)
                        setPassword(e.target.value)
                    }}/>
                        </Form.Item>
                        <Button type="primary" size='large' htmlType="submit" style={{width: '90%'}} onClick={onSubmit}>가입하기</Button>
                        <Button style={{width: '90%'}} onClick={()=>{navigate('/users/login')}}>로그인</Button>
                    </Form>
                    
                    </Box>
                </Wrapper>
            </div>
        )
}


export default Signup