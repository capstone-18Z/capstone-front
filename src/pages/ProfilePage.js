import { Routes, Route } from "react-router-dom";
import EditProfile from "../components/EditProfile/index";
import Profile from "../components/Profile";

function ProfilePage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Profile/>} />
        <Route path="edit" element={<EditProfile />} />
      </Routes>
    </div>
  );
}

export default ProfilePage;
