import { Routes, Route } from "react-router-dom";
import Team from "../components/Teams/team";
import Members from "../components/Members/index";
import TeamDetail from "../components/TeamDetail/teamDetail";
import MyPage from "../components/MyPage/mypage";

function ListPage() {
  return (
  <div>
    <Routes>
      <Route path="team" element={<Team />}></Route>
      <Route path="team/:teamId/" element={<><TeamDetail /></>}></Route>  
      <Route path="members" element={<Members></Members>}/>        
    </Routes>
  </div>
  )
}

export default ListPage