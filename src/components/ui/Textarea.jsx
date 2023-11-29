import React, { useMemo } from "react";
import theme from "style/Theme";
import styled from "styled-components";
import Label from "components/ui/Label";
import { v4 as uuidv4 } from "uuid";

const StWrap = styled.div`
  display: flex;
  align-items: start;
  width: 100%;
`;

const StTextarea = styled.textarea.attrs(() => ({
  spellCheck: "false",
  autoComplete: "off",
  rows: 6
}))`
  width: 100%;
  border: ${(props) => theme.border[props.color] || theme.border.black};
  border-radius: ${theme.border.borderRadius};
  padding: ${theme.spacing.sm};
  resize: none;
  outline: none;
`;

function Textarea({ placeholder, color, value, maxLength, labelText, readOnly, onChange }) {
  const id = useMemo(() => uuidv4(), []);

  return (
    <StWrap>
      {labelText ? <Label htmlFor={id}>{labelText}</Label> : null}
      <StTextarea
        placeholder={placeholder}
        color={color}
        value={value}
        maxLength={maxLength}
        readOnly={readOnly || false}
        onChange={onChange}
        id={id}
      />
    </StWrap>
  );
}

export default Textarea;
