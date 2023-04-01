import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';

import RecommendUserList from '../RecommendUserList/recommendUserList';
import "./teamDetail.css"

function TeamDetail() {
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    const params = useParams();
    const teamId = params.teamId;
    const navigate = useNavigate();

    const [teamDetail, setTeamDetail] = useState({
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
        createDate: 0,
        updateDate: 0,
    });
    const {currentFrontMember, currentBackMember,wantedFrontMember,wantedBackEndMember, title,detail, project_subject, c,java,cpp,cs,python,javascript,vb,sqlLang,createDate, updateDate} = teamDetail;	//비구조화 할당
   
    useEffect(() => {                 
        fetch(`https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/teams/${teamId}`,{     
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,
            } 
    })
    .then((response) => response.json())        
    .then((obj) => {setTeamDetail(obj.data.team); console.log(obj)});
}, []);

    return (
        <div className="teamdetail">
            <div className="teamdetail_head">
                <div className="teamdetail_head">
                    <div className="title">제목: {title}</div>                    
                </div>                
            </div>
            <div className="teamdetail_summary">
                <div className="summary">     
                내용:         
                <div dangerouslySetInnerHTML={{ __html: detail }} />
                </div>
                
            </div>
            <div className="teamdetail_recommenduserlist">
                <RecommendUserList teamId={teamId}/>
            </div>
            <div className="teamdetail_bottom">
                    <button onClick={() =>{ 
                        navigate(`/team/${teamId}/editTeam`)                    
                    }}>        
                    수정하기</button>
                    <button onClick={() =>{
                        fetch(`https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/teams/${teamId}/delete`,{
                            method: 'POST',
                            headers: {
                                'refresh-token': refresh_token,
                                'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
                            }           
                        })
                        .then(navigate(`/team`))
                    }}>        
                    삭제하기</button>

                    
            </div>
        </div>
    );
}

export default TeamDetail;