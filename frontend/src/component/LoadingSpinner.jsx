import React from 'react'
import styled from "styled-components";
import { keyframes } from 'styled-components';

const SpinnerAnimation = keyframes`
0% {
    transform: rotate(0deg);
}

100% {
    transform: rotate(360deg);
}
`;

const SpinnerContainer = styled.div`

`;

const LoadingSpin = styled.div`
  width: 50px;
  height: 50px;
  border: 10px solid #f3f3f3; /* Light grey */
  border-top: 10px solid #383636; /* Black */
  border-radius: 50%;
  animation-name: ${SpinnerAnimation};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

const LoadingSpinner = () => {
  return (
   <SpinnerContainer>
       <LoadingSpin></LoadingSpin>
   </SpinnerContainer>
  )
}

export default LoadingSpinner