import "./style.css";
import { TextField, Button, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import useInput from "../../hooks/useInput";
import axios from "axios";

function SignUp({ onClose, onLoginClick }) {
  const handleLoginClick = () => {
    onClose();
    onLoginClick();
  };
  const [alertNum, setAlertNum] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [signUpInfo, setSignUpInfo] = useInput({
    email: "",
    nickname: "",
    password: "",
  });

  const validateEmail = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (signUpInfo.email === "") {
      return "";
    } else if (!emailRegex.test(signUpInfo.email)) {
      return "유효한 이메일 주소를 입력해주세요.";
    }
    return "";
  };

  const validatePassword = () => {
    if (signUpInfo.password === "") {
      return "";
    } else if (signUpInfo.password.length < 8) {
      return "비밀번호는 8자리 이상 입력해주세요.";
    }
    return "";
  };

  const validateNickname = () => {
    if (signUpInfo.nickname === "") {
      return "";
    } else if (signUpInfo.nickname.length < 2) {
      return "닉네임은 2자리 이상 입력해주세요.";
    }
    return "";
  };

  const onClick = async (e) => {
    console.log(signUpInfo);
    axios
      .post(`${process.env.REACT_APP_API_URL}/member/register`, signUpInfo)
      .then((response) => {
        if (response.data) {
          setAlertNum(1);
        }
      })
      .catch((err) => {
        console.log(err.response);
        setAlertNum(2);
      });
  };

  const checkOverlap = (value) => {
    //e.preventDefault();
    if (value === "email") {
      axios.get(`${process.env.REACT_APP_API_URL}/member/check_email/${signUpInfo.email}/exists`).then((response) => {
        console.log(response.data);
        if (response.data === true) {
          setAlertNum(4);
        } else {
          setAlertNum(3);
        }
      });
    } else if (value === "nickname") {
      axios
        .get(`${process.env.REACT_APP_API_URL}/member/check_nickname/${signUpInfo.nickname}/exists`)
        .then((response) => {
          console.log(response.data);
          if (response.data === true) {
            setAlertNum(6);
          } else {
            setAlertNum(5);
          }
        });
    }
  };

  useEffect(() => {
    switch (alertNum) {
      case 1:
        setAlertMessage("회원가입이 완료되었습니다.");
        break;
      case 2:
        setAlertMessage("회원가입에 실패하였습니다. 입력값을 확인해주세요.");
        break;
      case 3:
        setAlertMessage("사용 가능한 이메일입니다.");
        break;
      case 4:
        setAlertMessage("이미 존재하는 이메일입니다. 다른 이메일을 입력해주세요.");
        break;
      case 5:
        setAlertMessage("사용 가능한 닉네임입니다.");
        break;
      case 6:
        setAlertMessage("이미 존재하는 닉네임입니다. 다른 닉네임을 입력해주세요.");
        break;
      default:
        setAlertMessage("");
        break;
    }
  }, [alertNum, alertMessage]);

  const showAlert = () => {
    if (alertNum % 2 === 0 && alertNum !== 0) {
      return <Alert severity="error">{alertMessage}</Alert>;
    } else if (alertNum % 2 === 1) {
      return <Alert severity="success">{alertMessage}</Alert>;
    } else return;
  };

  return (
    <div className="signup-box">
      <h1 className="signup-title">회원가입</h1>
      <form>
        <div className="signup-text-box">
          <div className="signup-text">
            <TextField
              margin="normal"
              label="이메일"
              variant="outlined"
              value={signUpInfo.email}
              name="email"
              onChange={setSignUpInfo}
              helperText={validateEmail()}
              error={validateEmail() !== ""}
            />
            <TextField
              margin="normal"
              label="닉네임"
              variant="outlined"
              value={signUpInfo.nickname}
              name="nickname"
              onChange={setSignUpInfo}
              helperText={validateNickname()}
              error={validateNickname() !== ""}
            />
            <TextField
              label="비밀번호"
              margin="normal"
              variant="outlined"
              type="password"
              value={signUpInfo.password}
              name="password"
              onChange={setSignUpInfo}
              helperText={validatePassword()}
              error={validatePassword() !== ""}
            />
          </div>
          <div className="signup-checkbuttons">
            <Button
              onClick={(e) => {
                checkOverlap("email");
              }}
              sx={{
                padding: "15px",
                marginTop: "16px",
              }}
              disabled={validateEmail() !== ""}
            >
              중복확인
            </Button>
            <Button
              onClick={(e) => {
                checkOverlap("nickname");
              }}
              sx={{
                padding: "15px",
                marginTop: "24px",
              }}
              disabled={validateNickname() !== ""}
            >
              중복확인
            </Button>
          </div>
        </div>
        <div>{showAlert()}</div>
        <div className="signup-button">
          <Button
            variant="contained"
            onClick={onClick}
            disabled={validateEmail() !== "" || validateNickname() !== "" || validatePassword() !== ""}
          >
            회원가입
          </Button>
          <div className="goLogin-button">
            <p className="text">이미 계정이 있으신가요?</p>
            <Button variant="text" onClick={handleLoginClick}>
              로그인
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
