import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./sidebarItem";

const Side = styled.div`
  display: flex;
  border-right: 1px solid #e0e0e0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15%;
`
const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
`
const Menu = styled.div`
  margin-top: 30px;
  width: 100px;
  display: flex;
  flex-direction: column;
`

function Sidebar() {
  const menus = [
    { name: "프로필", path: "/mypage/profile" },    
    { name: "프로필 수정", path: "/mypage/profile" },    
    { name: "내 팀 목록", path: "/mypage/team" },
  ];
  return (
    <Side>
      <Menu>
        {menus.map((menu, index) => {
          return (
            <NavLink             
              style={{color: "gray", textDecoration: "none"}}
              to={menu.path}
              key={index}              
            >
              <SidebarItem menu={menu} />
            </NavLink>
          );
        })}
      </Menu>
    </Side>
  );
}

export default Sidebar;