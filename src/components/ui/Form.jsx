import React from "react";
import theme from "style/Theme";
import styled from "styled-components";

const StForm = styled.form.attrs(() => ({
  autoComplete: "off"
}))`
  display: grid;
  gap: ${theme.spacing.base};
`;

function Form({ children, onSubmit, color }) {
  return (
    <StForm color={color} onSubmit={onSubmit}>
      {children}
    </StForm>
  );
}

export default Form;
