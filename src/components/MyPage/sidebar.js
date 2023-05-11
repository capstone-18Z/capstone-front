import React from "react";
import { NavLink, useLocation} from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./sidebarItem";
import "./sidebar.css"

const Menu = styled.div`
  width: 100px;
`
const email = localStorage.getItem("email");

function Sidebar() {
  const menus = [
    { name: "프로필", path: `/mypage/profile/${localStorage.getItem("email")}` },       
    { name: "내 팀 목록", path: "/mypage/team" },
    { name: "팀원 관리", path: "/mypage/teamMembers"},
    { name: "추천 유저", path: "/mypage/recommend"},
    { name: "팀 관리", path: "/mypage/userTeams"},
    { name: "초대 된 팀", path: "/mypage/invitedTeamList"},
  ];
  
  return (    
    <div className="side">
      <div className="sidebar">
        <div id="sidebar_main">
          <p>마이페이지</p>
        </div>
      <Menu>
        {menus.map((menu, index) => {
          return (
            <NavLink             
              style={{color: "gray", textDecoration: "none",
              }}
              to={menu.path}
              key={index}              
            >
              <SidebarItem menu={menu}/>
             
            </NavLink>
          );
        })}
         <div className="name-tag">{localStorage.getItem("nickname")}</div>
      </Menu>
      </div>
    </div>    
  );
}

export default Sidebar;