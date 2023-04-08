import { useParams } from 'react-router-dom';
import React, {useRef, useState, useEffect } from "react";
import { TextField, Slider, Box, Grid, Checkbox ,FormControlLabel, Select, MenuItem  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr'

function EditTeam() {
    const navigate = useNavigate();
    const params = useParams();
    const teamId = params.teamId;
 

    useEffect(() => {                       
        fetch(`http://1871166.iptime.org:8080/teams/${teamId}`,{     
                headers: {
                    'refresh-token': refresh_token,
                    'login-token': login_token,
                } 
        })
        .then((response) => response.json())        
        .then((obj)=>{ editorRef.current?.getInstance().setHTML(obj.data.team.detail); return obj;})
        .then((obj) => {setInputs(obj.data.team); console.log(obj.data.team.detail); })        
    }, []);

//로그인 토큰 받아와서 저장
const refresh_token = localStorage.getItem("refresh-token");
const login_token = localStorage.getItem("login-token");
//유저가 글쓰는 날짜 시간 저장 
const today = new Date();
const time = today.toLocaleTimeString(); 
const date = today.toLocaleDateString();
const now = date+time;


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
    //언어
    c: 0,
    java: 0,
    cpp: 0,
    cs: 0,
    python: 0,
    javascript: 0,
    vb: 0,
    sqlLang: 0,
    //팀 키워드
    teamKeywords: [],
    createDate: now,
    updateDate: now,
});
const {currentFrontMember, currentBackMember,wantedFrontMember,wantedBackEndMember, title,detail,c,java,cpp,cs,python,javascript,vb,sqlLang,createDate, updateDate} = inputs;	//비구조화 할당

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
const onSubmitHandler = (e) => {
    fetch(`http://1871166.iptime.org:8080/teams/${teamId}/update`,{
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
  const marks = [
    {
      value: 0,
      label: '아예 못함',
    },
    {
        value: 50,
        label: '보통',
      },
    {
      value: 100,
      label: '아주잘함',
    },
  ];
  const editorRef = useRef();

  const DetailOnChange = () => {
    const data = editorRef.current.getInstance().getHTML();       
    const nextInputs = {
        ...inputs,
        detail : data
    };   
    setInputs(nextInputs);       
    console.log("디테일변경: ", nextInputs);
  };
 

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
                
                <div className="team-lang-box" style={{ display: 'flex', justifyContent: 'center' }}>                       
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        원하는 팀원의 언어 사용능력을 체크해주세요
                        <Box sx={{ width: 300 , height: 100 }}>C언어
                            <Slider aria-label="Custom marks" name ="c" value ={c} step={null} 
                            valueLabelDisplay="auto" marks={marks}onChange={onChange}/>
                        </Box>
                        <Box sx={{ width: 300 , height: 100 }}>Java
                            <Slider aria-label="Custom marks" name ="java" value ={java} step={null} 
                            valueLabelDisplay="a    uto" marks={marks}onChange={onChange}/>
                        </Box>
                        <Box sx={{ width: 300 , height: 100}}>C++
                            <Slider aria-label="Custom marks" name ="cpp" value ={cpp} step={null} 
                            valueLabelDisplay="auto" marks={marks}onChange={onChange}/>
                        </Box>
                        <Box sx={{ width: 300 , height: 100}}>Python
                            <Slider aria-label="Custom marks" name ="python" value ={python} step={null} 
                            valueLabelDisplay="auto" marks={marks}onChange={onChange}/>
                        </Box>
                        <Box sx={{ width: 300 , height: 100}}>C#
                            <Slider aria-label="Custom marks" name ="cs" value ={cs} step={null} 
                            valueLabelDisplay="auto" marks={marks}onChange={onChange}/>
                        </Box>
                        <Box sx={{ width: 300 }}>JavaScript
                            <Slider aria-label="Custom marks" name ="javascript" value ={javascript} step={null} 
                            valueLabelDisplay="auto" marks={marks}onChange={onChange}/>
                        </Box>
                        <Box sx={{ width: 300 , height: 100}}>Visual Basic
                            <Slider aria-label="Custom marks" name ="vb" value ={vb} step={null} 
                            valueLabelDisplay="auto" marks={marks}onChange={onChange}/>
                        </Box>
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
                <p>사용 DB</p>
                <Box sx={{ width: 300 }}>SQL
                    <Slider aria-label="Custom marks" name ="sqlLang" value ={sqlLang} step={null} 
                    valueLabelDisplay="auto" marks={marks}onChange={onChange}/>
                </Box>
                <button onClick={() => {
                  onSubmitHandler();
                  navigate(`/team/${teamId}`);;
                  }}>등록하기</button>
            </form>
            </div>
        </div>              
    );
}
export default EditTeam;