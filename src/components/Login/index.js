import "./style.css";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    id: "",
    pw: "",
  });

  const { id, pw } = userInfo; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setUserInfo({
      ...userInfo, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const onClick = (e) => {
    console.log(userInfo);
    navigate("/main");
  };

  return (
    <div>
      <div>로그인</div>
      <form>
        <div>
          <TextField label="ID" variant="outlined" value={id} name="id" onChange={onChange} />
        </div>
        <div>
          <TextField margin="normal" label="PASSWORD" variant="outlined" value={pw} name="pw" onChange={onChange} />
        </div>
        <Button variant="contained" onClick={onClick}>
          제출
        </Button>
      </form>
    </div>
  );
}

export default Login;
