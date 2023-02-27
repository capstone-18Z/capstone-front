import "./index.css";
import { useState } from "react";

function Index() {
    //현재 프론트, 백 팀원수 관리
    const [frontnumber, setfrontNumber] = useState(0);
    const [backnumber, setbackNumber] = useState(0);
    //프로젝트 설명과 과목 관리
    const [project_explan, setProject_explan]= useState("");
    const [project_subject, setProject_subject]= useState("");
    //언어 점수 관리
    const [c,setC] = useState(1);
    const [java,setJava] = useState(1);
    const [cpp,setCpp] = useState(1);

    const addNumber = () =>{
        setfrontNumber(frontnumber+1);
    }
    const minusNumber = () =>{
        if(frontnumber>0){
            setfrontNumber(frontnumber-1);
        }    
    }
    const addbackNumber = () =>{
        setbackNumber(backnumber+1);
    }
    const minusbackNumber = () =>{
        if(backnumber>0){
            setbackNumber(backnumber-1);
        }    
    }
    const PostRequest = (e) => {
        e.preventDefault();
        console.log("막음");
    }
    const qwer =() =>{
        console.log(project_explan+"  "+project_subject,);
    }

    return (
        <div className="teambuildingform">
            <h1>팀 빌딩 폼</h1>
            <form name="team-form" onSubmit={PostRequest}>                
                <p>프로젝트 한줄 설명<input type="text" value={project_explan} onChange={(event)=>{
                    setProject_explan(event.target.value); }}/></p>
                <p>프로젝트 과목 <input type="text" value={project_subject} onChange={(event)=>{
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
                <p>C++ <input name= 'Java' type='range' min={0}
                max={5} step={1} value={cpp} onChange={(event) => {
                    setCpp(event.target.valueAsNumber);
                  }} /></p>
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
                    {frontnumber}
                    <button onClick={minusNumber}>-1</button> 
                백
                    <button onClick={addbackNumber}>+1</button>
                    {backnumber}
                    <button onClick={minusbackNumber}>-1</button>              
                    </p>
                <p>모집하는 팀원 수</p>
                <p>사용 DB <input type="text"/></p>
                <p>모집 기간</p>
                <p>내용 <textarea id="story" name="story"
                rows={5} cols={33}/></p>
                <button onClick={qwer}>등록하기</button>
            </form>
        </div>        
    );
}
export default Index;