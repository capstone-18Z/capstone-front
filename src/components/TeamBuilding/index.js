import "./index.css";
import { useState } from "react";
import { TextField, Slider, Box, Button } from "@mui/material";

function TeamBuilding() {
    const [inputs, setInputs] = useState({
        //프로젝트 제목, 설명, 과목 데이터 관리
        title: "",
        project_explan: "",
        project_subject: "",
        //현재 프론트, 백 팀원수 데이터 관리
        current_front_member: 0,
        current_back_member:0,
        //언어 점수 관리
        c:0,
        java:0,
        cpp:0,
        cs:0,
        python:0,
        javascript:0,
        vb:0,
    });
    const {current_front_member, current_back_member, title,project_explan, project_subject, c,java,cpp,cs,python,javascript,vb } = inputs;	//비구조화 할당
   
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
      };    
       
    //유저가 글쓰는 날짜 시간 저장 
    const today = new Date();
    const now = today.toLocaleTimeString(); 

/*
    const addNumber = () =>{
        setfrontNumber(current_front_member+1);
    }
    const minusNumber = () =>{
        if(current_front_member>0){
            setfrontNumber(current_front_member-1);
        }    
    }
    const addbackNumber = () =>{
        setbackNumber(current_back_member+1);
    }
    const minusbackNumber = () =>{
        if(current_back_member>0){
            setbackNumber(current_back_member-1);
        }    
    }  */
   
   

    const PostRequest = (e) => {
        e.preventDefault();
        console.log("막음");
    }
    const onSubmitHandler = (e) => {
        fetch('http://1871166.iptime.org:8080/team/new',{
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
            body: JSON.stringify(
                inputs
                /*
                title,
                detail : project_explan,
                currentFrontMember: current_front_member,
                currentBackMember: current_back_member,
               
                createDate : now,
                updateDate : now,
                 */
          ),
        });
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
                    value={project_explan}
                    name="project_explan"
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
                    <input type="checkbox" id="btn1" name="checkWrap" value="웹공학트랙" />
                    <label htmlFor="btn1">웹공학트랙</label>
                    <input type="checkbox" id="btn2" name="checkWrap" value="모바일트랙" />
                    <label htmlFor="btn2">모바일트랙</label>
                    <input type="checkbox" id="btn3" name="checkWrap" value="빅데이터트랙" />
                    <label htmlFor="btn3">빅데이터트랙</label>
                    <input type="checkbox" id="btn4" name="checkWrap" value="디지털콘텐츠트랙" />
                    <label htmlFor="btn4">디지털콘텐츠트랙</label>
                <p>현재 팀원 수:  프론트  
                <Button variant="outlined">-1</Button>
                    {current_front_member}
                <Button variant="outlined">+1</Button>
                백
                    {current_back_member}            
                    </p>
                <p>모집하는 팀원 수</p>
                <p>사용 DB <input type="text"/></p>
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