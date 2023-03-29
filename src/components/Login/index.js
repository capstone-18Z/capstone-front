import "./style.css";
import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
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

  const onSilentRefresh = () => {
    axios
      .post(`https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/refresh`, {
        refreshToken: localStorage.getItem("refresh-token"),
      })
      .then((response) => {
        console.log(response.data.refreshToken);
        localStorage.setItem("refresh-token", response.data.refreshToken);
        axios.defaults.headers.common["login-token"] = response.data.accessToken;
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
      .post("https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/member/login", userInfo)
      .then((response) => {
        if (response.data) {
          console.log(response);
          // accesstoken header에 자동설정 -> post할때 header 구문 추가 안해도됨.
          axios.defaults.headers.common["login-token"] = response.data.data.token.accessToken;
          //axios.defaults.headers.common["refresh-token"] = response.data.data.token.refreshToken; // 나중에 지워야할 구문
          console.log(axios.defaults.headers.common);
          // refreshtoken은 localstorage나 cookie에 저장해서 jwt 만료시간에 맞춰서 자동 갱신하게
          localStorage.setItem("refresh-token", response.data.data.token.refreshToken);
          setInterval(onSilentRefresh, 1200000);
          navigate("/main");
        }
      })
      .catch((err) => {
        console.log(err.response);
        alert("없습니다 회원가입부터 하세요");
      });
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
