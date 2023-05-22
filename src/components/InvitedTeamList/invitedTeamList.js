import React from "react";
import { useState, useEffect } from "react";
import { Card } from "../Card/card";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MyTeamCard } from "../UserTeams/myTeamCard";
function InvitedTeamList() {
  const [invitedTeamList, setInvitedTeamList] = useState(null);
  const navigate = useNavigate();

  //로그인 토큰 저장
  const refresh_token = localStorage.getItem("refresh-token");
  const login_token = localStorage.getItem("login-token");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/team-to-user/request-TeamToUser`, {
      headers: {
        "refresh-token": refresh_token,
        "login-token": login_token,
      },
    })
      .then((response) => response.json())
      .then((obj) => {
        setInvitedTeamList(obj.data);
        console.log(obj);
      });
  }, []);

  const agree = (matchId) => {
    fetch(`${process.env.REACT_APP_API_URL}/team-to-user/${matchId}/approve`, {
      method: "POST",
      headers: {
        "refresh-token": refresh_token,
        "login-token": login_token,
      },
    })
      .then((response) => response.json())
      .then((obj) => {
        console.log(obj);
      });
  };
  const disagree = (matchId) => {
    fetch(`${process.env.REACT_APP_API_URL}/team-to-user/${matchId}/refuse`, {
      method: "POST",
      headers: {
        "refresh-token": refresh_token,
        "login-token": login_token,
      },
    })
      .then((response) => response.json())
      .then((obj) => {
        console.log(obj);
      });
  };
  const goTeam = (link) => {
    navigate(`/list/team/${link}`);
  };

  return (
    <div>
      {invitedTeamList == null ? (
        <div>팀요청이 없습니다.</div>
      ) : (
        invitedTeamList.map((data) => {
            console.log("Data",data)
            return(<div key={data.data.teamId} className="joined-team-card-ryu">
            <MyTeamCard team={data.data} />
            <div className="joinedTeam-card-bottom">
              <button className="chatBtn">
                채팅
              </button>
              <button className="invite-approve-Btn" onClick={()=>agree(data.matchId)}>수락</button>
              <button className="invite-refuse-Btn" onClick={()=>disagree(data.matchId)}>거절</button>
            </div>
          </div>);
        })
      )}
    </div>
  );
}

export default InvitedTeamList;
