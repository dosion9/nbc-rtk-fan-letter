import React from "react";
import styled from "styled-components";

const StForm = styled.form.attrs(() => ({
  autoComplete: "off"
}))`
  display: grid;
  gap: ${({ theme, $gap }) => ($gap ? theme.spacing[$gap] : theme.spacing.base)};
`;

function Form({ children, onSubmit, gap }) {
  return (
    <StForm onSubmit={onSubmit} $gap={gap}>
      {children}
    </StForm>
  );
}

export default Form;
