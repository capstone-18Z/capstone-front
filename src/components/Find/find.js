import { MenuItem, Select } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import RecommendUserList from '../RecommendUserList/recommendUserList';
import "./find.css"


function Find() {
    
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    const [inputs, setInputs] = useState({
        selectedTeam: 0,
    });
    const { selectedTeam } = inputs; //비구조화 할당
    const [mypagedata, setMyPageData] = useState();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/mypage`, {
          headers: {
            "refresh-token": refresh_token,
            "login-token": login_token,
          },
        })
          .then((response) => response.json())
          .then((obj) => { setMyPageData(obj.data); console.log(obj);});
      }, []);

    const onChange = (e) => {
        const { name, value } = e.target;
        const nextInputs = {
          //spread 문법. 현재 상태의 내용이 이 자리로 온다.
          ...inputs,
          [name]: value,
        };
        //객체를 새로운 상태로 쓰겠다.
        setInputs(nextInputs);
    };  

    if (mypagedata === undefined) {
    return <div>Loading...</div>;
    }
    
    return (
        <div className="find">
      <div className="find_container">
        <div style={{ textAlign: 'center', fontSize: '40px' }}>추천 유저를 찾아보세요!</div>
        <div className="find_title">
          <label>팀별</label>          
          <Select
            style={{ width: "50%" }}
            value={selectedTeam}
            onChange={onChange}
            name="selectedTeam"
          >
            {mypagedata.myAllTeams.map((data, index) => (
              <MenuItem key={index} value={index}>
                {data.title}
              </MenuItem>
            ))}
          </Select>
          <hr />
        </div>
        <div className="find_body_top">
          
        </div>
        <div className="findList-container">
          <h1>{mypagedata.myAllTeams[selectedTeam].title}팀의 추천 유저 리스트입니다.     </h1>                        
          <RecommendUserList team={mypagedata.myAllTeams[selectedTeam]} selectedTeam={selectedTeam}/>
        </div>
      </div>
    </div>
  );
}

export default Find;