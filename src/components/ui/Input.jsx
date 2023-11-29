import React, { useMemo } from "react";
import styled from "styled-components";
import theme from "style/Theme";
import Label from "components/ui/Label";
import { v4 as uuidv4 } from "uuid";

const StWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const StInput = styled.input`
  padding: 0.5rem;
  outline: none;
  border: ${(props) => theme.border[props.color] || theme.border.black};
  border-radius: ${theme.border.borderRadius};
  width: 100%;
`;

function Input({ type, placeholder, value, onChange, color, labelText, maxLength }) {
  const id = useMemo(() => uuidv4(), []);
  return (
    <StWrap>
      {labelText ? <Label htmlFor={id}>{labelText}</Label> : null}
      <StInput
        type={type || "text"}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        color={color}
        id={id}
        maxLength={maxLength}
      />
    </StWrap>
  );
}

export default Input;
