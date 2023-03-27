import "./index.css";
import { useState } from "react";
import { TextField, Slider, Box, Button, Checkbox, FormGroup ,FormControlLabel, Select, MenuItem  } from "@mui/material";

function TeamBuilding() {
    //로그인 토큰 저장
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    //유저가 글쓰는 날짜 시간 저장 
    const today = new Date();
    const time = today.toLocaleTimeString(); 
    const date = today.toLocaleDateString();
    const now = date+time;
  
    const [inputs, setInputs] = useState({
        //프로젝트 제목, 설명, 과목 데이터 관리
        title: "",
        detail: "",
        project_subject: "",
        //현재 프론트, 백 팀원수 데이터 관리
        currentFrontMember: 0,
        currentBackMember:0,
        //모집 프론트, 백 팀원수 데이터 관리
        wantedFrontMember: 0,
        wantedBackEndMember: 0,
        //언어 점수 관리
        c:0,
        java:0,
        cpp:0,
        cs:0,
        python:0,
        javascript:0,
        vb:0,
        sqlLang:0,
        createDate: now,
        updateDate: now,
    });
    const {currentFrontMember, currentBackMember,wantedFrontMember,wantedBackEndMember, title,detail, project_subject, c,java,cpp,cs,python,javascript,vb,sqlLang,createDate, updateDate} = inputs;	//비구조화 할당
   
    const onChange = (e) => {
        const {name, value} = e.target;
        const nextInputs = {
            //spread 문법. 현재 상태의 내용이 이 자리로 온다. 
            ...inputs,
            [name] : value,
        };
        //객체를 새로운 상태로 쓰겠다. 
        setInputs(nextInputs);
    };
    const test = () => {
        console.log(inputs);
        console.log(now);
      };   

    const PostRequest = (e) => {
        e.preventDefault();
        console.log("막음");
    }
    const onSubmitHandler = (e) => {
        //fetch('https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/teams/new',{
        fetch('https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/teams/new',{
          method: 'POST',
          headers: {
            'refresh-token': refresh_token,
            'login-token': login_token,
            'Content-Type' : 'application/json',
          },
            body: JSON.stringify(
                inputs
          ),
        })
        .then((response) => response.json())        
        .then((obj) => 
        console.log(obj));
        
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

    return (
        <div className="teambuildingform">
            
            <h1>팀 빌딩 폼</h1>
            <form name="team-form" onSubmit={PostRequest}>
                <h2>프로젝트</h2>
                <p>
                <TextField                 
                    required
                    label="프로젝트 제목"
                    value={title}
                    name="title"
                    variant="standard"
                    onChange={onChange}
                />
                </p>          
                <p>
                <TextField                 
                    required
                    label="프로젝트 한줄 설명"
                    value={detail}
                    name="detail"
                    variant="standard"
                    onChange={onChange}
                />
                </p>
                <p>
                <TextField                 
                    required
                    label="프로젝트 과목"
                    value={project_subject}
                    name="project_subject"
                    variant="standard"
                    onChange={onChange}
                />
                </p>
                <p>언어</p>
                <p>C언어 <Box sx={{ width: 300 }}>
                    <Slider aria-label="Custom marks" name ="c" value ={c} step={null} 
                    valueLabelDisplay="auto" marks={marks}onChange={onChange}/>
                </Box></p>
                <p>Java<Box sx={{ width: 300 }}>
                    <Slider aria-label="Custom marks" name ="java" value ={java} step={null} 
                    valueLabelDisplay="auto" marks={marks}onChange={onChange}/>
                </Box></p>
                <p>C++<Box sx={{ width: 300 }}>
                    <Slider aria-label="Custom marks" name ="cpp" value ={cpp} step={null} 
                    valueLabelDisplay="auto" marks={marks}onChange={onChange}/>
                </Box></p>
                <p>Python<Box sx={{ width: 300 }}>
                    <Slider aria-label="Custom marks" name ="python" value ={python} step={null} 
                    valueLabelDisplay="auto" marks={marks}onChange={onChange}/>
                </Box></p>
                <p>C#<Box sx={{ width: 300 }}>
                    <Slider aria-label="Custom marks" name ="cs" value ={cs} step={null} 
                    valueLabelDisplay="auto" marks={marks}onChange={onChange}/>
                </Box></p>
                <p>JavaScript<Box sx={{ width: 300 }}>
                    <Slider aria-label="Custom marks" name ="javascript" value ={javascript} step={null} 
                    valueLabelDisplay="auto" marks={marks}onChange={onChange}/>
                </Box></p>
                <p>Visual Basic<Box sx={{ width: 300 }}>
                    <Slider aria-label="Custom marks" name ="vb" value ={vb} step={null} 
                    valueLabelDisplay="auto" marks={marks}onChange={onChange}/>
                </Box></p>
                <p>선호트랙</p>
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} value label="웹공학트랙" />                
                </FormGroup>
                    <input type="checkbox" id="btn1" name="checkWrap" value="웹공학트랙" />
                    <label htmlFor="btn1">웹공학트랙</label>
                    <input type="checkbox" id="btn2" name="checkWrap" value="모바일트랙" />
                    <label htmlFor="btn2">모바일트랙</label>
                    <input type="checkbox" id="btn3" name="checkWrap" value="빅데이터트랙" />
                    <label htmlFor="btn3">빅데이터트랙</label>
                    <input type="checkbox" id="btn4" name="checkWrap" value="디지털콘텐츠트랙" />
                    <label htmlFor="btn4">디지털콘텐츠트랙</label>
                <p>현재 팀원 수</p>
                프론트
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
                백
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
                프론트 : 
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
                백 : 
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
                <p>사용 DB
                SQL: <Box sx={{ width: 300 }}>
                    <Slider aria-label="Custom marks" name ="sqlLang" value ={sqlLang} step={null} 
                    valueLabelDisplay="auto" marks={marks}onChange={onChange}/>
                </Box></p>
                <p>모집 기간</p>
                <p>내용 <textarea id="story" name="story"
                rows={5} cols={33}/></p>
                <button onClick={() => {
                  onSubmitHandler();
                  test();
                  }}>등록하기</button>
            </form>
        </div>              
    );
}


export default TeamBuilding;