import React from "react";
import theme from "style/Theme";
import styled from "styled-components";

const StContainer = styled.section`
  background-color: ${theme.color.white};
`;

const StTitle = styled.h1`
  font-size: ${theme.fontSize.xl};
  margin-bottom: ${theme.spacing.xl};
  font-weight: bold;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-left: 0.5rem solid ${theme.color.base};
`;

const StWrap = styled.div`
  border: 10px double ${theme.color.base};
  border-radius: ${theme.border.borderRadius};
  padding: ${theme.spacing.base};
  overflow: hidden;
`;

function Container({ children, title }) {
  return (
    <StContainer>
      {title && <StTitle>{title}</StTitle>}

      <StWrap> {children}</StWrap>
    </StContainer>
  );
}

export default Container;
