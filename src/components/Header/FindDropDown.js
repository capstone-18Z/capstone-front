import React from "react";
import "./drop.css"
function FindDropDown({showDropdown}){
    return(
        <span className={showDropdown ? "drop-menu" : "drop-menu-hidden"}>
                <div className="drop-item"> 팀 추천</div>
                <div className="drop-item"> 유저 추천</div>
        </span>
    );
}
export default FindDropDown;