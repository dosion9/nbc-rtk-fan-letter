import React from "react";
import styled from "styled-components";
import theme from "style/Theme";

const StButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.xl};
  font-weight: bold;
  background-color: ${({ theme, color, $active, disabled }) => {
    if (disabled) {
      return theme.color.disabled;
    } else {
      return $active ? theme.color[color] : theme.color.white;
    }
  }};
  border: ${({ theme, color, disabled }) => {
    if (disabled) {
      return theme.border.disabled;
    } else {
      return theme.border[color] || theme.border.warning;
    }
  }};
  color: ${({ theme, $active, disabled, color }) => {
    if ($active || disabled) {
      return theme.color.white;
    } else {
      return theme.color[color];
    }
  }};
  border-radius: ${theme.border.borderRadius};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: ${theme.transition.base};
  font-size: ${(props) => (props.size ? theme.fontSize[props.size] : null)};

  &:hover {
    color: ${theme.color.white};
    background-color: ${({ theme, disabled, color }) => {
      if (!disabled) {
        return theme.color[color];
      }
    }};
  }
`;

function Button({ children, color, size, active, disabled, onClick, className }) {
  return (
    <StButton className={className} color={color} size={size} $active={active} disabled={disabled} onClick={onClick}>
      {children}
    </StButton>
  );
}

export default Button;
