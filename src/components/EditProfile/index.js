import { TextField, Button, Select, MenuItem, Box, FormControl, InputLabel } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import "./style.css";
import useInput from "../../hooks/useInput";
import Languages from "../TechniqueStack/language";
import Framework from "../TechniqueStack/framework";
import Database from "../TechniqueStack/database";

function EditProfile() {
  const [inputs, setInputs] = useInput({
    nickname: "",
    email: "",
    grade: "",
    gitlink: "",
  });
  const [teamPurposes, setTeamPurposes] = useState([]);
  const [category, setCategory] = useState([]);
  const [field, setField] = useState("");
  const [fieldToggle, setFieldToggle] = useState(false); // 추가
  const [subject, setSubject] = useState("");
  const [subClass, setSubClass] = useState("");
  const [subjectToggle, setSubjectToggle] = useState(false);
  const [showImg, setShowImg] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const imgRef = useRef();
  const [languageValues, setLanguageValues] = useState({
    c: 0,
    cpp: 0,
    cs: 0,
    java: 0,
    javascript: 0,
    sql: 0,
    swift: 0,
    kotlin: 0,
    typescript: 0,
    python: 0,
    html: 0,
    r: 0,
  });

  const handleLanguageValueChange = (newLanguageValues) => {
    setLanguageValues(newLanguageValues);
  };

  const [frameworkValues, setFrameworkValues] = useState({
    react: 0,
    androidstudio: 0,
    nodejs: 0,
    xcode: 0,
    spring: 0,
    unity: 0,
    unrealengine: 0,
    tdmax: 0,
  });

  const handleFrameworkValueChange = (frameworkValues) => {
    setFrameworkValues(frameworkValues);
  };

  const [databaseValues, setDatabaseValues] = useState({
    mysqlL: 0,
    mariadbL: 0,
    mongodbL: 0,
    schemaL: 0,
  });

  const handleDatabaseValueChange = (databaseValues) => {
    setDatabaseValues(databaseValues);
  };

  const onChange3 = (e) => {
    const { value } = e.target;
    const newCategory = category.includes(value) ? category.filter((v) => v !== value) : [...category, value];
    setCategory(newCategory);
    if (value === "과목 팀프로젝트") {
      setSubjectToggle((e) => !e);
    } else {
      setFieldToggle((e) => !e);
    }
  };

  const onChange2 = (e) => {
    const formData = new FormData();
    const getAllFormData = {
      ...inputs,
      teamPurposes,
      languageValues,
      frameworkValues,
      databaseValues,
    };
    console.log(getAllFormData);
    formData.append("metadata", JSON.stringify(getAllFormData));
    formData.append("files", imgFile);
    //데이터 보내기
    // axios
    //   .post(`${BASE_URL}/member/post/new`, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((response) => {
    //     if (response.data) {
    //       alert("등록 완료");
    //       navigate("/main");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //     alert("등록 실패");
    //   });
    /* key 확인하기 */
    for (let key of formData.keys()) {
      console.log(key);
    }

    /* value 확인하기 */
    for (let value of formData.values()) {
      console.log(value);
    }
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

  useEffect(() => {
    const newPurpose = category.map((data) => {
      if (data === "과목 팀프로젝트") {
        return { category: data, subject: subject, subClass: subClass };
      } else {
        return { category: data, field: field };
      }
    });

    setTeamPurposes(newPurpose);
  }, [category, subject, subClass, field]);

  return (
    <div className="profile-box">
      <form>
        <div className="inline-box">
          <div>
            <div className="nickname-box">
              <p className="p-title">닉네임</p>
              <TextField size="small" margin="dense" name="nickname" value={inputs.nickname} onChange={setInputs} />
            </div>
            <div className="email-box">
              <p className="p-title">이메일</p>
              <TextField size="small" margin="dense" name="email" value={inputs.email} onChange={setInputs} />
            </div>
            <div className="grade-box">
              <p className="p-title">학년</p>
              <FormControl size="small" margin="dense">
                <InputLabel></InputLabel>
                <Select sx={{ width: "100px" }} name="grade" value={inputs.grade || ""} onChange={setInputs}>
                  <MenuItem value={1}>1학년</MenuItem>
                  <MenuItem value={2}>2학년</MenuItem>
                  <MenuItem value={3}>3학년</MenuItem>
                  <MenuItem value={4}>4학년</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="githublink-box">
              <p className="p-title">깃허브 링크</p>
              <TextField size="small" margin="dense" name="gitlink" value={inputs.gitlink} onChange={setInputs} />
            </div>
          </div>
          <div className="profile-img">
            <div>
              <div>
                <img src={showImg} alt="" style={{ width: "200px", height: "200px" }}></img>
              </div>
              <input type="file" accept="image/*" onChange={handleImageUrlChange} ref={imgRef} />
            </div>
          </div>
        </div>
        <div className="keyword-box">
          <p className="p-title">원하는 팀</p>
          <div className="button-box">
            <TextField fullWidth size="small" margin="dense" value={category.map((data) => data)} />
            <Button variant="outlined" sx={{margin:"10px"}}  value="캡스톤 디자인" onClick={onChange3}>
              캡스톤 디자인
            </Button>
            <Button variant="outlined" sx={{margin:"10px"}} value="과목 팀프로젝트" onClick={onChange3}>
              과목 팀프로젝트
            </Button>
            <Button variant="outlined" sx={{margin:"10px"}} value="공모전 및 대회" onClick={onChange3}>
              공모전 및 대회
            </Button>
            <Button variant="outlined" sx={{margin:"10px"}} value="개인 팀프로젝트" onClick={onChange3}>
              개인 팀프로젝트
            </Button>
          </div>
        </div>
        {fieldToggle && (
          <div className="field-toggle-box">
            <p className="p-title"></p>
            <InputLabel></InputLabel>
            <FormControl size="small" margin="dense">
              <Select
                sx={{ width: "200px" }}
                
                name="field"
                value={field}
                onChange={(e) => {
                  setField(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <MenuItem value={1}>프론트엔드</MenuItem>
                <MenuItem value={2}>백엔드</MenuItem>
                <MenuItem value={0}>상관없음</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}
        {subjectToggle && (
          <div className="subject-toggle-box">
            <div className="inline-box">
              <p className="p-title">과목</p>
              <TextField
                size="small"
                margin="dense"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              />
            </div>
            <div className="inline-box">
              <p className="p-title">분반</p>
              <TextField
                size="small"
                margin="dense"
                sx={{ width: "50px" }}
                value={subClass}
                onChange={(e) => {
                  setSubClass(e.target.value);
                }}
              />
            </div>
          </div>
        )}
        <div className="team-lang-box" style={{ justifyContent: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3>LANGUAGE</h3>
            <Languages languageValues={languageValues} onLanguageValueChange={handleLanguageValueChange} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3>FRAMEWORK & PLATFORM</h3>
            <Framework frameworkValues={frameworkValues} onFrameworkValueChange={handleFrameworkValueChange} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3>DATABASE</h3>
            <Database databaseValues={databaseValues} onDatabaseValueChange={handleDatabaseValueChange} />
          </Box>
        </div>
        <Button variant="outlined" onClick={onChange2}>
          등록
        </Button>
      </form>
    </div>
  );
}

export default EditProfile;
