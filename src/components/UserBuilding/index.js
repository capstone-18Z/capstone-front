import "./style.css";
import { TextField, Typography, Rating, Button, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BASE_URL = "https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app";

function UserBuilding() {
  const [userform, setUserForm] = useState({
    title: "",
    field: "",
    detail: "",
    c: "",
    cs: "",
    cpp: "",
    vb: "",
    assembly: "",
    php: "",
    java: "",
    javascript: "",
    python: "",
    sqllang: "",
  });

  const { title, field, detail, c, cs, cpp, vb, assembly, php, java, javascript, python, sqllang } = userform; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setUserForm({
      ...userform, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const onChange2 = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setUserForm({
      ...userform, // 기존의 input 객체를 복사한 뒤
      [name]: Number(value), // name 키를 가진 값을 value 로 설정
    });
  };

  const onClick = (e) => {
    console.log(axios.defaults.headers.common);
    console.log(userform);
    //데이터 보내기
    axios
      .post(`${BASE_URL}/member/new`, userform)
      .then((response) => {
        if (response.data) {
          alert("등록 완료");
        }
      })
      .catch((err) => {
        console.log(err.response);
        alert("등록 실패");
      });
  };

  return (
    <div className="userform-box">
      <Link to="/post/usertest">키워드</Link>
      <h1 className="userform-title">사용자 정보 등록 폼</h1>
      <form>
        <div className="userform-text">
          <TextField fullWidth label="제목" variant="outlined" value={title} name="title" onChange={onChange} />
        </div>
        <div>
          <h3>희망 참여 분야</h3>
          <Select fullWidth labelId="demo-simple-select-label" name="field" value={field} label="" onChange={onChange}>
            <MenuItem value={1}>프론트엔드</MenuItem>
            <MenuItem value={2}>백엔드</MenuItem>
            <MenuItem value={0}>상관없음</MenuItem>
          </Select>
        </div>
        <h3>언어</h3>
        <div className="lang-box">
          <div className="rating-box">
            <Typography component="legend">C</Typography>
            <Rating name="c" precision={1} value={c} onChange={onChange2} />
            <Typography component="legend">C++</Typography>
            <Rating name="cpp" precision={1} value={cpp} onChange={onChange2} />
            <Typography component="legend">C#</Typography>
            <Rating name="cs" precision={1} value={cs} onChange={onChange2} />
            <Typography component="legend">JAVA</Typography>
            <Rating name="java" precision={1} value={java} onChange={onChange2} />
            <Typography component="legend">Python</Typography>
            <Rating name="python" precision={1} value={python} onChange={onChange2} />
            <Typography component="legend">JAVASCRIPT</Typography>
            <Rating name="javascript" precision={1} value={javascript} onChange={onChange2} />
            <Typography component="legend">VISUAL BASIC</Typography>
            <Rating name="vb" precision={1} value={vb} onChange={onChange2} />
            <Typography component="legend">SQL</Typography>
            <Rating name="sqllang" precision={1} value={sqllang} onChange={onChange2} />
            <Typography component="legend">assembly</Typography>
            <Rating name="assembly" precision={1} value={assembly} onChange={onChange2} />
            <Typography component="legend">php</Typography>
            <Rating name="php" precision={1} value={php} onChange={onChange2} />
          </div>
        </div>
        <div className="userform-text">
          <TextField
            margin="normal"
            fullWidth
            multiline
            rows={10}
            label="내용"
            variant="outlined"
            value={detail}
            name="detail"
            onChange={onChange}
            size="big"
          />
        </div>
        <Button variant="contained" onClick={onClick}>
          등록
        </Button>
      </form>
    </div>
  );
}
export default UserBuilding;
