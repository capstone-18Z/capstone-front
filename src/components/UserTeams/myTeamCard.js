import {useNavigate} from "react-router-dom";
import { useState } from "react";
import "./myTeamCard.css"

export const MyTeamCard = (team) => {
    const navigate = useNavigate();
    const [data,setData]=useState(team);
    
    const langArr = Object.keys(team.team.teamLanguage).filter(key => key !== 'id' && team.team.teamLanguage[key] !== 0);
    const frameworkArr = Object.keys(team.team.teamFramework).filter(key => key !== 'id' && team.team.teamFramework[key] !== 0);
    const dbArr = Object.keys(team.team.teamDatabase).filter(key => key !== 'id' && team.team.teamDatabase[key] !== 0);
    
    const combinedArr = langArr.concat(frameworkArr, dbArr);  
    return (
      <div className="myTeam-card-wrapper" onClick={()   => {
         navigate(`/list/team/${data.team.teamId}`)
      }}> 
                      <div className="myTeam-card-image">
                      {data.team.imagePaths.map(filename => (
                        <img src={`${filename}`} alt={filename} key={filename}/>
                      ))}
                      </div>
                      <hr/>
                      <div className="myTeam-card-body">
                      <h5 className="myTeam-card-text">{data.team.title}</h5> 
                      </div>
                      <div className="myTeam-card-body">
                      <h5 className="myTeam-card-text">{data.team.teamKeyword == null ? "미확인" :`${data.team.teamKeyword.category} / ${data.team.teamKeyword.field}`}
                      {data.team.teamKeyword.sub=="none" ? null: ` ${data.team.teamKeyword.sub.toUpperCase()}반`} </h5>
                      <h5 className="myTeam-card-text">{`${data.team.wantTeamMemberCount}명 모집 `}</h5>
                      </div>
      </div>
    );
  };