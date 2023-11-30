import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import theme from "style/Theme";
import Label from "components/ui/Label";
import { v4 as uuidv4 } from "uuid";

const StWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  & .red {
    background-color: red;
  }
`;

const StInput = styled.input`
  padding: 0.5rem;
  outline: none;
  border: ${({ theme, $validationColor }) => theme.border[$validationColor]};
  border-radius: ${theme.border.borderRadius};
  width: 100%;
  transition: ${({ theme }) => theme.transition.base};
`;

const StValidationText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme, $validationColor }) => theme.color[$validationColor]};
  min-height: 12px;
  margin-left: 12px;
`;

function Input({ type, placeholder, value, onChange, labelText, maxLength, className, validation }) {
  const { value: validationValue, text: validationText } = validation || {};
  let [validationColor, setValidationColor] = useState("blue");

  useEffect(() => {
    switch (validationValue) {
      case false:
        return setValidationColor("waring");
      case true:
        return setValidationColor("green");
      default:
        return setValidationColor("blue");
    }
  }, [validationValue]);

  const id = useMemo(() => uuidv4(), []);
  return (
    <StWrap className={className}>
      {labelText && <Label htmlFor={id}>{labelText}</Label>}
      <StInput
        type={type || "text"}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        id={id}
        maxLength={maxLength}
        $validationColor={validationColor}
      />
      {validation && <StValidationText $validationColor={validationColor}>{validationText}</StValidationText>}
    </StWrap>
  );
}

export default Input;
