import { Routes, Route } from "react-router-dom";
import TeamBuilding from "../components/TeamBuilding";
import UserDetail from "../components/UserDetail";

function PostPage() {
  return (
    <div>
      <Routes>
        <Route path="team" element={<TeamBuilding />}></Route>
        <Route path="member/:postId" element={<UserDetail />}></Route>
      </Routes>
    </div>
  );
}

export default PostPage;
