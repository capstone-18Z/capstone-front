import React from 'react';
import { useState, useEffect } from 'react';
import { Card } from '../Card/card';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function InvitedTeamList() {
    const [invitedTeamList, setInvitedTeamList] = useState(null);
    const navigate = useNavigate();

    //로그인 토큰 저장
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    useEffect(() => {           
        fetch(`${process.env.REACT_APP_API_URL}/team-to-user/request-TeamToUser`,{                    
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
        fetch(`${process.env.REACT_APP_API_URL}/team-to-user/${matchId}/approve`,{
            method: 'POST',                    
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,
            } 
        })
        .then((response) => response.json())
        .then((obj) => {console.log(obj)});
    }
    const disagree =(matchId) => {
        fetch(`${process.env.REACT_APP_API_URL}/team-to-user/${matchId}/refuse`,{
            method: 'POST',                    
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,
            } 
        })
        .then((response) => response.json())
        .then((obj) => {console.log(obj)});
    }
    const goTeam = (link) => {
        navigate(`/list/team/${link}`);
    }

    return (
        <div>
           {invitedTeamList==null ?<div>팀요청이 없습니다.</div> : invitedTeamList.map(data => (
                <div key={data.data.teamId} className="card_ryu"> 
                    {data.data.title}에서 팀요청이 왔습니다!
                    <Button onClick={() => goTeam(data.data.teamId)}>해당 팀 보러 가기</Button>
                    <Button onClick={() => agree(data.matchId)}>수락</Button>
                    <Button onClick={() => disagree(data.matchId)}>거절</Button>
                </div>
            ))}
            
        </div>
    );
}

export default InvitedTeamList;