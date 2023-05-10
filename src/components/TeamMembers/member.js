import React from "react";
import GroupIcon from '@mui/icons-material/Group';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import SearchIcon from '@mui/icons-material/Search';
import "./member.css" 
import CrownImg from "../../assets/images/crown.png"
function Member({memberInfo}){
    const userId=localStorage.getItem("userId")
    console.log(memberInfo);
    return (
        <div className="member">
            <div className="request-container">
            <img className="user-image" src={memberInfo.profileImageUrl} />
            <div className="user-info">
                <div className="user-email">email : {memberInfo.email}</div>
                <div className="user-nickname">nickname : {memberInfo.nickname}</div>
                <div className="user-grade">{memberInfo.grade}학년</div>
            </div>
            {userId==memberInfo.id ? <><div>팀장</div><img src={CrownImg} width={40}/></> : <><div>팀원</div><GroupRemoveIcon style={{width:40}}/></>}
            </div>
        </div>
        
    );
}
export default Member;