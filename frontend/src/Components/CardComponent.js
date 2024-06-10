import React from "react";
import styled from "styled-components";

const CardCom = ({title, tag, userName, userImg, thumbnail}) =>{
    return(
        <CardComponent>
            <Img src={thumbnail}></Img>
            <Text>{title}</Text>
            <Tag>{tag}</Tag>
            <Wrapper>
                <User background={userImg}/>
                <userName>{userName}</userName>
            </Wrapper>
        </CardComponent>
    )
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content:start;
    align-items: center;
    margin: 10px;
    gap: 8px;

`

const CardComponent = styled.div`
    width: ${(props)=>props.width || `260px`} ;
    height: ${(props)=>props.height ||`300px`} ;
    border-radius:${(props)=>props.borderRadius|| '5px'};
    background: ${(props)=>props.background || 'white'};
    border: 1px solid #333;
    overflow: hidden;
`
const Text = styled.div`
    height: 40px;
    color: #202020;
    font-weight: bold;
    font-size: 1.1rem;
    margin: 10px;
`

const userName = styled(Text)`
    font-weight: .8rem;
    margin: 0px;
`

const Tag = styled.span`
    font-size:.8rem;
    background: blue;
    padding: 3px;
    border-radius: 2px;
    color: white;
    font-weight: bold;
    margin: 10px;
`

const User = styled.div`
    width: ${(props)=>props.width || `30px`} ;
    height: ${(props)=>props.height ||`30px`} ;
    border-radius:${(props)=>props.borderRadius|| '50%'};
    background: ${(props)=>props.background || 'white'};
    border: 1px solid #333;
`
const Img = styled.img`
    width: ${(props)=>props.width || `100%`} ;
    height: ${(props)=>props.height ||`160px`} ;
    background: ${(props)=>props.background || 'white'};
`
export default CardCom