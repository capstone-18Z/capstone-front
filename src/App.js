import { BrowserRouter, Routes, Route,useParams } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header/header"
import TeamDetail from "./components/TeamDetail/teamDetail";
import RecommendUserList from "./components/RecommendUserList/recommendUserList";
import Team from "./components/Teams/team";
import EditTeam from "./components/EditTeam/editTeam";

function App() {
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
