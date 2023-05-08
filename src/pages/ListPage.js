import { Routes, Route } from "react-router-dom";
import Team from "../components/Teams/team";
import Members from "../components/Members/index";
import TeamDetail from "../components/TeamDetail/teamDetail";
import Contest from "../components/Contest/contest";
import FreePosts from "../components/FreePosts/index";

function ListPage() {
  return (
  <div>
    <Routes>
      <Route path="team" element={<Team />}></Route>
      <Route path="team/:teamId/" element={<><TeamDetail /></>}></Route>  
      <Route path="members" element={<Members></Members>}/>        
      <Route path="contest" element={<Contest></Contest>}/>
      <Route path="freepost" element={<FreePosts></FreePosts>}></Route>
    </Routes>
  </div>
  )
}

export default ListPage