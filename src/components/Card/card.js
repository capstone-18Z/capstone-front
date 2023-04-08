import {useNavigate} from "react-router-dom";
import { useState } from "react";
const BASE_URL ='http://1871166.iptime.org:8080';

export const Card = (team) => {
  const navigate = useNavigate();
  const [data,setData]=useState(team);
  console.log("data",data.team);
  console.log(team);
  return (
    <div className="card-wrapper" onClick={()   => {
      navigate(`/team/${data.team.teamId}`)
    }}>
      <div className="card h-100">
                    <div className="card-image">
                    {data.team.imagePaths.map(filename => (
                      <img src={`${BASE_URL}/upload/${filename}`} alt={filename} key={filename} style={{ width: "100%", height: "auto" }} />
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
    </div>
  );
};