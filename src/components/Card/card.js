import {useNavigate} from "react-router-dom";
import { useState } from "react";
import "./card.css"
const BASE_URL ='https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app';

export const Card = (team) => {
  const navigate = useNavigate();
  const [data,setData]=useState(team);
  console.log("data",data.team);
  console.log(team);
  return (
    <div className="card-wrapper" onClick={()   => {
      navigate(`/team/${data.team.teamId}`)
    }}>
      
                    <div className="card-image">
                    {data.team.imagePaths.map(filename => (
                      <img src={`${filename}`} alt={filename} key={filename} style={{ width: "100%", height: "auto" }} />
                    ))}
                    </div>
                    <div className="card-body">
                    <h5 className="card-title">{data.team.title}</h5>
                    <p className="card-text">{data.team.detail}</p>
                    <p className="card-text">현재 팀원 수: 프론트엔드{data.team.currentFrontMember} 백엔드{data.team.currentBackMember}</p>
                    <p className="card-text">현재 구하는 팀원 수: 프론트엔드{data.team.wantedFrontMember} 백엔드{data.team.wantedBackEndMember}</p>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                
    </div>
  );
};