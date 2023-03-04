import { Routes, Route, useNavigate } from "react-router-dom";
import TeamBuilding from "../components/TeamBuilding";
import UserBuilding from "../components/UserBuilding";
import { FormControlLabel, FormGroup, Checkbox } from "@mui/material";

function PostPage() {
  return (
    <div>
      <Routes>
        <Route path="team" element={<TeamBuilding />}></Route>
        <Route path="user" element={<UserBuilding />}></Route>
       
      </Routes>
    </div>
  );
}

export default PostPage;
