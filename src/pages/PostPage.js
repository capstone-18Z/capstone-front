import { Routes, Route, useNavigate } from "react-router-dom";
import TeamBuilding from "../components/TeamBuilding";
import UserBuilding from "../components/UserBuilding";
import UserBuilding2 from "../components/UserBuilding2";
import { FormControlLabel, FormGroup, Checkbox } from "@mui/material";

function PostPage() {
  return (
    <div>
      <Routes>
        <Route path="team" element={<TeamBuilding />}></Route>
        <Route path="user" element={<UserBuilding />}></Route>
        <Route path="usertest" element={<UserBuilding2 />}></Route>
      </Routes>
    </div>
  );
}

export default PostPage;
