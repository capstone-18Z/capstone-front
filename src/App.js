import { BrowserRouter, Routes, Route,useParams } from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header/header"
import TeamDetail from "./components/TeamDetail/teamDetail";
import RecommendUserList from "./components/RecommendUserList/recommendUserList";
import Team from "./components/Teams/team";
import EditTeam from "./components/EditTeam/editTeam";

function App() {
  const onSilentRefresh = () => {
    axios
      .post(`https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/refresh`, {
        refreshToken: localStorage.getItem("refresh-token"),
      })
      .then((response) => {
        console.log(response.data.refreshToken);
        localStorage.setItem("refresh-token", response.data.refreshToken);
        axios.defaults.headers.common["login-token"] = response.data.accessToken;
        setTimeout(onSilentRefresh, 1200000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    onSilentRefresh();
  }, [localStorage.getItem("refresh-token")]);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<LoginPage />}></Route>
          <Route path="/main" element={<><Header /><MainPage /></>}></Route>
          {/* 중첩라우팅 */}
          <Route path="/team" element={<><Header/><Team /></>}></Route>
          <Route path="/post/*" element={<><Header/><PostPage /></>}></Route>
          <Route path="/team/:teamId/" element={<><Header/><TeamDetail /></>}></Route>
          <Route path="/team/:teamId/editTeam" element={<><Header/><EditTeam /></>}></Route>
          <Route path="recommendUserList" element={<RecommendUserList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
