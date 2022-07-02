import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { useLocation } from "react-router";
import { Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import LoadingSpinner from '../component/LoadingSpinner';
import {mobile} from '../responsive';
import { toast } from 'react-toastify';
import Joi from 'joi-browser';

const apiUrl= process.env.REACT_APP_API_ENDPOINT + '/api';

const Container = styled.div`
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const Title = styled.h1`
font-size: 3rem;
color: black;
margin-right: 20px;
font-family: 'Bitter', serif;

${mobile({
  fontSize: "2rem"
})}
`;

const InputContainer = styled.div`
display: flex;
flex-direction: column;
margin: 20px 0px;
align-items: center;
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
margin: 15px 0px;
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

const CheckBox = styled(FormControlLabel)`
align-self: flex-start;

${mobile({
  transform: "scale(0.8)"
})}
`;

const LabelText = styled.p`
font-size: 22px;
font-weight: bold;
margin: 0;
cursor: default;
color: darkgreen;
`;

const ErrorText = styled.p`
color: red;
margin-top: 0;
`;

const TaskPage = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required().label("Task name"),
    desc: Joi.string().max(50).label("Task description"),
    isDone: Joi.boolean()
  });

  useEffect(() => {
    const getTask = async () => {
      try {
        const res = await axios.get(apiUrl + `/task/${path}`);
        setTitle(res.data.name);
        setDesc(res.data.desc);
        setIsDone(res.data.isDone);
      } catch (error) {
        window.location.replace("/not-found"); 
      }
    }
    getTask();
  }, [path])

  const handleCheck = () => {
    setIsDone(!isDone);
  }

  const handleEdit = async () => {
    setIsLoading(true);
    setError("");
    const { error: newError } = schema.validate({
      name: title,
      desc: desc
    });

    if (newError) {
      setError(newError.details[0].message);
      setIsLoading(false);
      return;
    }

    try {
      const editedTask = {
        name: title,
        desc: desc,
        isDone: isDone
      };

      await axios.put(apiUrl + `/task/${path}`, editedTask)
      setIsLoading(false);
      toast.success("Task Added Successfully");
      window.location.replace("/");
    } catch (error) {
      setError(error.response.data);
      toast.error(error.response.data);
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Title>Task Editor</Title>
      <InputContainer>
        <TitleInput onChange={(e) => setTitle(e.target.value)} placeholder={title}></TitleInput>
        <DescText onChange={(e) => setDesc(e.target.value)} placeholder={desc}></DescText>
        {error && <ErrorText>{error}</ErrorText>}
        <CheckBox
          checked={isDone}
          onClick={handleCheck}
          color='teal'
          sx={{ '& .MuiSvgIcon-root': { fontSize: 28, color: 'teal' } }}
          control={<Checkbox />}
          label={<LabelText>Done</LabelText>}
        />
        {isLoading ? <LoadingSpinner/> : <Button onClick={handleEdit}>Edit Task</Button>}
      </InputContainer>
    </Container>
  )
}

export default TaskPage