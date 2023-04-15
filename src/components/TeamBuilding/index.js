import "./style.css";
import React, { useEffect ,useState, useRef } from 'react';
import {useNavigate} from "react-router-dom";
import { TextField, Box, Checkbox, Grid ,FormControlLabel, Select, MenuItem  } from "@mui/material";
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr'
import MyDropzone from "../Dropzone/dropzone";
import axios from 'axios';
import Languages from "../TechniqueStack/language";
import Framework from "../TechniqueStack/framework";
import Database from "../TechniqueStack/database";

function TeamBuilding() {
    //로그인 토큰 저장
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    //유저가 글쓰는 날짜 시간 저장 
    const today = new Date();
    const time = today.toLocaleTimeString(); 
    const date = today.toLocaleDateString();
    const now = date+time;
    const navigate = useNavigate();
    
    
    const [keywords, setKeywords] = useState([]);      
    const handleChange = (event) => {        
        const isChecked = event.currentTarget.checked;
        const {name, value} = event.target;
        if (isChecked) {
            setKeywords([...keywords, value]);
        }
        else {
            setKeywords(keywords.filter(e => e !== value));
        }     
        
    };
    useEffect(()=>{
        const nextInputs = {
            ...inputs,
            teamKeywords: keywords.length === 0 ? [] : keywords.map((data) => ({"value" : data}))
        };   
        setInputs(nextInputs);           
    },[keywords])

    const [inputs, setInputs] = useState({
        //프로젝트 제목, 목적 데이터 관리
        title: "",
        purpose : "",
        purposeDetail1: "",
        purposeDetail2: "",
        purposeDetail3: "",
        wantTeamMemberCount: 0,
        //현재 프론트, 백 팀원수 데이터 관리
        currentFrontMember: 0,
        currentBackMember:0,
        //모집 프론트, 백 팀원수 데이터 관리
        wantedFrontMember: 0,
        wantedBackEndMember: 0,       
       
        //팀 키워드
        teamKeywords: [],
        createDate: now,
        updateDate: now,
    });
    const {wantTeamMemberCount, title,purpose,purposeDetail1,purposeDetail2,purposeDetail3 ,createDate, updateDate} = inputs;	//비구조화 할당
   
    const onChange = (e) => {
        const {name, value} = e.target;
        const nextInputs = {
            //spread 문법. 현재 상태의 내용이 이 자리로 온다. 
            ...inputs,
            [name] : value,
        };
        //객체를 새로운 상태로 쓰겠다. 
        setInputs(nextInputs);
        console.log(inputs);
    };
      

    const PostRequest = (e) => {
        e.preventDefault();
    }
    const testSubmitHandler=async (e) => {
        
        const test = new FormData();
        const newinputs= {
          ...inputs,
          teamLanguage,
          teamFramework,
          teamDatabase,
        }

        test.append("team", JSON.stringify(newinputs));
        
        uploadedFiles.forEach((image) => {
           test.append("images", image);
        });       
        
        try {
          const response = await axios.post("http://1871166.iptime.org:8080/teams/test/add", test, {
            headers: {
              "Content-Type": "multipart/form-data",
              'refresh-token': refresh_token,
                'login-token': login_token
            },
          });
          console.log(newinputs);
          console.log(response.data);
          alert(response.data.message);
          navigate(`/team`)
        } catch (error) {
          console.error(error);
        }
      };
      /*
    const onSubmitHandler = (e) => {
        fetch('http://1871166.iptime.org:8080/teams/new',{
          method: 'POST',
          headers: {
            'refresh-token': refresh_token,
            'login-token': login_token,
            'Content-Type' : 'application/json',
          },          
            body: JSON.stringify(inputs),
        })
        .then((response) => response.json())
        .then((obj) => console.log(obj));
      };
      //변수명 서버랑 똑같이 해야 보내짐
      */
      
      const editorRef = useRef();

      const DetailOnChange = () => {
        const data = editorRef.current.getInstance().getHTML();       
        const nextInputs = {
            ...inputs,
            detail : data
        };   
        setInputs(nextInputs);   
      };

    const [uploadedFiles, setUploadedFiles] = useState([]);

    const [teamLanguage, setTeamLanguage] = useState({
        c: 0, cpp: 0, cs: 0, java:0, javascript:0, sql_Lang:0, swift:0,
        kotlin:0, typescript:0, python:0, html:0, r:0,
      });

    const handleTeamLanguageChange = (teamLanguage) => {
        setTeamLanguage(teamLanguage);       
    };

    const [teamFramework, setTeamFramework] = useState({
        react: 0, androidStudio: 0, nodejs: 0, xcode:0,
        spring:0, unity:0, unrealEngine:0, tdmax: 0,    
      });

    const handleTeamFrameworkValueChange = (teamFramework) => {
        setTeamFramework(teamFramework);       
    };
   
    const [teamDatabase, setTeamDatabase] = useState({
        mysqlL: 0, mariadbL: 0, mongodbL: 0, schemaL:0,   
      });

    const handleTeamDatabaseChange = (teamDatabase) => {
        setTeamDatabase(teamDatabase);       
    };

    const valuetest= () => {
    }
    
    return (
        <div className="teambuildingform">
            <div className="team_form">            
            <h1>팀 빌딩 폼</h1>            
            
            <form name="team-form" onSubmit={PostRequest}>
                <h2>프로젝트</h2>
                
                <TextField                            
                    required
                    label="프로젝트 제목"
                    value={title}                    
                    name="title"
                    variant="standard"
                    onChange={onChange}
                />                   
                
                <ToastEditor
                    previewStyle="vertical"
                    hideModeSwitch={true}
                    language="ko-KR"
                    initialEditType="wysiwyg"     
                    ref={editorRef}
                    onChange={DetailOnChange}                       
                />   
                
                <MyDropzone uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}/>
                
                <div style={{ display: 'flex' }}>
                    <h3>팀 빌딩 목적</h3>
                    <Select name="purpose" value={purpose} label="모집 인원 수" onChange={onChange}>
                        <MenuItem value={"개인 팀프로젝트"}>개인 팀프로젝트</MenuItem>
                        <MenuItem value={"공모전 및 대회"}>공모전 및 대회</MenuItem>
                        <MenuItem value={"캡스톤 디자인"}>캡스톤 디자인</MenuItem>
                        <MenuItem value={"과목 팀프로젝트"}>과목 팀프로젝트</MenuItem>
                    </Select> 
                </div>

                
                {purpose === "과목 팀프로젝트" ? (
                <div style={{ display: 'flex' }}>
                    <h3>과목</h3>
                    <Select name="purposeDetail1" value={purposeDetail1} label="과목 선택" onChange={onChange}>
                        <MenuItem value={"webpramework1"}>웹프레임워크1</MenuItem>
                        <MenuItem value={"network"}>네트워크프로그래밍</MenuItem>
                        <MenuItem value={"android"}>안드로이드프로그래밍</MenuItem>
                        <MenuItem value={"highAndroid"}>고급모바일프로그래밍</MenuItem>                        
                    </Select>
                    <h3>분반</h3>
                    <Select name="purposeDetail2" value={purposeDetail2} label="분반 선택" onChange={onChange}>
                        <MenuItem value={"a"}>A</MenuItem>
                        <MenuItem value={"b"}>B</MenuItem>
                        <MenuItem value={"c"}>C</MenuItem>
                        <MenuItem value={"d"}>D</MenuItem>   
                        <MenuItem value={"e"}>E</MenuItem>
                        <MenuItem value={"7"}>7</MenuItem>      
                        <MenuItem value={"8"}>8</MenuItem>    
                        <MenuItem value={"N"}>N</MenuItem>   
                        <MenuItem value={"O"}>O</MenuItem>   
                    </Select>
                </div>
                ) : (
                    <div style={{ display: 'flex' }}>
                    <h3>역할 선택</h3>
                    <Select name="purposeDetail1" value={purposeDetail1} label="역할 선택" onChange={onChange}>
                        <MenuItem value={"front"}>프론트엔드</MenuItem>
                        <MenuItem value={"back"}>백엔드</MenuItem>
                        <MenuItem value={"free"}>상관없음</MenuItem> 
                    </Select>
                    </div>
                )}
                모집할 분야를 선택하세요
                <Grid container direction="row" alignItems="center">
                    <FormControlLabel control={<Checkbox value="프론트엔드 개발자" onChange={handleChange} name="프론트엔드 개발자" />} label="프론트엔드 개발자" />  
                    <FormControlLabel control={<Checkbox value="백엔드 개발자" onChange={handleChange} name="백엔드 개발자" />} label="백엔드 개발자" />
                    <FormControlLabel control={<Checkbox value="JAVA 마스터" onChange={handleChange} name="JAVA 마스터" />} label="JAVA 마스터" />  
                    <FormControlLabel control={<Checkbox value="C언어 마스터" onChange={handleChange} name="C언어 마스터" />} label="C언어 마스터" />                 
                </Grid>
               
                <div style={{ display: 'flex' }}>
                    <h3>모집 인원</h3>
                    <Select
                        name="wantTeamMemberCount"
                        value={wantTeamMemberCount}
                        label="모집 인원 수"
                        onChange={onChange}
                        >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                    </Select> 
                </div>

                <div className="team-lang-box" style={{  justifyContent: 'center' }}>                       
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h3>LANGUAGE</h3>    
                        <Languages languageValues={teamLanguage}  onLanguageValueChange={handleTeamLanguageChange}/>                    
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h3>FRAMEWORK & PLATFORM</h3>    
                        <Framework frameworkValues={teamFramework}  onFrameworkValueChange={handleTeamFrameworkValueChange}/>                    
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h3>DATABASE</h3>    
                        <Database databaseValues={teamDatabase} onDatabaseValueChange={handleTeamDatabaseChange}/>         
                    </Box>
                </div>  

                
               
                <button onClick={() => {
                    testSubmitHandler();   
                  }}>등록하기</button>
            </form>
            </div>
        </div>              
    );
}


export default TeamBuilding;