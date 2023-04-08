import React from 'react';
import "./mypagelist.css";
const BASE_URL = "http://1871166.iptime.org:8080";

function MyPageList(request) {
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    console.log(request.request)
    return (
        <div className='MyPageList_profile' key={request.waitingId}> 
            팀원 요청 관리
            <div className='profile_image'></div>
            <div className='profile_name'>팀원 아이디입니다 :{request.request.userId}</div>
            <div className='profile_detail'>자기 소개입니다 :{request.request.detail}</div>
            <div className='profile_field'></div>
            <button onClick={ ()=> (
                            fetch(`${BASE_URL}/user-to-team/${request.request.waitingId}/approve`,{   
                                method: 'POST',  
                                headers: {
                                    'refresh-token': refresh_token,
                                    'login-token': login_token,
                                }                                
                            })                            
                            .then((response) => response.json())
                            .then((obj)=>alert(obj.message))
                            .then(window.location.reload())
                        )}>수락하기</button>
        </div>
    );
}

export default MyPageList;