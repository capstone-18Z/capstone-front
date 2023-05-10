import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function AppliedTeamList() {
    const [appliedTeamsList, setAppliedTeamsList] = useState(null);
    const navigate = useNavigate();

    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    useEffect(() => {           
        fetch(`${process.env.REACT_APP_API_URL}/user-to-team/all-my-request`,{                    
                headers: {
                    'refresh-token': refresh_token,
                    'login-token': login_token,
                } 
        })
        .then((response) => response.json())        
        .then((obj) => {setAppliedTeamsList(obj.data);
        console.log(obj)});
    }, []);

    const goTeam = (link) => {
        navigate(`/list/team/${link}`);
    }

    return (
        <div>
            {appliedTeamsList==null ?<div>지원한 팀이 없습니다.</div> : appliedTeamsList.map(data => (
                <div key={data.id} className="card_ryu"> 
                    {data.info.title}에 팀요청을 넣었습니다.
                    <button
          onClick={() => {
            const chatWindow = window.open(
              `/chat?userId=${localStorage.getItem("userId")}&waitingId=${data.id}&nickname=${localStorage.getItem("nickname")}&teamLeader=${data.info.teamLeader}&mode=team`,
              "",
              "width=450,height=650"
            );

            chatWindow.addEventListener("load", () => {
              const style = document.createElement("style");
              style.innerHTML = `
              /* 원하는 스타일 추가 */
              body {
                background-color: #f2f2f2;
              }
              /* 스크롤바 숨기기 */
              ::-webkit-scrollbar {
                display: none;
              }
            `;
              chatWindow.document.head.appendChild(style);

              // 오른쪽으로 100px 이동하고 아래로 200px 이동
              chatWindow.moveTo(100, 200);
            });
          }}
        >
          채팅
        </button>
    
                    <Button onClick={() => goTeam(data.info.teamId)}>해당 팀 보러 가기</Button>                    
                    <Button>취소하기</Button>
                </div>
            ))}
        </div>
    );
}

export default AppliedTeamList;