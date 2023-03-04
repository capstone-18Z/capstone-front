import "./index.css";
import { useState } from "react";

function TeamBuilding() {
    //현재 프론트, 백 팀원수 데이터 관리
    const [current_front_member, setfrontNumber] = useState(0);
    const [current_back_member, setbackNumber] = useState(0);
    //프로젝트 제목, 설명, 과목 데이터 관리
    const [title, setTitle]=useState("");
    const [project_explan, setProject_explan]= useState("");
    const [project_subject, setProject_subject]= useState("");
    //언어 점수 관리__
    
    const [c,setC] = useState(1);
    const [java,setJava] = useState(1);
    const [cpp,setCpp] = useState(1);
    const [cs, setCs] = useState(1);//c#임
    const [python,setPython] = useState(1);
    const [javascript,setJavascript] = useState(1);
    const [vb, setVb]=  useState(1);//비주얼베이직

    const today = new Date();
    const now = today.toLocaleTimeString();


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
    }
    const PostRequest = (e) => {
        e.preventDefault();
        console.log("막음");
    }
    const test = () => {
        console.log(+c+" "+java+" "+cpp+" "+python+" "+cs+" "+vb);
        console.log(now);
    }
  
 
    const onSubmitHandler = (e) => {
        fetch('http://1871166.iptime.org:8080/team/new',{
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
            body: JSON.stringify({
                title,
                detail : project_explan,
                currentFrontMember: current_front_member,
                currentBackMember: current_back_member,
                c,
                java,
                cpp,
                python,
                cs,
                vb,
                createDate : now,
                updateDate : now,
          }),
        });
      };
      //변수명 서버랑 똑같이 해야 보내짐

    return (
        <div className="teambuildingform">
            
            <h1>팀 빌딩 폼</h1>
            <form name="team-form" onSubmit={PostRequest}>
                <h2>프로젝트</h2>
                <p>제목<input type="text" value={title} onChange={(event)=>{
                    setTitle(event.target.value); }}/></p>    
                <p>한줄 설명<input type="text"  value={project_explan} onChange={(event)=>{
                    setProject_explan(event.target.value); }}/></p>
                <p>과목 <input type="text" value={project_subject} onChange={(event)=>{
                    setProject_subject(event.target.value); }}/></p>
                <p>언어</p>
                <p>C언어 <input name= 'C언어' type='range' min={0}
                max={5} step={1} value={c} onChange={(event) => {
                    setC(event.target.valueAsNumber);
                  }}/></p>
                <p>Java <input name= 'Java' type='range' min={0}
                max={5} step={1} value={java} onChange={(event) => {
                    setJava(event.target.valueAsNumber);
                  }} /></p>
                <p>C++ <input name= 'C++' type='range' min={0}
                max={5} step={1} value={cpp} onChange={(event) => {
                    setCpp(event.target.valueAsNumber);
                  }} /></p>
                <p>Python <input name= 'python' type='range' min={0}
                max={5} step={1} value={python} onChange={(event) => {
                    setPython(event.target.valueAsNumber);
                  }}/></p>
                <p>C# <input name= 'C#' type='range' min={0}
                max={5} step={1} value={cs} onChange={(event) => {
                    setCs(event.target.valueAsNumber);
                  }}/></p>
                <p>JavaScript <input name= 'JavaScript' type='range' min={0}
                max={5} step={1} value={javascript} onChange={(event) => {
                    setJavascript(event.target.valueAsNumber);
                  }}/></p>
                <p>Visual Basic <input name= 'Visual Basic' type='range' min={0}
                max={5} step={1} value={vb} onChange={(event) => {
                    setVb(event.target.valueAsNumber);
                  }}/></p>
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
                    <button onClick={addNumber}>+1</button>
                    {current_front_member}
                    <button onClick={minusNumber}>-1</button> 
                백
                    <button onClick={addbackNumber}>+1</button>
                    {current_back_member}
                    <button onClick={minusbackNumber}>-1</button>              
                    </p>
                <p>모집하는 팀원 수</p>
                <p>사용 DB <input type="text"/></p>
                <p>모집 기간</p>
                <p>내용 <textarea id="story" name="story"
                rows={5} cols={33}/></p>
                <button onClick={onSubmitHandler}>등록하기</button>
            </form>
        </div>              
    );
}
export default TeamBuilding;