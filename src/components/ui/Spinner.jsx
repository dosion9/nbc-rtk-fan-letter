import React from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";

function Spinner() {
  const authSliceIsLoaing = useSelector((state) => state.authSlice.isLoading);
  const letterSliceIsLoaing = useSelector((state) => state.letterSlice.isLoading);

  return (authSliceIsLoaing || letterSliceIsLoaing) && <StSpinner />;
}

const StRotation = keyframes`
  0% {
    transform:  translate(-50%, -50%) rotate(0deg);
}
100% {
    transform:  translate(-50%, -50%) rotate(360deg);
}  
`;

const StSpinner = styled.span`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 10rem;
  height: 10rem;
  border: 10px solid ${({ theme }) => theme.color.baseDark};
  border-bottom-color: ${({ theme }) => theme.color.base};
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${StRotation} 1s linear infinite;
  z-index: 100;
`;

export default Spinner;
