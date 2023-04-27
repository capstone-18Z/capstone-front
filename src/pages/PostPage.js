import { Routes, Route } from "react-router-dom";
import TeamBuilding from "../components/TeamBuilding";
import EditTeam from "../components/EditTeam/editTeam";

function PostPage() {
  return (
    <div>
      <Routes>
        <Route path="team" element={<TeamBuilding />}></Route>
        <Route path="team/:teamId/editTeam" element={<><EditTeam /></>}></Route>
        {/* <Route path="member/:postId" element={<>}></Route> */}
      </Routes>
    </div>
  );
}

export default PostPage;
