import React from "react";
import Header from "components/layout/Header";
import Footer from "components/layout/Footer";
import theme from "style/Theme";
import styled from "styled-components";

const StMain = styled.main`
  width: 100%;
  max-width: 960px;
  min-height: 100vh;
  margin: auto;
  background-color: ${theme.color.white};
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

function Layout({ children }) {
  return (
    <>
      <Header />
      <StMain>{children}</StMain>
      <Footer />
    </>
  );
}

export default Layout;
