import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import Main from "./Main/main"
import PostPage from "./pages/PostPage";
import Header from "./components/Header/header"
import MyPage from "./components/MyPage/mypage";
import ProfilePage from "./pages/ProfilePage";
import ListPage from "./pages/ListPage";
import "./App.css";
import { createTheme, ThemeProvider } from '@mui/material';
import ToTheTop from "./components/TotheTop/tothetop";

const theme = createTheme({
  typography: {
    fontFamily: [
      'Noto Sans KR',
      'sans-serif',
    ].join(','),
  },});

function App() {
  // 새로고침을 하면 axios.defaults.headers가 날아가는거 방지용
  axios.defaults.headers.common["login-token"] = localStorage.getItem("login-token");
  axios.defaults.headers.common["refresh-token"] = localStorage.getItem("refresh-token");

  const refresh = localStorage.getItem("refresh-token");
  useEffect(() => {
    const onSilentRefresh = () => {
      axios
        .post(`${process.env.REACT_APP_API_URL}/refresh`, {
          refreshToken: localStorage.getItem("refresh-token"),
        })
        .then((response) => {
          console.log(response.data.refreshToken);
          localStorage.setItem("refresh-token", response.data.refreshToken);
          axios.defaults.headers.common["login-token"] = response.data.accessToken;
          axios.defaults.headers.common["refresh-token"] = response.data.refreshToken;
          setTimeout(onSilentRefresh, 1200000);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (refresh !== null) {
      onSilentRefresh();
    }
  }, [refresh]);
  
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Header /><Main /></>}></Route>
          <Route path="/mypage/*" element={<><Header/><MyPage /></>}></Route>
          <Route path="/profile/*" element={<><Header/><ProfilePage/></>}></Route>
          <Route path="/list/*" element={<><Header/><ListPage/></>}></Route>
          <Route path="/post/*" element={<><Header/><PostPage /></>}></Route>          
        </Routes>
      </BrowserRouter>
      <ToTheTop/>
    </div>
    </ThemeProvider>
  );
}

export default App;
