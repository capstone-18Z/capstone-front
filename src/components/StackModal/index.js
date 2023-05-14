import { useState, useEffect } from "react";
import { Box, Button, DialogContent, DialogTitle } from "@mui/material";
import Languages from "../TechniqueStack/language";
import Framework from "../TechniqueStack/framework";
import Database from "../TechniqueStack/database";
import axios from "axios";
import "./style.css";

function StackModal({ onClose, member }) {
  const [memberData, setMemberData] = useState(member);
  const [inputs, setInputs] = useState({
    solvedNickname: memberData?.solvedNickname === "!!No User!!" ? "" : memberData?.solvedNickname || "",
    nickname: memberData?.nickname || "",
    email: memberData?.email || "",
    grade: memberData?.grade || "",
    github: memberData?.github || "",
  });
  const [memberKeywords, setMemberKeywords] = useState([]);

  const [memberLang, setMemberLang] = useState({
    c: memberData?.memberLang?.c || 0, // 옵셔널 체이닝 연산자를 사용하여 null 체크 후 속성에 접근하고, 값이 없으면 0으로 설정
    cpp: memberData?.memberLang?.cpp || 0,
    cs: memberData?.memberLang?.cs || 0,
    java: memberData?.memberLang?.java || 0,
    javascript: memberData?.memberLang?.javascript || 0,
    sql_Lang: memberData?.memberLang?.sql_Lang || 0,
    swift: memberData?.memberLang?.swift || 0,
    kotlin: memberData?.memberLang?.kotlin || 0,
    typescript: memberData?.memberLang?.typescript || 0,
    python: memberData?.memberLang?.python || 0,
    html: memberData?.memberLang?.html || 0,
    r: memberData?.memberLang?.r || 0,
  });

  const [selectedLanguages, setSelectedLanguages] = useState({
    c: false,
    cpp: false,
    cs: false,
    java: false,
    javascript: false,
    sql_Lang: false,
    swift: false,
    kotlin: false,
    typescript: false,
    python: false,
    html: false,
    r: false,
  });

  useEffect(() => {
    if (memberData && memberData.memberLang) {
      const updatedSelectedLanguages = {};
      Object.keys(memberData.memberLang).forEach((language) => {
        updatedSelectedLanguages[language] = memberData.memberLang[language] > 0;
      });
      setSelectedLanguages(updatedSelectedLanguages);
    }
  }, [memberData]);

  const handleLanguageValueChange = (newLanguageValues) => {
    setMemberLang(newLanguageValues);
  };

  const [memberFramework, setMemberFramework] = useState({
    react: memberData?.memberFramework?.react || 0,
    android: memberData?.memberFramework?.android || 0,
    node: memberData?.memberFramework?.node || 0,
    xcode: memberData?.memberFramework?.xcode || 0,
    spring: memberData?.memberFramework?.spring || 0,
    unity: memberData?.memberFramework?.unity || 0,
    unreal: memberData?.memberFramework?.unreal || 0,
    tdmax: memberData?.memberFramework?.tdmax || 0,
  });

  const [selectedFrameworks, setSelectedFrameworks] = useState({
    react: false,
    android: false,
    node: false,
    xcode: false,
    spring: false,
    unity: false,
    unreal: false,
    tdmax: false,
  });

  useEffect(() => {
    if (memberData && memberData.memberFramework) {
      const updatedSelectedFramework = {};
      Object.keys(memberData.memberFramework).forEach((framework) => {
        updatedSelectedFramework[framework] = memberData.memberFramework[framework] > 0;
      });
      setSelectedFrameworks(updatedSelectedFramework);
    }
  }, [memberData]);
  const handleFrameworkValueChange = (frameworkValues) => {
    setMemberFramework(frameworkValues);
  };

  const [memberDB, setMemberDB] = useState({
    mysqlL: memberData?.memberDB?.mysqlL || 0,
    mariadbL: memberData?.memberDB?.mariadbL || 0,
    mongodbL: memberData?.memberDB?.mongodbL || 0,
    schemaL: memberData?.memberDB?.schemaL || 0,
  });

  const [selectedDatabases, setSelectedDatabases] = useState({
    mysqlL: false, //mysql
    mariadbL: false,
    mongodbL: false,
    schemaL: false,
  });

  useEffect(() => {
    if (memberData && memberData.memberDB) {
      const updatedSelectedDB = {};
      Object.keys(memberData.memberDB).forEach((DB) => {
        updatedSelectedDB[DB] = memberData.memberDB[DB] > 0;
      });
      setSelectedDatabases(updatedSelectedDB);
    }
  }, [memberData]);

  const handleDatabaseValueChange = (databaseValues) => {
    setMemberDB(databaseValues);
  };

  const onClick = (e) => {
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
          onClose();
        }
      })
      .catch((err) => {
        console.log(err.response);
        alert("등록 실패");
        onClose();
      });
  };

  return (
    <div className="stackmodal-box">
      <h1 className="stackmodal-title">기술 스택을 설정해 메이트로 등록하세요!</h1>
      <div className="team-lang-box" style={{ justifyContent: "center", marginTop: "20px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h3>LANGUAGE</h3>
          <Languages
            languageValues={memberLang}
            onLanguageValueChange={handleLanguageValueChange}
            selectedLanguages={selectedLanguages}
            setSelectedLanguages={setSelectedLanguages}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "30px" }}>
          <h3>FRAMEWORK & PLATFORM</h3>
          <Framework
            frameworkValues={memberFramework}
            onFrameworkValueChange={handleFrameworkValueChange}
            selectedFrameworks={selectedFrameworks}
            setSelectedFrameworks={setSelectedFrameworks}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "30px" }}>
          <h3>DATABASE</h3>
          <Database
            databaseValues={memberDB}
            onDatabaseValueChange={handleDatabaseValueChange}
            selectedDatabases={selectedDatabases}
            setSelectedDatabases={setSelectedDatabases}
          />
        </Box>
      </div>
      <div className="stack-button-box">
        <Button onClick={onClose}>Close</Button>
        <Button onClick={onClick}>등록</Button>
      </div>
    </div>
  );
}

export default StackModal;
