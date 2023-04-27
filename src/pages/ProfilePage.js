import { Routes, Route } from "react-router-dom";
import { CircularProgress, Alert } from "@mui/material";
import EditProfile from "../components/EditProfile/index";
import Profile from "../components/Profile";
import useApiCall from "../hooks/useApiCall";

function ProfilePage() {
  const [loading,testData, error] = useApiCall(
    `${process.env.REACT_APP_API_URL}/member/userForm`
  )
  console.log(testData);
  if (!testData) {
    console.log(testData);
    return <><Alert severity="error">정보를 불러오는데 실패했습니다.</Alert></>
  }

  if (loading) {
    return <><CircularProgress color="inherit" /></>
  }

  if (error) {
    return <><Alert severity="error">{error}</Alert></>
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<Profile/>} />
        <Route path="edit" element={<EditProfile fetchData={testData}/>} />
      </Routes>
    </div>
  );
}

export default ProfilePage;
