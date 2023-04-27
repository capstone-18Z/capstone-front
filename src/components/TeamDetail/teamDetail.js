import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import {Button, TextField, Radio,RadioGroup, FormControlLabel} from '@mui/material';

import RecommendUserList from '../RecommendUserList/recommendUserList';
import "./teamDetail.css"

function TeamDetail() {
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    const params = useParams();
    const teamId = params.teamId;
    const navigate = useNavigate();
    const [updatable, setUpdatable] = useState(false);

    const [teamDetail, setTeamDetail] = useState({
        //프로젝트 제목, 설명, 과목 데이터 관리
        title: "",
        detail: "",
        project_subject: "",
        //현재 프론트, 백 팀원수 데이터 관리
        currentTeamMemberCount: 0,
        //모집 프론트, 백 팀원수 데이터 관리
        wantTeamMemberCount: 0,
        //언어 점수 관리
        c:0,
        java:0,
        cpp:0,
        cs:0,
        python:0,
        javascript:0,
        vb:0,
        sqlLang:0,
        createDate: 0,
        updateDate: 0,
    });
    const {currentTeamMemberCount, wantTeamMemberCount, title,detail, project_subject, c,java,cpp,cs,python,javascript,vb,sqlLang,createDate, updateDate} = teamDetail;	//비구조화 할당
   
    const [inputs, setInputs] = useState({
        input_detail: "",
        input_field: 0, //프론트 1 백 2 상관없음 3 선택하는 이렇게 해서 서버에 보냄
    });
    const {input_detail, input_field} = inputs;

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

    const Putinputs = () => {
        fetch(`http://localhost:8080/user-to-team/${teamId}/add`,{
            method: 'POST',
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                detail : inputs.input_detail,
                field : inputs.input_field,
                //백프론트 선택이랑 detail은 간단한 설명
            }),         
        })
        .then((response) => response.json())
        .then((obj) => alert(obj.message))
    }

    useEffect(() => {                 
        fetch(`http://localhost:8080/teams/${teamId}`,{     
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,
            } 
    })
    .then((response) => response.json())        
    .then((obj) => {setTeamDetail(obj.data); setUpdatable(obj.updatable); console.log(obj)});
    }, []);

    return (
        <div className="teamdetail">
            <div className="teamdetail_head">
                <div className="teamdetail_head">
                    <div className="title"><h1>제목: {title}</h1></div>                    
                </div>                
            </div>
            <div className="teamdetail_summary">
                <div className="summary">     
                내용:         
                <div dangerouslySetInnerHTML={{ __html: detail }} />
                </div>
                <div className="team_member">
                현재 인원: {currentTeamMemberCount} 
                모집 인원: {wantTeamMemberCount}
                </div>
            </div>
            <div className="teamdetail_recommenduserlist">
                <RecommendUserList teamId={teamId}/>
            </div>
            {(updatable?
            <div className="teamdetail_bottom">
                <button onClick={() =>{ 
                    navigate(`/team/${teamId}/editTeam`)                    
                }}>        
                수정하기</button>

                <button onClick={() =>{
                    fetch(`http://localhost:8080/teams/${teamId}/delete`,{
                        method: 'POST',
                        headers: {
                            'refresh-token': refresh_token,
                            'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
                        }           
                    })
                    .then((response) => response.json())
                    .then((obj)=>alert(obj.message))
                    .then(()=>navigate(`/team`))
                }}>        
                삭제하기</button>                   
            </div>  
                :
                
                <div className="teamdetail_bottom">
                    <details >
                        <summary>팀원 신청 하기</summary>
                        간단한 자기 어필:
                        <TextField sx={{ width: { sm: 650 }, marginBottom: '16px' }} variant="standard" value={input_detail} name="input_detail" onChange={onChange} />
                        <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={input_field ?? 0} //?? 0 으로 null일때 0 설정 안돌아가지는 않는데 오류가떠서 구글참고해서 고침
                        name="input_field"
                        onChange={onChange}
                        row>   
                            <FormControlLabel value="1" control={<Radio />} label="프론트엔드" />
                            <FormControlLabel value="2" control={<Radio />} label="백엔드" />
                            <FormControlLabel value="3" control={<Radio />} label="상관없음" />
                        </RadioGroup>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <Button variant="contained" onClick={Putinputs}>신청 보내기</Button>  
                        </div>
                </details>               
            </div>

                )}
            
        </div>
    );
}

export default TeamDetail;