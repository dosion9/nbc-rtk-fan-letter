import React from "react";
import theme from "style/Theme";
import styled from "styled-components";

const StFooter = styled.footer`
  width: 100%;
  min-height: 8rem;
  background-color: ${theme.color.blue};
  color: ${theme.color.white};
  display: flex;
  align-items: center;
`;

const StContent = styled.div`
  width: 90%;
  max-width: 960px;
  margin: auto;
  text-align: center;
`;

function Footer() {
  return (
    <StFooter>
      <StContent>Footer</StContent>
    </StFooter>
  );
}

export default Footer;
