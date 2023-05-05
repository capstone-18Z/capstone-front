import "./style.css";
import { TextField, Button, Typography, Dialog, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import axios from "axios";
import { useState, useEffect } from "react";
import SignUp from "../SignUp";

function Login({ loginOpen }) {
  console.log(loginOpen);
  const [open, setOpen] = useState(loginOpen);
  const [goSignUp, setGoSignup] = useState(false);

  useEffect(() => {
    setOpen(loginOpen);
  }, [loginOpen]);

  const handleGoSignup = () => {
    setOpen(false);
    setGoSignup(true);
  };

  const handleClose = () => {
    setOpen(false);
    setGoSignup(false);
  };

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useInput({
    email: "",
    password: "",
  });

  const onSilentRefresh = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/refresh`, {
        refreshToken: localStorage.getItem("refresh-token"),
      })
      .then((response) => {
        console.log(response.data.refreshToken);
        localStorage.setItem("refresh-token", response.data.refreshToken);
        localStorage.setItem("login-token", response.data.accessToken);
        axios.defaults.headers.common["login-token"] = response.data.accessToken;
        axios.defaults.headers.common["refresh-token"] = response.data.refreshToken;
        setTimeout(onSilentRefresh, 1200000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClick = (e) => {
    console.log(userInfo);
    // 데이터 보내기
    axios
      .post(`${process.env.REACT_APP_API_URL}/member/login`, userInfo)
      .then((response) => {
        if (response.data) {
          console.log(response);
          // accesstoken header에 자동설정 -> post할때 header 구문 추가 안해도됨.
          axios.defaults.headers.common["login-token"] = response.data.data.token.accessToken;
          axios.defaults.headers.common["refresh-token"] = response.data.data.token.refreshToken;
          console.log(axios.defaults.headers.common);
          localStorage.setItem("refresh-token", response.data.data.token.refreshToken);
          localStorage.setItem("login-token", response.data.data.token.accessToken);
          localStorage.setItem("nickname", response.data.data.member.nickname);
          localStorage.setItem("email", response.data.data.member.email);
          setInterval(onSilentRefresh, 1200000); // 20분 후 refreshtoken 갱신
          navigate("/main");
        }
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data.message);
      });
  };

  return goSignUp ? (
    <SignUp goSignUp={goSignUp} />
  ) : (
    <Dialog open={open} onClose={handleClose}>
      <div className="login-box">
        <h1 className="login-title">로그인</h1>
        <form className="login-form-box">
          <div className="login-text">
            <TextField
              margin="normal"
              label="이메일"
              variant="outlined"
              value={userInfo.email}
              name="email"
              onChange={setUserInfo}
            />
          </div>
          <div className="login-text">
            <TextField
              margin="normal"
              label="비밀번호"
              type="password"
              variant="outlined"
              value={userInfo.password}
              name="password"
              onChange={setUserInfo}
            />
          </div>
          <div className="login-button">
            <Button variant="contained" onClick={onClick}>
              로그인
            </Button>
          </div>
          <div className="signup-button">
            <Button onClick={handleGoSignup}>회원가입</Button>
          </div>
        </form>
      </div>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Login;
