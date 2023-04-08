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
        fetch('http://1871166.iptime.org:8080/teams',{
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
            },      
        })
        .then((response) => response.json())        
        .then((obj) => {setTeamList(obj.data.allTeamList)
        console.log(obj)})
    }, []);
    
    //삭제할때 teams/{team.id}/delete 이렇게 post로 보내면 삭제됨
    //``역따음표 사이에 값넣기
    
    const cardStyle = {
        width: '25%',
        minWidth: 200,
        height: 200,
      };
      
      const mediaQueryStyle = {
        '@media (max-width: 768px)': {
          width: '25%',
          minWidth: 200,
        },
      };

    return (
        <div>
            <Link to="/post/team">
                팀원 모집 하기
                    </Link>
            <p>팀원 모집중</p>
            
            <div className="card-container">          
                {teamList && teamList.map(data => (
                <div key={data.teamId} className="card" sx={{ ...cardStyle, ...mediaQueryStyle }}>
                    
                    <Card team={data} />
                </div>
                ))}
            </div>
            
        </div>
    );
            
}

export default Team;