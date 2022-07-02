import React from 'react'
import { mobile } from '../responsive';
import styled from "styled-components";
import LoadingSpinner from './LoadingSpinner';


const InputContainer = styled.div`
display: flex;
flex-direction: column;
margin: 20px 0px;
align-items: center;
justify-content: center;
${mobile({
  width: "75%"
})}
`;

const TitleInput = styled.input`
border: 2px solid teal;
border-radius: 10px;
width: 100%;
padding: 10px 0px 10px 20px;
font-size: 30px;
margin-bottom: 20px;

${mobile({
  fontSize: "1rem"
})}
`;

const DescText = styled.textarea`
border: 2px solid teal;
width: 100%;
height: 10vh;
border-radius: 10px;
padding: 10px;
font-size: 20px;
margin-bottom: 20px;
resize: none;

${mobile({
  fontSize: "1rem"
})}
`;

const Button = styled.button`
border: none;
font-size: 23px;
padding: 10px;
width: 50%;
border-radius: 20px;
margin-bottom: 10px;
background-color: teal;
color: white;
cursor: pointer;
transition: all 0.4s ease;
&:hover{
    background-color: #008050;
    font-weight: bold;
}

${mobile({
  fontSize: "1rem"
})}
`;

const ErrorText = styled.p`
color: red;
margin-top: 0;
${mobile({
  fontSize: "0.7rem"
})}
`;

const AddTaskForm = ({handleSubmit, handleChangeTitle, handleChangeDesc, error, isLoading}) => {

  return (
    <InputContainer>
        <TitleInput onChange={(e) => handleChangeTitle(e)} type="text" placeholder='Task Name ...'></TitleInput>
        <DescText onChange={(e) => handleChangeDesc(e)} placeholder='Task Description ...'></DescText>
        {error && <ErrorText>{error}</ErrorText>}
        {isLoading ? <LoadingSpinner /> : <Button onClick={handleSubmit}>Add Task</Button>}
      </InputContainer>
  )
}

export default AddTaskForm