import React, { useEffect } from 'react';

import { useState } from "react";

function RecommendUserList({teamId}) {
    const [userList, setUserList] = useState(null);
     //로그인 토큰 저장
     const refresh_token = localStorage.getItem("refresh-token");
     const login_token = localStorage.getItem("login-token");
    useEffect(() => {           
            fetch(`${process.env.REACT_APP_API_URL}/teams/${teamId}`,{     
                headers: {
                    'refresh-token': refresh_token,
                    'login-token': login_token,
                } 
        })
        .then((response) => response.json())        
        .then((obj) => {setUserList(obj.data.recommendList)
        console.log(obj)});
    }, []);


    
            

    return (
        <div>
              <p>추천 유저</p>   
            {userList && userList.map(data =>(
            <div key={data.id}>
                <h2>닉네임: {data.nickname}</h2>
                <p>이메일: {data.email}</p>
                <p>팀원 요청 보내기</p>                
            </div>
                ))}
    
                   
        </div>
    );
}

export default RecommendUserList;