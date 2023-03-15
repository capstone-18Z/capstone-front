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
        }
      })
      .catch((err) => {
        console.log(err);
        alert("회원가입 오류");
      });
  };

  const goToLogin = (e) => {
    navigate("/");
  };

  return (
    <div>
      <div>회원가입</div>
      <form>
        <div>
          <TextField margin="normal" label="이메일" variant="outlined" value={email} name="email" onChange={onChange} />
        </div>
        <div>
          <TextField
            margin="normal"
            label="닉네임"
            variant="outlined"
            value={nickname}
            name="nickname"
            onChange={onChange}
          />
        </div>
        <div>
          <TextField
            margin="normal"
            label="PASSWORD"
            variant="outlined"
            value={password}
            name="password"
            onChange={onChange}
          />
        </div>
        <Button variant="contained" onClick={onClick}>
          제출
        </Button>
        <Button variant="contained" onClick={goToLogin}>
          로그인
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
