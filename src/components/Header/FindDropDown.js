import React from "react";
import { useNavigate } from "react-router-dom";
import "./drop.css"
function FindDropDown({showDropdown,setShowDropdown}){
    const navigate = useNavigate();
    return(
        <span 
        className={showDropdown ? "drop-menu" : "drop-menu-hidden"}
        onMouseEnter={()=>setShowDropdown(true)}
        >
                <div className="drop-item" onClick={()=>{
                    navigate("/find")
                }}> 팀 추천</div>
                <div className="drop-item"onClick={()=>{
                    navigate("/find")
                }}> 유저 추천</div>
        </span>
    );
}
export default FindDropDown;