import React, { useEffect } from 'react';
import { useState } from "react";
import { Card } from "../Card/card.js"
import {Link} from "react-router-dom";
import {useSearchParams} from "react-router-dom";
import { Pagination } from "@mui/material";
import "./team.css";

function Team() {
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    
    const [teamList, setTeamList] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const page_number = searchParams.get("page");
    
      
    useEffect(() => {                   
        fetch(`https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/teams?page=${page_number}`,{
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
            },      
        })
        .then((response) => response.json())        
        .then((obj) => {setTeamList(obj.data.allTeamList)
        console.log(obj); console.log(page_number)})
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
        <div className='team_list'>
            <Link to="/post/team">
                팀원 모집 하기
                    </Link>
            <p>팀원 모집중</p>
            {page_number}페이지임
            
            <div className="card-container">          
                {teamList && teamList.map(team => (
                    <div key={team.teamId} className="card_ryu" sx={{ ...cardStyle, ...mediaQueryStyle }}>                    
                        <Card team={team} />
                    </div>
                    ))}
            </div>
            <Pagination page={Number(searchParams.get("page"))} count={10} size="large" 
             onChange={(e, value) => {
                window.location.href = `/team?page=${value}`;
              }}
            />
            
        </div>
    );
            
}

export default Team;