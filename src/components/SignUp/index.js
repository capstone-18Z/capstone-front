import "./style.css";
import { TextField, Button, Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import axios from "axios";
import Login from "../Login";

function SignUp({goSignUp}) {
  const [open, setOpen] = useState(goSignUp);
  const [goBackLogin, setGoBackLogin] = useState(false);

  const handleBackLogin = () => {
    setOpen(false);
    setGoBackLogin(true);
  }
  const navigate = useNavigate();
  const [signUpInfo, setSignUpInfo] = useInput({
    email: "",
    nickname: "",
    password: "",
  });

  const onClick = async (e) => {
    console.log(signUpInfo);
    axios
      .post(`${process.env.REACT_APP_API_URL}/member/register`, signUpInfo)
      .then((response) => {
        if (response.data) {
          alert("회원가입 완료");
        }
      })
      .catch((err) => {
        console.log(err.response);
        alert("회원가입 오류");
      });
  };

  const checkOverlap = (value) => {
    //e.preventDefault();
    if (value === "email") {
      axios.get(`${process.env.REACT_APP_API_URL}/member/check_email/${signUpInfo.email}/exists`).then((response) => {
        console.log(response.data);
        if (response.data === true) {
          alert("이미 등록되어 있는 이메일입니다");
        } else {
          alert("사용할 수 있는 이메일입니다");
        }
      });
    } else if (value === "nickname") {
      axios.get(`${process.env.REACT_APP_API_URL}/member/check_nickname/${signUpInfo.nickname}/exists`).then((response) => {
        console.log(response.data);
        if (response.data === true) {
          alert("이미 등록되어 있는 닉네임입니다");
        } else {
          alert("사용할 수 있는 닉네임입니다");
        }
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleBackLogin}>
      <h1 className="signup-title">회원가입</h1>
      <form>
        <div className="signup-text">
          <TextField
            margin="normal"
            label="이메일"
            variant="outlined"
            value={signUpInfo.email}
            name="email"
            onChange={setSignUpInfo}
          />
          <Button
            onClick={(e) => {
              checkOverlap("email");
            }}
            sx={{
              padding: "15px",
              marginBlockStart: "18px",
            }}
          >
            중복확인
          </Button>
        </div>
        <div className="signup-text">
          <TextField
            margin="normal"
            label="닉네임"
            variant="outlined"
            value={signUpInfo.nickname}
            name="nickname"
            onChange={setSignUpInfo}
          />
          <Button
            onClick={(e) => {
              checkOverlap("nickname");
            }}
            sx={{
              padding: "15px",
              marginBlockStart: "18px",
            }}
          >
            중복확인
          </Button>
        </div>
        <div className="password-text">
          <TextField
            label="비밀번호"
            margin="normal"
            variant="outlined"
            type="password"
            value={signUpInfo.password}
            name="password"
            onChange={setSignUpInfo}
          />
        </div>
        <div className="signup-button">
          <Button variant="contained" onClick={onClick}>
            회원가입 완료
          </Button>
          <Button variant="text" onClick={handleBackLogin}>로그인</Button>
          <Login open={goBackLogin}/>
        </div>
      </form>
    </Dialog>
  );
}

export default SignUp;
