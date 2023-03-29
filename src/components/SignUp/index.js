import "./style.css";
import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [signUpInfo, setSignUpInfo] = useInput({
    email: "",
    nickname: "",
    password: "",
  });

  const onClick = async (e) => {
    console.log(signUpInfo);
    axios
      .post("https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/member/register", signUpInfo)
      .then((response) => {
        if (response.data) {
          alert("회원가입 완료");
          navigate("/");
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
      axios
        .get(
          `https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/member/check_email/${signUpInfo.email}/exists`
        )
        .then((response) => {
          console.log(response.data);
          if (response.data === true) {
            alert("이미 등록되어 있는 이메일입니다");
          } else {
            alert("사용할 수 있는 이메일입니다");
          }
        });
    } else if (value === "nickname") {
      axios
        .get(
          `https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/member/check_nickname/${signUpInfo.nickname}/exists`
        )
        .then((response) => {
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
    <div className="signup-box">
      <h1 className="signup-title">회원가입</h1>
      <form>
        <div className="signup-text">
          <TextField margin="normal" label="이메일" variant="outlined" value={signUpInfo.email} name="email" onChange={setSignUpInfo} />
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
            value={signUpInfo.password}
            name="password"
            onChange={setSignUpInfo}
          />
        </div>
        <div className="signup-button">
          <Button variant="contained" onClick={onClick}>
            회원가입 완료
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
