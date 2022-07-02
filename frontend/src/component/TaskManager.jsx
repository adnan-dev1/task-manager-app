import { AssignmentOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import axios from 'axios';
import { mobile } from '../responsive';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Joi from 'joi-browser';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';

const apiUrl= process.env.REACT_APP_API_ENDPOINT + '/api';

const TitleContainer = styled.div`
display: flex;
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

const AssignmentIcon = styled(AssignmentOutlined)`
&& {
  font-size: 3rem;
  ${mobile({
  fontSize: "2rem"
})}
}
`;

const NotFoundTasks = styled.h4`
font-size: 25px;
color: gray;
${mobile({
  fontSize: "1.2rem"
})}
`;

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchTasks = async () => {
    const res = await axios.get(apiUrl + '/task');
    setTasks(res.data);
  };

  useEffect(() => {  
    fetchTasks();
  }, []);

  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required().label("Task name"),
    desc: Joi.string().max(50).label("Task description"),
    isDone: Joi.boolean()
  });

  const handleSubmit = async () => {
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

    const newTask = {
      name: title,
      desc: desc
    };

    try {
      const res = await axios.post(apiUrl + '/task', newTask);
      const newTasks = tasks;
      newTasks.push(res.data);
      setTasks(newTasks);
      toast.success("Task Added Successfully");
    } catch (error) {
      toast.error(error.response.data);
      setError(error.response.data);
    }
    setIsLoading(false);
  }

  const handleDelete = async (id)=> {
    try {
      const res = await axios.delete(apiUrl + `/task/${id}`);
      const newTasks = tasks.filter((task) => task._id !== res.data._id);
      setTasks(newTasks);
      toast.info("Task Deleted Successfully");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleChangeTitle = (e)=> {
    setTitle(e.target.value);
  };

  const handleChangeDesc = (e)=> {
    setDesc(e.target.value);
  };

  return (
    <>
      <TitleContainer >
        <Title>Task Manager</Title>
        <AssignmentIcon />
      </TitleContainer>

      <AddTaskForm error={error} isLoading={isLoading} handleChangeDesc={handleChangeDesc} handleChangeTitle={handleChangeTitle} handleSubmit={handleSubmit}/>

      <Title>Your To Do List ....</Title>

      {tasks.length !== 0 ? tasks.map((task) => {
        return (
          <TaskList key={task._id} handleDelete={handleDelete} task={task}/>
        )
      }) : <NotFoundTasks>No Tasks Available.</NotFoundTasks>}
    </>
  )
}

export default TaskManager