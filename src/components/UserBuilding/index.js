import "./index.css";
import { TextField, Typography, Rating, Button } from "@mui/material";
import { useState } from "react";

function UserBuilding() {
  const [lang, setLang] = useState({
    subject: "",
    track1: "",
    track2: "",
    detail: "",
    c: "",
    java: "",
    python: "",
    js: "",
    os: "",
  });

  const { subject, track1, track2, detail, c, java, python, js, os } = lang; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setLang({
      ...lang, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const onClick = (e) => {
    console.log(lang);
  };

  return (
    <div className="wrap-box">
      <div>사용자 입력 폼</div>
      <form>
        <div className="text-box">
          <TextField
            fullWidth
            label="프로젝트 과목"
            variant="outlined"
            value={subject}
            name="subject"
            onChange={onChange}
          />
        </div>
        <div className="text-box">
          <div>언어</div>
          <div className="rating-box">
            <Typography component="legend">C/C++</Typography>
            <Rating name="c" precision={0.5} value={c} onChange={onChange} />
            <Typography component="legend">JAVA</Typography>
            <Rating name="java" precision={0.5} value={java} onChange={onChange} />
            <Typography component="legend">Python</Typography>
            <Rating name="python" precision={0.5} value={python} onChange={onChange} />
            <Typography component="legend">HTML/CSS/JS</Typography>
            <Rating name="js" precision={0.5} value={js} onChange={onChange} />
          </div>
        </div>
        <div className="text-box">
          <TextField fullWidth label="1트랙" variant="outlined" value={track1} name="track1" onChange={onChange} />
        </div>
        <div className="text-box">
          <TextField fullWidth label="2트랙" variant="outlined" value={track2} name="track2" onChange={onChange} />
        </div>
        <div className="text-box">
          <TextField fullWidth label="OS" variant="outlined" value={os} name="os" onChange={onChange} />
        </div>
        <div className="text-box">
          <TextField
            fullWidth
            label="내용"
            variant="outlined"
            value={detail}
            name="detail"
            onChange={onChange}
            size="big"
          />
        </div>
        <Button variant="contained" onClick={onClick}>
          제출
        </Button>
      </form>
    </div>
  );
}
export default UserBuilding;
