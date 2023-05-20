import React from "react";
import GroupIcon from "@mui/icons-material/Group";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import SearchIcon from "@mui/icons-material/Search";
import "./member.css";
import CrownImg from "../../assets/images/crown.png";
import human from "../../assets/images/human.png";
function Member({ memberInfo }) {
  const userId = localStorage.getItem("userId");
  console.log(memberInfo);
  const deleteMember=()=>{
    alert("asdasd")
  }
  return (
    <div className="member">
      <div className="request-container">
      
        <img className="user-image" src={memberInfo.profileImageUrl} />
        <div className="user-info">
          <div className="user-email">email : {memberInfo.email}</div>
          <div className="user-nickname">nickname : {memberInfo.nickname}</div>
          <div className="user-grade">{memberInfo.grade}학년</div>
        </div>
        {userId == memberInfo.id ? (
          <>
            <div className="member-role">
              <img src={CrownImg} width={40} />
            </div>
          </>
        ) : (
          <>
            <div className="member-role">
              <img src={human} width={25} />
            </div>
            <GroupRemoveIcon onClick={deleteMember} style={{ position: "relative", color: "red" ,top :"-32px"}} />
          </>
        )}
        
      </div>
    </div>
  );
}
export default Member;
