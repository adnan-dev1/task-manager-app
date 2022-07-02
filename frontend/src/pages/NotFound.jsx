import React from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import notFoundImage from "../images/NotFound.png";
import { mobile } from '../responsive';

const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const Image = styled.img`
margin-bottom: 30px;
${mobile({
  width: "85%"
})}
`;

const LinkNew = styled(Link)`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
`;


const Button = styled.button`
border: none;
font-size: 23px;
padding: 10px;
width: 30%;
border-radius: 20px;
margin-bottom: 15px;
background-color: gray;
color: white;
cursor: pointer;
transition: all 0.4s ease;
&:hover{
background-color: black;
font-weight: bold;
}

${mobile({
  fontSize: "1rem",
  width: "70%"
})}
`;

const NotFound = () => {
  return (
    <Container>
      <Image src={notFoundImage} alt='Failed To Load Image' />
      <LinkNew to={'/'}>
        <Button>Go Back To Home</Button>
      </LinkNew>
    </Container>
  )
}

export default NotFound