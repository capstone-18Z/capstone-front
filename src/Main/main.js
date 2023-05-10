import React, { useEffect } from 'react';
import { MainTeamCard } from "./mainTeamCard"
import { MainMemberCard } from "./mainMemberCard"
import { useState } from "react";
import "./main.css";

function Main(){
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    
    const [teamList, setTeamList] = useState(null);
    const [memberList, setMemberList] = useState(null);

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

      useEffect(() => {
        Promise.all([
          fetch(`${process.env.REACT_APP_API_URL}/teams/main`, {
            headers: {
              'refresh-token': refresh_token,
              'login-token': login_token,
            },
          }),
          fetch(`${process.env.REACT_APP_API_URL}/member/main`, {
            headers: {
              'refresh-token': refresh_token,
              'login-token': login_token,
            },
          }),
        ])
        .then(([teamResponse, memberResponse]) => Promise.all([teamResponse.json(), memberResponse.json()]))
        .then(([teamObj, memberObj]) => {
          setTeamList(teamObj.data);
          setMemberList(memberObj.data);
          console.log(teamObj, memberObj);
        })
      }, []);
      
    

    return(
        <div>
            <div className='main_introduce'>
                <p className='introduce_first'>
                    나만의 맞춤형 팀 빌딩 서비스
                </p>
                <p className='introduce_second'>    
                    한성 메이팅
                </p>
            </div>
            <div className='main_body'>
              <p>
                  가장 최근 팀이에요!
              </p>
              <a href='/list/team?page=1'>팀 확인하기 </a>
              <div className='main_team'>
                  {teamList && teamList.map(team => (
                          <div key={team.teamId} className="main_card_team" sx={{ ...cardStyle, ...mediaQueryStyle }}>                    
                              <MainTeamCard team={team} />
                          </div>
                  ))}
              </div>
            </div>
            <div className='main_body'>
              <p>
                  이런 개발자는 어떠세요?
              </p>
              <a href='/list/members?page=1'>유저 찾아보기 </a>
              <div className='main_team'>
                  {memberList && memberList.map(member => (
                          <div key={member.id} className="main_card_team" sx={{ ...cardStyle, ...mediaQueryStyle }}>                    
                              <MainMemberCard member={member} />
                          </div>
                  ))}
              </div>
            </div>

        </div>
    )
}

export default Main;