import { Routes, Route } from "react-router-dom";
import Team from "../components/Teams/team";
import TeamDetail from "../components/TeamDetail/teamDetail";
import MyPage from "../components/MyPage/mypage";


function ListPage() {
  return (
  <div>
    <Routes>
      <Route path="team" element={<Team />}></Route>
      <Route path="team/:teamId/" element={<><TeamDetail /></>}></Route>  
      <Route path="members" element={<></>}/>        
    </Routes>
  </div>
  )
}

export default ListPage