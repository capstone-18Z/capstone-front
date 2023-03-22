import React from 'react';
import {useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';

function TeamDetail() {
    const login_token = localStorage.getItem("login-token");
    const params = useParams();
    const teamId = params.teamId;
    const navigate = useNavigate();
    return (
        <div>
            Details about team {teamId}
                    <button onClick={() =>{                     
                    }}>        
                    수정하기</button>
                    <button onClick={() =>{
                        fetch(`https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/teams/${teamId}/delete`,{
                            method: 'POST',
                            headers: {
                                'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
                            }           
                        })
                        .then(navigate(`/main`))
                    }}>        
                    삭제하기</button>

                    <button onClick={() =>{
                        navigate(`../recommendUserList`)               
                    }}>        
                    추천 유저 목록 띄우기</button>
        </div>
    );
}

export default TeamDetail;