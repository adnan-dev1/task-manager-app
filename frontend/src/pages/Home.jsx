import React from 'react'
import TaskManager from '../component/TaskManager'
import styled from "styled-components";

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const Home = () => {
  return (
      <Container>
        <TaskManager/>
      </Container>
  )
}

export default Home