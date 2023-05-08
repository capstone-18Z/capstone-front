import React, { useState, useEffect } from "react";
import { Routes,Route } from "react-router-dom";
import styled from "styled-components";
import Teams from "./teams";
import Sidebar from "./sidebar";
import RecommendList from "./recommendList"
import InvitedTeamList from "../InvitedTeamList/invitedTeamList";
import TeamMembers from "../../TeamMembers/teamMembers";
import UserTeams from "../UserTeams/userTeams";
import ProfilePage from "../../pages/ProfilePage";

const Center = styled.div`
  height: 92vh;
  display: flex;
  flex-direction: row;
`

function MyPage() {
    return (     
        <div> 
         <Center>   
            <Sidebar/>
            <div>
                <Routes>
                    <Route path="/profile/*" element={<ProfilePage/>}></Route>
                    <Route path="/team" element={<Teams/>}></Route>
                    <Route path="/recommend" element={<RecommendList/>}></Route>
                    <Route path="/invitedTeamList" element={<InvitedTeamList/>}></Route>
                    <Route path="/teamMembers" element={<TeamMembers/>}></Route>UserTeams
                    <Route path="/userTeams" element={<UserTeams/>}></Route>
                </Routes>
            </div>
            </Center>      
        </div>
    );
}

export default MyPage;