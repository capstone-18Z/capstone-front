import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { MyTeamCard } from "./myTeamCard"
import { useNavigate } from 'react-router-dom';

function JoinedTeam(){
  const refresh_token = localStorage.getItem("refresh-token");
  const login_token = localStorage.getItem("login-token");
  const navigate = useNavigate();

  const [joinedTeams, setJoinedTeams] = useState([]); 
  useEffect(() => {           
    fetch(`${process.env.REACT_APP_API_URL}/teams/allMyTeams`, {
      headers: {
        "refresh-token": refresh_token,
        "login-token": login_token,
      },
    })
      .then((response) => response.json())
      .then((obj) => {
        console.log(obj);
        setJoinedTeams(obj.data);
      });
}, []);
  
    const 팀나가기=(teamId)=>{
        fetch(`${process.env.REACT_APP_API_URL}/teams/deleteMember?teamId=${teamId}&userId=${localStorage.getItem("userId")}`, {
          method:"POST",  
          headers: {
              
              "refresh-token": refresh_token,
              "login-token": login_token,
            },
          })
            .then((response) => response.json())
            .then((obj) => {
              console.log(obj);
              alert(obj.message);
              setJoinedTeams(joinedTeams.filter(data=>{
                return data.teamId!=teamId
            }))
      });
    }
    const goTeam = (link) => {
      navigate(`/list/team/${link}`);
  }
    
    return(
        <div>
            {joinedTeams==null ?<div>소속된 팀이 없습니다.</div> : joinedTeams.map(data => (
                <div key={data.teamId} className="card_ryu" style={{marginBottom: "5px", marginTop: "5px"}}> 
                    <MyTeamCard team={data} />
                    <Button onClick={() => goTeam(data.teamId)}>해당 팀 보러 가기</Button>                    
                    <Button onClick={() => 팀나가기(data.teamId)}>팀나가기</Button>
                </div>
            ))}
        </div>
    );
}
export default JoinedTeam;