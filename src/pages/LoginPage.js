import Login from "../components/Login/index";
import SignUp from "../components/SignUp/index";
import { Routes, Route } from "react-router-dom";

function LoginPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default LoginPage;
