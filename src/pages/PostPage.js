import { Routes, Route } from "react-router-dom";
import TeamBuilding from "../components/TeamBuilding";

function PostPage() {
  return (
    <div>
      <Routes>
        <Route path="team" element={<TeamBuilding />}></Route>
        {/* <Route path="member/:postId" element={<>}></Route> */}
      </Routes>
    </div>
  );
}

export default PostPage;
