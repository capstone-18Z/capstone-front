import React, { useEffect } from 'react';
import { useState } from "react";
import RadarChart from './radarChart';
import { Button } from '@mui/material';
import axios from 'axios';

function RecommendUserList({team}) {
    const [userList, setUserList] = useState(null);
     //로그인 토큰 저장
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    useEffect(() => {           
            fetch(`${process.env.REACT_APP_API_URL}/teams/${team.teamId}/recommend`,{   
                method: 'POST',  
                headers: {
                    'refresh-token': refresh_token,
                    'login-token': login_token,
                } 
        })
        .then((response) => response.json())        
        .then((obj) => {setUserList(obj.data)
        console.log(obj)});
    }, []);

    const jointeam = (Id) => {
        axios
          .post(`${process.env.REACT_APP_API_URL}/team-to-user/${team.teamId}/match-request`, {
            userId: Id,
          })
          .then((response) => {
            console.log(response);
            if (response.data) {
              alert("요청 완료");
            }
          })
          .catch((err) => {
            console.log(err.response);
            alert(err.response.data.message);
          });
      };

   
    return (
        <div>
            <p>추천 유저</p>            
            {userList && userList.map(data =>(
            <div key={data.id}>                
                <h2>닉네임: {data.nickname}</h2>
                <p>이메일: {data.email}</p>
                <RadarChart teamdata={team} memberdata={data}/>
                <Button variant="contained" sx={{ width: "500px" }} onClick={() => jointeam(data.id)}> {data.id}팀원 요청 보내기</Button>         
            </div>
                ))}
        </div>
    );
}

export default RecommendUserList;