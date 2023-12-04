import Router from "./routers/Router";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "style/GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from "style/Theme";
import Modal from "components/ui/Modal";
import Spinner from "components/ui/Spinner";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Modal />
          <Spinner />
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
