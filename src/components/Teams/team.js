import React, { useEffect } from 'react';
import { useState } from "react";
import { Card } from "../Card/card.js"
import {Link} from "react-router-dom";
import "./team.css";

function Team() {
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    
    const [teamList, setTeamList] = useState(null);
    
    useEffect(() => {
        
        //fetch(https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/teams',{            
        fetch('https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/teams',{
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
            }              
        })
        .then((response) => response.json())        
        .then((obj) => {setTeamList(obj.data.allTeamList)
        console.log(obj)});
    }, []);
    
    //삭제할때 teams/{team.id}/delete 이렇게 post로 보내면 삭제됨
    //``역따음표 사이에 값넣기
    
            

    return (
        <div>
            <Link to="/post/team">
                팀원 모집 하기
                    </Link>
            <p>팀원 모집중</p>
            
            
            {teamList && teamList.map(data =>(
                
                <div class="row row-cols-1 row-cols-md-3 g-4">
                <div class="col">
                    
                    <Card teamId={data.teamId} title={data.title} detail={data.detail}
                    currentFrontMember={data.currentFrontMember} currentBackMember={data.currentBackMember} 
                    wantedFrontMember={data.wantedFrontMember} wantedBackEndMember={data.wantedBackEndMember}
                    />                                 
                </div>
                </div>
                
            ))}
            
        </div>
    );
            
}

export default Team;