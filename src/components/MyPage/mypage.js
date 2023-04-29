import React, { useState, useEffect } from "react";
import { Routes,Route } from "react-router-dom";
import styled from "styled-components";
import {ListItem,List,ListItemButton,ListItemText} from '@mui/material';
import Teams from "./teams";
import Profile from "./profile";
import Sidebar from "./sidebar";
const BASE_URL = `${process.env.REACT_APP_API_URL}`;

const Center = styled.div`
  height: 92vh;
  display: flex;
  flex-direction: row;
`

function MyPage() {
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");

    const [mypagedata, setMyPageData] = useState();
    useEffect(() => {                 
        fetch(`${BASE_URL}/mypage`,{     
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,
            } 
    })
    .then((response) => response.json())        
    .then((obj) => {setMyPageData(obj.data.myAllTeams); console.log(obj)});
    }, []);
    
   
/*
 현재 팀별 모집 상황
        
        </div>
*/
    return (     
        <div> 
         <Center>   
            <Sidebar/>
            <div>
                <Routes>
                    <Route path="/profile" element={<Profile/>}></Route>
                    <Route path="/team" element={<Teams/>}></Route>
                </Routes>
            </div>
            </Center>      
        </div>
    );
}

export default MyPage;