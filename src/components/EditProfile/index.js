import { TextField, Button, Select, MenuItem, Box, FormControl, InputLabel } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import useInput from "../../hooks/useInput";
import Languages from "../TechniqueStack/language";
import Framework from "../TechniqueStack/framework";
import Database from "../TechniqueStack/database";
import axios from "axios";

function EditProfile({ fetchData, payload }) {
  const navigate = useNavigate();
  const [memberData, setMemberData] = useState(payload.data.member);
  const [inputs, setInputs] = useInput({
    solvedNickname: memberData.solvedNickname === "!!No User!!" ? "" : memberData.solvedNickname || "",
    nickname: memberData.nickname || "",
    email: memberData.email || "",
    grade: memberData.grade || "",
    github: memberData.github || "",
  });
  const [memberKeywords, setMemberKeywords] = useState([]);
  const [category, setCategory] = useState(memberData.memberKeywords.map((keyword) => keyword.category));
  const [field, setField] = useState(
    memberData.memberKeywords
      .filter((keyword) => keyword.category !== "과목 팀프로젝트")
      .map((keyword) => keyword.field)
      .join()
  );
  const [fieldToggle, setFieldToggle] = useState(false); // 추가
  const [subject, setSubject] = useState(
    memberData.memberKeywords
      .filter((keyword) => keyword.category === "과목 팀프로젝트")
      .map((keyword) => keyword.field)
      .join()
  );
  const [sub, setSub] = useState(
    memberData.memberKeywords
      .filter((keyword) => keyword.category === "과목 팀프로젝트")
      .map((keyword) => keyword.sub)
      .join()
  );
  const [subjectToggle, setSubjectToggle] = useState(false);
  const [showImg, setShowImg] = useState(memberData.profileImageUrl);
  const [imgFile, setImgFile] = useState(null);
  const imgRef = useRef();
  const [memberLang, setMemberLang] = useState({
    c: memberData.memberLang.c,
    cpp: memberData.memberLang.cpp,
    cs: memberData.memberLang.cs,
    java: memberData.memberLang.java,
    javascript: memberData.memberLang.javascript,
    sql_Lang: memberData.memberLang.sql_Lang,
    swift: memberData.memberLang.swift,
    kotlin: memberData.memberLang.kotlin,
    typescript: memberData.memberLang.typescript,
    python: memberData.memberLang.python,
    html: memberData.memberLang.html,
    r: memberData.memberLang.r,
  });

  const handleLanguageValueChange = (newLanguageValues) => {
    setMemberLang(newLanguageValues);
  };

  const [memberFramework, setMemberFramework] = useState({
    react: memberData.memberFramework.react,
    android: memberData.memberFramework.android,
    node: memberData.memberFramework.node,
    xcode: memberData.memberFramework.xcode,
    spring: memberData.memberFramework.spring,
    unity: memberData.memberFramework.unity,
    unreal: memberData.memberFramework.unreal,
    tdmax: memberData.memberFramework.tdmax,
  });

  const handleFrameworkValueChange = (frameworkValues) => {
    setMemberFramework(frameworkValues);
  };

  const [memberDB, setMemberDB] = useState({
    mysqlL: memberData.memberDB.mysqlL,
    mariadbL: memberData.memberDB.mariadbL,
    mongodbL: memberData.memberDB.mongodbL,
    schemaL: memberData.memberDB.schemaL,
  });

  const handleDatabaseValueChange = (databaseValues) => {
    setMemberDB(databaseValues);
  };

  const onChange3 = (e) => {
    const { value } = e.target;
    const newCategory = category.includes(value) ? category.filter((v) => v !== value) : [...category, value];
    setCategory(newCategory);
    if (value === "과목 팀프로젝트") {
      setSubjectToggle((e) => !e);
    } else {
      setFieldToggle(
        newCategory.includes("캡스톤 디자인") ||
          newCategory.includes("공모전 및 대회") ||
          newCategory.includes("개인 팀프로젝트")
      );
    }
  };

  const onChange2 = (e) => {
    const formData = new FormData();
    const getAllFormData = {
      ...inputs,
      memberKeywords,
      memberLang,
      memberFramework,
      memberDB,
    };
    console.log(getAllFormData);
    formData.append("metadata", JSON.stringify(getAllFormData));
    formData.append("file", imgFile);
    //데이터 보내기
    axios
      .post(`${process.env.REACT_APP_API_URL}/member/userForm/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data) {
          alert("등록 완료");
          fetchData();
          navigate(`/profile/${localStorage.getItem("email")}`);
        }
      })
      .catch((err) => {
        console.log(err.response);
        alert("등록 실패");
      });
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
        return { category: data, field: subject, sub: sub };
      } else {
        return { category: data, field: field };
      }
    });
    setMemberKeywords(newPurpose);
  }, [category, subject, sub, field]);

  useEffect(() => {
    const hasSubjectTeamProject = memberData.memberKeywords.some((keyword) => keyword.category === "과목 팀프로젝트");
    if (hasSubjectTeamProject) {
      setSubjectToggle((e) => !e);
    }
    const hasOtherKeywords = memberData.memberKeywords.some((keyword) =>
      ["캡스톤 디자인", "개인 팀프로젝트", "공모전 및 대회"].includes(keyword.category)
    );
    if (hasOtherKeywords) {
      setFieldToggle((e) => !e);
    }
  }, [memberData.memberKeywords]);

  return (
    <div className="profile-box">
      <form>
        <div className="inline-box">
          <div>
            <div className="nickname-box">
              <InputLabel shrink>닉네임</InputLabel>
              <TextField
                size="small"
                sx={{ marginBottom: "10px" }}
                placeholder="닉네임을 입력해주세요"
                name="nickname"
                value={inputs.nickname}
                onChange={setInputs}
              />
              <InputLabel shrink>백준 닉네임</InputLabel>
              <TextField
                size="small"
                sx={{ marginBottom: "10px" }}
                placeholder="닉네임을 입력해주세요"
                name="solvedNickname"
                value={inputs.solvedNickname}
                onChange={setInputs}
              />
            </div>
            <div className="email-box">
              <InputLabel shrink>이메일</InputLabel>
              <TextField
                size="small"
                sx={{ marginBottom: "10px" }}
                placeholder="이메일을 입력해주세요"
                name="email"
                value={inputs.email}
                onChange={setInputs}
              />
            </div>
            <div className="grade-box">
              <InputLabel shrink>학년</InputLabel>
              <FormControl size="small" sx={{ marginBottom: "10px" }}>
                <Select sx={{ width: "100px" }} name="grade" value={inputs.grade || ""} onChange={setInputs}>
                  <MenuItem value={1}>1학년</MenuItem>
                  <MenuItem value={2}>2학년</MenuItem>
                  <MenuItem value={3}>3학년</MenuItem>
                  <MenuItem value={4}>4학년</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="githublink-box">
              <InputLabel shrink>깃허브 링크</InputLabel>
              <TextField
                size="small"
                sx={{ marginBottom: "10px" }}
                placeholder="깃허브 링크를 입력해주세요"
                name="github"
                value={inputs.github}
                onChange={setInputs}
              />
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
          <div className="button-box">
            <InputLabel shrink>원하는 팀을 골라주세요</InputLabel>
            <TextField fullWidth size="small" value={category.map((data) => data)} />
            <Button variant="outlined" sx={{ margin: "10px" }} value="캡스톤 디자인" onClick={onChange3}>
              캡스톤 디자인
            </Button>
            <Button variant="outlined" sx={{ margin: "10px" }} value="과목 팀프로젝트" onClick={onChange3}>
              과목 팀프로젝트
            </Button>
            <Button variant="outlined" sx={{ margin: "10px" }} value="공모전 및 대회" onClick={onChange3}>
              공모전 및 대회
            </Button>
            <Button variant="outlined" sx={{ margin: "10px" }} value="개인 팀프로젝트" onClick={onChange3}>
              개인 팀프로젝트
            </Button>
          </div>
        </div>
        {fieldToggle && (
          <div className="field-toggle-box">
            <InputLabel shrink>프론트엔드와 백엔드를 나눠야할 경우 골라주세요</InputLabel>
            <FormControl size="small">
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
            <InputLabel shrink>과목 (수업계획서에 등록된 정확한 과목명을 입력해주세요)</InputLabel>
            <TextField
              size="small"
              placeholder="과목을 입력해주세요"
              sx={{ marginBottom: "10px" }}
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />
            <InputLabel shrink>분반 (수업계획서에 등록된 정확한 분반을 입력해주세요)</InputLabel>
            <TextField
              size="small"
              placeholder="분반을 입력해주세요"
              sx={{ marginBottom: "10px" }}
              value={sub}
              onChange={(e) => {
                setSub(e.target.value);
              }}
            />
          </div>
        )}
        <div className="team-lang-box" style={{ justifyContent: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3>LANGUAGE</h3>
            <Languages languageValues={memberLang} onLanguageValueChange={handleLanguageValueChange} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3>FRAMEWORK & PLATFORM</h3>
            <Framework frameworkValues={memberFramework} onFrameworkValueChange={handleFrameworkValueChange} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3>DATABASE</h3>
            <Database databaseValues={memberDB} onDatabaseValueChange={handleDatabaseValueChange} />
          </Box>
        </div>
        <Button sx={{ marginTop: "20px" }} variant="outlined" onClick={onChange2}>
          등록
        </Button>
      </form>
    </div>
  );
}

export default EditProfile;
