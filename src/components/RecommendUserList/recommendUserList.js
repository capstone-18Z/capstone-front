import React, { useEffect } from 'react';
import { useState } from "react";
import RadarChart from './radarChart';
import { Button } from '@mui/material';

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

    function jointeam(Id) {
        fetch(`${process.env.REACT_APP_API_URL}/${team.teamId}/match-request`,{   
            method: 'POST',           
            headers: {
                'Content-Type': 'application/json',
                'refresh-token': refresh_token,
                'login-token': login_token,
            },
            body: JSON.stringify({
                userId: Id,
            }),
        }).then((response) => {
            if (response.ok) {
              return response.json();              
            } else {
              throw new Error('Network response was not ok.');
            }
          })
          .then((data) => {
            console.log(data);
            alert(data.message);
          })
          .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
            alert(error.message);
          })
    }
   
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