import { Routes, Route } from "react-router-dom";
import TeamBuilding from "../components/TeamBuilding";
import UserBuilding from "../components/UserBuilding";
import EditUser from "../components/EditUser";
import UserDetail from "../components/UserDetail";

function PostPage() {
  return (
    <div>
      <Routes>
        <Route path="team" element={<TeamBuilding />}></Route>
        <Route path="user" element={<UserBuilding />}></Route>
        <Route path="user/:postId" element={<UserDetail />}></Route>
        <Route path="user/update/:postId" element={<EditUser/>}></Route>
      </Routes>
    </div>
  );
}

export default PostPage;
