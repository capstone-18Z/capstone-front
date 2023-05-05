import React from 'react';
import { useState, useEffect } from 'react';
import { Card } from '../Card/card';
import { Button } from '@mui/material';

function InvitedTeamList() {
    const [invitedTeamList, setInvitedTeamList] = useState(null);

    //로그인 토큰 저장
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    useEffect(() => {           
        fetch(`${process.env.REACT_APP_API_URL}/request-TeamToUser`,{                    
                headers: {
                    'refresh-token': refresh_token,
                    'login-token': login_token,
                } 
        })
        .then((response) => response.json())        
        .then((obj) => {setInvitedTeamList(obj.data);
        console.log(obj)});
    }, []);

    const agree =(matchId) => {
        fetch(`${process.env.REACT_APP_API_URL}/${matchId}/approve`,{
            method: 'POST',                    
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,
            } 
        })
        .then((response) => response.json())
        .then((obj) => {console.log(obj)});
    }

    return (
        <div>
            반갑습니다.
           {invitedTeamList==null ?null : invitedTeamList.map(data => (
                <div key={data.data.teamId} className="card_ryu">                    
                    {data.data.teamId}
                    <Button onClick={() => agree(data.matchId)}>수락</Button>
                    <Button>거절</Button>
                </div>
            ))}
            
        </div>
    );
}

export default InvitedTeamList;