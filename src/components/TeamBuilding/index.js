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
        //프로젝트 제목, 설명 데이터 관리
        title: "",
        detail: "",
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
    const {currentFrontMember, currentBackMember,wantedFrontMember,wantedBackEndMember, title,createDate, updateDate} = inputs;	//비구조화 할당
   
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
          languageValues,
        }

        test.append("team", JSON.stringify(newinputs));
        
        uploadedFiles.forEach((image) => {
           test.append("images", image);
        });       
        
        try {
          const response = await axios.post("https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/teams/new", test, {
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
        fetch('https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/teams/new',{
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

    const [languageValues, setLanguageValues] = useState({
        c: 0, cpp: 0, cs: 0, java:0, javascript:0, sql:0, swift:0,
        kotlin:0, typescript:0, python:0, html:0, r:0,
      });

    const handleLanguageValueChange = (newLanguageValues) => {
        setLanguageValues(newLanguageValues);       
    };

    const [frameworkValues, setFrameworkValues] = useState({
        react: 0, androidstudio: 0, nodejs: 0, xcode:0,
        spring:0, unity:0, unrealengine:0, _3dmax: 0,    
      });

    const handleFrameworkValueChange = (frameworkValues) => {
        setFrameworkValues(frameworkValues);       
    };

    const valuetest= () => {
        console.log(languageValues)
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
                
                <div className="team-lang-box" style={{  justifyContent: 'center' }}>                       
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h3>LANGUAGE</h3>    
                        <Languages languageValues={languageValues}  onLanguageValueChange={handleLanguageValueChange}/>                    
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h3>FRAMEWORK & PLATFORM</h3>    
                        <Framework frameworkValues={frameworkValues}  onFrameworkValueChange={handleFrameworkValueChange}/>                    
                    </Box>
                </div>  

                모집할 팀원들의 키워드를 선택하세요
                <Grid container direction="row" alignItems="center">
                    <FormControlLabel control={<Checkbox value="프론트엔드 개발자" onChange={handleChange} name="프론트엔드 개발자" />} label="프론트엔드 개발자" />  
                    <FormControlLabel control={<Checkbox value="백엔드 개발자" onChange={handleChange} name="백엔드 개발자" />} label="백엔드 개발자" />
                    <FormControlLabel control={<Checkbox value="JAVA 마스터" onChange={handleChange} name="JAVA 마스터" />} label="JAVA 마스터" />  
                    <FormControlLabel control={<Checkbox value="C언어 마스터" onChange={handleChange} name="C언어 마스터" />} label="C언어 마스터" />                 
                </Grid>
               
                <div className="team-count-box" style={{ display: 'flex', justifyContent: 'center' }}>
                    <p>현재 팀원 수</p>
                   
                    <p>프론트 :</p>
                    <Select
                    name="currentFrontMember"
                    value={currentFrontMember}
                    label="프론트"
                    onChange={onChange}
                    >
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    </Select>  
                    <p>백 :</p>
                    <Select
                    name="currentBackMember"
                    value={currentBackMember}
                    label="백"
                    onChange={onChange}
                    >
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    </Select>       
                        
                    <p>모집하는 팀원 수</p>
                    <p>프론트 : </p>
                    <Select
                    name="wantedFrontMember"
                    value={wantedFrontMember}
                    label="백"
                    onChange={onChange}
                    >
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    </Select>   
                    <p>백 : </p>
                    <Select
                    name="wantedBackEndMember"
                    value={wantedBackEndMember}
                    label="백"
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
                
                <button onClick={() => {
                    testSubmitHandler();   
                  }}>등록하기</button>
            </form>
            </div>
        </div>              
    );
}


export default TeamBuilding;