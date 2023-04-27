import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header/header"
import MyPage from "./components/MyPage/mypage";
import ProfilePage from "./pages/ProfilePage";
import ListPage from "./pages/ListPage";


function App() {
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
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<><Header /><LoginPage /></>}></Route>
          <Route path="/main" element={<><Header /><MainPage /></>}></Route>
          <Route path="/mypage/*" element={<><Header/><MyPage /></>}></Route>
          <Route path="/profile/*" element={<><Header/><ProfilePage/></>}></Route>
          {}
          <Route path="/list/*" element={<><Header/><ListPage/></>}></Route>
          <Route path="/post/*" element={<><Header/><PostPage /></>}></Route>          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
