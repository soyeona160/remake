import React from "react";
import styled from 'styled-components'



const Buttons = ({ children, width, height, backgroundColor, color, borderRadius, fontSize }) =>{
    return(
        <ButtonStyle
            width={width}
            height={height}
            backgroundColor={backgroundColor}
            color={color}
            borderRadius={borderRadius}
            fontSize={fontSize}
        >{children}</ButtonStyle>
    )
}

const ButtonStyle = styled.button`
    width: ${(props)=>props.width || `300px`} ;
    height: ${(props)=>props.height ||`30px`} ;
    text-align: center;
    background-color: ${(props)=>props.backgroundColor|| 'cornflowerblue'} ;
    color: ${(props)=>props.color||'white'};
    border-radius:${(props)=>props.borderRadius|| '5px'};
    font-size: ${(props)=>props.fontSize|| '1rem'};
    border : none;
    cursor: pointer;
`

export default Buttons