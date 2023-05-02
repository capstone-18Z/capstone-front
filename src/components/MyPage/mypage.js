import React, { useState, useEffect } from "react";
import { Routes,Route } from "react-router-dom";
import styled from "styled-components";
import Teams from "./teams";
import Profile from "./profile";
import Sidebar from "./sidebar";
import RecommendList from "./recommendList"

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
                    <Route path="/profile" element={<Profile/>}></Route>
                    <Route path="/team" element={<Teams/>}></Route>
                    <Route path="/recommend" element={<RecommendList/>}></Route>
                </Routes>
            </div>
            </Center>      
        </div>
    );
}

export default MyPage;