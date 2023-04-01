import "./style.css";
import { TextField, Typography, Rating, Button, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useRef } from "react";
import axios from "axios";

const BASE_URL = "https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app";

function UserBuilding() {
  const [userform, setUserForm] = useState({
    title: "",
    detail: "",
    memberKeywords: [],
  });
  const [keywords, setKeywords] = useState([]);

  const { title, detail } = userform; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setUserForm({
      ...userform, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
    console.log(userform);
  };

  const onChange2 = (e) => {
    const { value } = e.target;
    const newKeywords = [...keywords, value];
    setKeywords(newKeywords);
    if (keywords.includes(value)) {
      setKeywords(keywords.filter((v) => v !== value));
    } else {
      setUserForm({
        ...userform,
        memberKeywords: newKeywords.map((data) => ({ "value": data })),
      });
    }
  };

  const onClick = (e) => {
    console.log(axios.defaults.headers.common);
    console.log(userform);
    //데이터 보내기
    axios
      .post(`${BASE_URL}/member/post/new`, userform)
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
      <h1 className="userform-title">사용자 정보 등록 폼</h1>
      <form>
        <div className="userform-text">
          <TextField fullWidth label="제목" variant="outlined" value={title} name="title" onChange={onChange} />
        </div>
        <div className="keyword-box">
          <TextField
            margin="normal"
            fullWidth
            id="standard-basic"
            variant="standard"
            value={keywords.map((data) => data)}
          />
          <Button variant="outlined" name="memberKeywords" value="프론트엔드 개발자" onClick={onChange2}>
            프론트엔드 개발자
          </Button>
          <Button variant="outlined" name="memberKeywords" value="백엔드 개발자" onClick={onChange2}>
            백엔드 개발자
          </Button>
          <Button variant="outlined" name="memberKeywords" value="풀스택 개발자" onClick={onChange2}>
            풀스택 개발자
          </Button>
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
