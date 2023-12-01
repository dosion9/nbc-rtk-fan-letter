import Router from "./routers/Router";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import GlobalStyle from "style/GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from "style/Theme";
import Modal from "components/ui/Modal";

function App() {
  const [modalState, setModalState] = useState({
    type: "default",
    active: false,
    content: null,
    onSummit: null
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Modal modalState={modalState} setModalState={setModalState} />
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
