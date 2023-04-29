import { Routes, Route } from "react-router-dom";
import { Alert, CircularProgress } from "@mui/material";
import {useReducer} from "react";
import EditProfile from "../components/EditProfile/index";
import Profile from "../components/Profile";
import useApiCall from "../hooks/useApiCall";


function ProfilePage() {
  const [loading, payload, error, fetchData] = useApiCall(
    `${process.env.REACT_APP_API_URL}/member/userForm`
  );

  if (!payload) {
    return <></>;
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
        <Route path="/" element={<Profile fetchData={fetchData} payload={payload}/>} />
        <Route path="edit" element={<EditProfile fetchData={fetchData} payload={payload}/>} />
      </Routes>
    </div>
  );
}

export default ProfilePage;
