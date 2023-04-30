import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import "./App.css";
import { CssBaseline, Button } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "'Noto Sans KR', sans-serif",
  },
  components: {
    styleOverrides: {
      root: {
        fontFamily: "'Noto Sans KR', sans-serif",
      },
    },
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  // </React.StrictMode>
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <Button variant="contained" color="primary">
        버튼
      </Button>
      <App />
    </CssBaseline>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
