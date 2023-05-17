import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import "./floatingButton.css"

function FloatingButton() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const handleMenuClick = (boxNumber) => {
    if (boxNumber === 1) {
      setIsOpen1(!isOpen1);
    } else if (boxNumber === 2) {
      setIsOpen2(!isOpen2);
    }
  };

  const menus = [
    { name: "프로필", path: `/mypage/profile/${localStorage.getItem("email")}` },
    { name: "멤버 관리", path: "/mypage/teamMembers"},
    { name: "팀 관리", path: "/mypage/userTeams"},
  ];
  
  return (
      <div className="box box1">
        <div className="menu">
          <div className={`menu-round-box ${isOpen1 ? 'open' : ''}`}>
            <ul>
              {menus.map((menu, index) => (
                <li key={index}>
                  <NavLink to={menu.path} activeClassName="active" exact>
                    {menu.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <button className="menu-btn" onClick={() => handleMenuClick(1)}>
            메뉴
          </button>
        </div>
      </div>
  );
}
export default FloatingButton;