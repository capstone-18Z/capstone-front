import React, { useState, useEffect } from "react";
import { Select, MenuItem  } from "@mui/material";
import "./userTeams.css"

function UserTeams() {
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");

    const [mypagedata, setMyPageData] = useState();
    const [inputs, setInputs] = useState({
        menu:"소속 팀",
    });
    const {menu} = inputs;	//비구조화 할당

    useEffect(() => {                 
        fetch(`${process.env.REACT_APP_API_URL}/mypage`,{     
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,
            } 
    })
    .then((response) => response.json())        
    .then((obj) => {setMyPageData(obj.data); console.log(obj.data)});
    }, []);

    const onChange = (e) => {
        const {name, value} = e.target;
        const nextInputs = {
            //spread 문법. 현재 상태의 내용이 이 자리로 온다. 
            ...inputs,
            [name] : value,
        };
        //객체를 새로운 상태로 쓰겠다. 
        setInputs(nextInputs);
    };

    if (mypagedata === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <div className="teamMembers">
            <div className='teamMembers_container'>
                <div className='teamMembers_title'>
                    <label>팀 관리</label>                    
                    <Select style={{ width: '25%' }} value={menu} onChange={onChange} name="menu">
                        <MenuItem  value="소속 팀">소속 팀</MenuItem>
                        <MenuItem  value="지원한 팀">지원한 팀</MenuItem>
                        <MenuItem  value="초대된 팀">초대된 팀</MenuItem>
                    </Select>                   
                    <hr/>                    
                </div>
                <div className='teamMembers_body_top'>
                    
                </div>
            </div>
        </div>
    );
}

export default UserTeams;