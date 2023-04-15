import { Routes, Route } from "react-router-dom";
import EditProfile from "../components/EditProfile/index";

function ProfilePage() {
  return (
    <div>
      <Routes>
        <Route path="edit" element={<EditProfile />} />
      </Routes>
    </div>
  );
}

export default ProfilePage;
