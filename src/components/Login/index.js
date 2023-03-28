import "./style.css";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userInfo; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setUserInfo({
      ...userInfo, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const onClick = (e) => {
    console.log(userInfo);
    // 데이터 보내기
    axios
      .post("https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/member/login", userInfo)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          const { accessToken } = response.data.data.token.accessToken;
          localStorage.setItem("refreshToken", response.data.data.token.refreshToken);
          navigate("/main");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("없습니다 회원가입부터 하세요");
      });
    //navigate("/main");
  };

  const goToSignUp = (e) => {
    navigate("/signup");
  };

  return (
    <div className="login-box">
      <h1 className="login-title">로그인</h1>
      <form className="login-form-box">
        <div className="login-text">
          <TextField margin="normal" label="이메일" variant="outlined" value={email} name="email" onChange={onChange} />
        </div>
        <div className="login-text">
          <TextField
            margin="normal"
            label="비밀번호"
            variant="outlined"
            value={password}
            name="password"
            onChange={onChange}
          />
        </div>
        <div className="login-button">
          <Button variant="contained" onClick={onClick}>
            로그인
          </Button>
        </div>
        <div className="signup-button">
          <Button onClick={goToSignUp}>회원가입</Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
