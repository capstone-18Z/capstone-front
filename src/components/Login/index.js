import "./style.css";
import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useInput({
    email: "",
    password: "",
  });

  const onSilentRefresh = () => {
    axios
      .post(`https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/refresh`, {
        refreshToken: localStorage.getItem("refresh-token"),
      })
      .then((response) => {
        console.log(response.data.refreshToken);
        localStorage.setItem("refresh-token", response.data.refreshToken);
        axios.defaults.headers.common["login-token"] = response.data.accessToken;
        setTimeout(onSilentRefresh, 12000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClick = (e) => {
    console.log(userInfo);
    // 데이터 보내기
    axios
      .post("https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/member/login", userInfo)
      .then((response) => {
        if (response.data) {
          console.log(response);
          // accesstoken header에 자동설정 -> post할때 header 구문 추가 안해도됨.
          axios.defaults.headers.common["login-token"] = response.data.data.token.accessToken;
          //console.log(axios.defaults.headers.common);
          localStorage.setItem("refresh-token", response.data.data.token.refreshToken);
          setInterval(onSilentRefresh, 1200000); // 20분 후 refreshtoken 갱신
          navigate("/main");
        }
      })
      .catch((err) => {
        console.log(err.response);
        alert("등록되지 않은 회원입니다.");
      });
  };

  return (
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
          <Button
            onClick={(e) => {
              navigate("/signup");
            }}
          >
            회원가입
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
