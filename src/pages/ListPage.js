import { Routes, Route } from "react-router-dom";
import Team from "../components/Teams/team";
import TeamDetail from "../components/TeamDetail/teamDetail";


function ListPage() {
  <div>
    <Routes>
      <Route path="members" element={<></>}/>
      <Route path="team" element={<Team />}></Route>
      <Route path="team/:teamId/" element={<><TeamDetail /></>}></Route>    
    </Routes>
  </div>
}

export default ListPage