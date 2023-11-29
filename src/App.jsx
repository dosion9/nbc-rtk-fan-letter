import Router from "./shared/Router";
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
        <Modal modalState={modalState} setModalState={setModalState} />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
