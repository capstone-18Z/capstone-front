import "./style.css";
import { TextField, Typography, Rating, Button, Select, MenuItem } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const BASE_URL = "https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app";

function EditUser() {
  const navigate = useNavigate();
  // 이미지 변수
  const formData = new FormData();
  const [showImg, setShowImg] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const imgRef = useRef();
  // 폼
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
  // url 파라미터 받아오기 postid
  const postId = useParams().postId;
  console.log(postId);
  // get 읽어오기
  const [payload, setPayload] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/member/post/${postId}`);
      console.log(response.data);
      setPayload(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  });

  useEffect(() => {
    if (payload) {
      setUserForm({
        title: payload.data.title,
        field: payload.data.field,
        detail: payload.data.detail,
        c: payload.data.c,
        cs: payload.data.cs,
        cpp: payload.data.cpp,
        vb: payload.data.vb,
        assembly: payload.data.assembly,
        php: payload.data.php,
        java: payload.data.java,
        javascript: payload.data.javascript,
        python: payload.data.python,
        sqllang: payload.data.sqllang,
      });
    }
  }, [payload]);

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
    console.log(userform);
    console.log(imgFile);
    formData.append("metadata", JSON.stringify(userform));
    formData.append("files", imgFile);
    //데이터 보내기
    axios
      .post(`${BASE_URL}/member/post/update/${postId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data) {
          alert("수정 완료");
          navigate("/main");
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert(err.response.data.message);
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
      <Link to="/post/usertest">키워드</Link>
      <h1 className="userform-title">사용자 정보 등록 폼</h1>
      <form>
        <div className="profile-img">
          <div>
            <img src={showImg} alt=""/>
          </div>
          <input type="file" accept="image/*" onChange={handleImageUrlChange} ref={imgRef} />
        </div>
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
export default EditUser;
