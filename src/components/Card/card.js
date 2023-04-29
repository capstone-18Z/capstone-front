import {useNavigate} from "react-router-dom";
import { useState } from "react";
import "./card.css"


export const Card = (team) => {
  const navigate = useNavigate();
  const [data,setData]=useState(team);
  console.log("data",data.team);

  /*
  const currentDate = new Date();  
  const timeDiff =  currentDate.getTime() - data.team.updateDate.getTime();
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  //글을 작성한지 얼마나 지났는지 확인하기 위해 사용
  */

  return (
    <div className="card-wrapper" onClick={()   => {
       navigate(`/list/team/${data.team.teamId}`)
    }}> 
                    <div className="card-image">
                    {data.team.imagePaths.map(filename => (
                      <img src={`${filename}`} alt={filename} key={filename} style={{ width: "100%", height: "auto" }} />
                    ))}
                    </div>
                    <div className="card-body">
                    <h5 className="card-title">제목:{data.team.title}</h5>  
                    <h5 className="card-title">팀 빌딩 목적:{data.team.teamKeyword == null ? "없다" : data.team.teamKeyword.category}</h5>                    
                    <p className="card-text">역할 :{data.team.teamKeyword == null ? "없다" : data.team.teamKeyword.field} {data.team.wantTeamMemberCount}명 모집 {data.team.teamKeyword.sub.toUpperCase()}반</p>
                    <p className="card-text"><small className="text-muted">Last updated시간 전</small></p>
                    </div>
                
    </div>
  );
};