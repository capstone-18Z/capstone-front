import React, { useState, useEffect } from "react";
import { Select, MenuItem  } from "@mui/material";
import './teamMembers.css'

function TeamMembers() {
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");

    const [mypagedata, setMyPageData] = useState();
    const [inputs, setInputs] = useState({
        selectedTeam:0,
        menu:"소속된 팀원",
    });
    const {selectedTeam, menu} = inputs;	//비구조화 할당

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

    useEffect(()=>{
        /*
        fetch(`${process.env.REACT_APP_API_URL}/teams/filter`,{
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
            },      
        })
        .then((response) => response.json()) */
        setInputs({
            ...inputs,
            menu:"소속된 팀원",
        })
        console.log("서버에 유저목록 받아옴")       
    },[selectedTeam])

   

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
                    <label>팀별</label>                    
                    <Select style={{ width: '50%' }} value={selectedTeam} onChange={onChange} name="selectedTeam"> 
                        {mypagedata.myAllTeams.map((data, index) =>(
                            <MenuItem key={index} value={index}>{data.title}</MenuItem>
                        ))}
                    </Select>                    
                    <hr/>                    
                </div>
                <div className='teamMembers_body_top'>
                    <h2>팀 구성원</h2>
                    <Select style={{ width: '25%' }} value={menu} onChange={onChange} name="menu">
                        <MenuItem  value="소속된 팀원">소속된 팀원</MenuItem>
                        <MenuItem  value="지원한 팀원">지원한 팀원</MenuItem>
                        <MenuItem  value="초대한 팀원">초대한 팀원</MenuItem>
                    </Select>
                </div>
                {mypagedata.myAllTeams==null? "현재 팀이 없습니다." : null} 
            </div>
        </div>
    );
}

export default TeamMembers;
