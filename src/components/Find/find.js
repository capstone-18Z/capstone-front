import React from "react";
import { useState } from "react";
import "./find.css";
import RecommendUsers from "./recommendUsers";
import RecommendTeams from "./recommendTeams";

function Find() {
  const [selectedTeamBtn,setSelectedTeamBtn]=useState(true);
  const [selectedUserBtn,setSelectedUserBtn]=useState(false);
  const clickTeam=()=>{
    setSelectedTeamBtn(true);
    setSelectedUserBtn(false);
  }
  const clickUser=()=>{
    setSelectedTeamBtn(false);
    setSelectedUserBtn(true);
  }

  return (
    <>
      <div className="rc-group">
        <div className={selectedTeamBtn?"rc-team selected" : "rc-team shadow"} onClick={clickTeam}>팀 추천</div>
        <div className={selectedUserBtn?"rc-user selected" : "rc-user shadow"} onClick={clickUser}>유저 추천</div>
      </div>
      <div className="find">
        {selectedUserBtn ? <RecommendUsers/> : <RecommendTeams/>}
      </div>
    </>
  );
}

export default Find;
