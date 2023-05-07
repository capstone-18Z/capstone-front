import {useNavigate} from "react-router-dom";
import { useState } from "react";
import "./contestCard.css"


export const ContestCard = (contest) => {
  const navigate = useNavigate();
  const [data,setData]=useState(contest);
  
  
  //const langArr = Object.keys(contest.contest.teamLanguage).filter(key => key !== 'id' && team.team.teamLanguage[key] !== 0);
  //const frameworkArr = Object.keys(team.team.teamFramework).filter(key => key !== 'id' && team.team.teamFramework[key] !== 0);
  //const dbArr = Object.keys(team.team.teamDatabase).filter(key => key !== 'id' && team.team.teamDatabase[key] !== 0);
  
  return (
    <div className="contest-card-wrapper" onClick={() => {
        window.open(`${data.contest.url}`, "_blank");
    }}> 
                    <div className="contest-card-image">
                      <img src={`${data.contest.imgUrl}`} alt={data.contest.imgUrl} key={data.contest.imgUrl} style={{ width: "80%", height: "auto" }} />
                    </div>
                    <div className="contest-card-body">
                    <h5 className="contest-card-title">제목:{data.contest.title} </h5>
                    {data.contest.dday && <p className="contest-card-day">{data.contest.dday}</p>}
                    {data.contest.state && <p className="contest-card-day">{data.contest.state} </p>}
                    {data.contest.period && <p className="contest-card-text">접수 : {data.contest.period}</p>}
                    {data.contest.auditDate && <p className="contest-card-text">심사 : {data.contest.auditDate}</p>}
                    {data.contest.releaseDate && <p className="contest-card-text">발표 : {data.contest.releaseDate}</p>}
                    <p className="contest-card-text">주최 :{data.contest.host} </p>
                    <p className="contest-card-text">대상 :{data.contest.target} </p>
                    </div>
                
    </div>
  );
};