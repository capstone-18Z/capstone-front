import "./style.css";
import { TextField, Typography, Rating, Button, Select, MenuItem } from "@mui/material";
import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app";

function UserBuilding() {
  const navigate = useNavigate();
  const formData = new FormData();
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
    memberKeywords: [],
  });
  const [keywords, setKeywords] = useState([]);
  const [showImg, setShowImg] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const imgRef = useRef();

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

  const onChange3 = (e) => {
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
    console.log(userform);
    console.log(imgFile);
    formData.append("metadata", JSON.stringify(userform));
    formData.append("files", imgFile);
    //데이터 보내기
    axios
      .post(`${BASE_URL}/member/post/new`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data) {
          alert("등록 완료");
          navigate("/main");
        }
      })
      .catch((err) => {
        console.log(err.response);
        alert("등록 실패");
      });
  };

  const handleImageUrlChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0]; //선택된 파일 가져오기
    setImgFile(file);
    //이미지 사이즈 제한
    if (file.size > 10 * 1024 * 1024) {
      alert("이미지 사이즈는 10MB 이내로 가능합니다.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setShowImg(reader.result);
    };
  };

  return (
    <div className="userform-box">
      <h1 className="userform-title">사용자 정보 등록 폼</h1>
      <form>
        <div className="profile-img">
          <div>
            <img src={showImg} alt="" style={{width:"500px"}}></img>
          </div>
          <input type="file" accept="image/*" onChange={handleImageUrlChange} ref={imgRef} />
        </div>
        <div className="userform-text">
          <TextField fullWidth label="제목" variant="outlined" value={title} name="title" onChange={onChange} />
        </div>
        <div>
          <h3 className="job-title">희망 참여 분야</h3>
          <Select fullWidth labelId="demo-simple-select-label" name="field" value={field} label="" onChange={onChange}>
            <MenuItem value={1}>프론트엔드</MenuItem>
            <MenuItem value={2}>백엔드</MenuItem>
            <MenuItem value={0}>상관없음</MenuItem>
          </Select>
        </div>
        <div className="lang-box">
          <h3 className="lang-title">언어</h3>
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
        <div className="keyword-box">
          <TextField
            margin="normal"
            fullWidth
            id="standard-basic"
            variant="standard"
            value={keywords.map((data) => data)}
          />
          <Button variant="outlined" name="memberKeywords" value="프론트엔드 개발자" onClick={onChange3}>
            프론트엔드 개발자
          </Button>
          <Button variant="outlined" name="memberKeywords" value="백엔드 개발자" onClick={onChange3}>
            백엔드 개발자
          </Button>
          <Button variant="outlined" name="memberKeywords" value="풀스택 개발자" onClick={onChange3}>
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
