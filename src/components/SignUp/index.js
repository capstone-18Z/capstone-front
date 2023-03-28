import "./style.css";
import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [signUpInfo, setsignUpInfo] = useState({
    email: "",
    nickname: "",
    password: "",
  });

  const { email, nickname, password } = signUpInfo; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setsignUpInfo({
      ...signUpInfo, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const onClick = async (e) => {
    console.log(signUpInfo);
    //데이터 보내기
    axios
      .post("https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/member/register", signUpInfo)
      .then((response) => {
        if (response.data) {
          alert("회원가입 완료");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("회원가입 오류");
      });
  };

  const checkOverlap = (value) => {
    //e.preventDefault();
    if (value === email) {
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
    } else if (value === nickname) {
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
          <TextField margin="normal" label="이메일" variant="outlined" value={email} name="email" onChange={onChange} />
          <Button
            onClick={(e) => {
              checkOverlap(email);
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
            value={nickname}
            name="nickname"
            onChange={onChange}
          />
          <Button
            onClick={(e) => {
              checkOverlap(nickname);
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
            value={password}
            name="password"
            onChange={onChange}
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
