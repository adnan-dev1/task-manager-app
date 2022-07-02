import React from 'react'
import { Delete, Edit } from '@mui/icons-material';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { mobile } from '../responsive';

const List = styled.div`
border: 2px solid teal;
width: 30%;
height: 5vh;
margin-bottom: 20px;
display: flex;
align-items: center;
justify-content: center;
font-size: 20px;
padding: 0px 10px;
border-radius: 20px;

${mobile({
    width: "70%"
})}
`;

const ListTitle = styled.h4`
flex: 1;
font-weight: bold;
color: black;
font-family: 'Dancing Script', cursive;
text-decoration: ${(props) => props.isDone ? "line-through" : "none"};
text-decoration-thickness: 13%;
`;

const TaskList = ({ task, handleDelete }) => {
    return (
        <>
            <List key={task._id}>
                <ListTitle isDone={task.isDone}>{task.name}</ListTitle>

                <Link to={`/task/${task._id}`} >
                    <Edit style={{ color: "green", cursor: "pointer" }} />
                </Link>

                <Delete onClick={() => handleDelete(task._id)} style={{ color: "tomato", cursor: "pointer" }} />
            </List>
        </>
    )
}

export default TaskList