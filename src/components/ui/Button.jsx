import React from "react";
import styled from "styled-components";
import theme from "style/Theme";

const StButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.xl};
  font-weight: bold;
  background-color: ${(props) => (props.$active ? theme.color[props.color] : theme.color.white)};
  border: ${(props) => theme.border[props.color] || theme.border.waring};
  color: ${(props) => (props.$active ? theme.color.white : theme.color[props.color])};
  border-radius: ${theme.border.borderRadius};
  cursor: pointer;
  transition: ${theme.transition.base};
  font-size: ${(props) => (props.size ? theme.fontSize[props.size] : null)};

  &:hover {
    color: ${theme.color.white};
    background-color: ${(props) => theme.color[props.color]};
  }
`;

function Button({ children, color, size, active, onClick }) {
  return (
    <StButton color={color} size={size} $active={active} onClick={onClick}>
      {children}
    </StButton>
  );
}

export default Button;
