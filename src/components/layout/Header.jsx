import React from "react";
import theme from "style/Theme";
import styled from "styled-components";

const StHeader = styled.header`
  width: 100%;
  height: 5rem;
  background-color: ${theme.color.blue};
  color: ${theme.color.white};
  display: flex;
  align-items: center;
`;

const StContent = styled.div`
  width: 90%;
  max-width: 960px;
  margin: auto;
`;

function Header() {
  return (
    <StHeader>
      <StContent>Header</StContent>
    </StHeader>
  );
}

export default Header;
