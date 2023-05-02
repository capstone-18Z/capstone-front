import React, { useState, useEffect } from "react";
import MyPageList from "../MyPageList/mypagelist";
import { Card } from "../Card/card";
import "./myteamlist.css";
import RecommendUserList from "../RecommendUserList/recommendUserList";
const Teams = () => {
  const refresh_token = localStorage.getItem("refresh-token");
  const login_token = localStorage.getItem("login-token");

    const [mypagedata, setMyPageData] = useState();
    useEffect(() => {                 
        fetch(`${process.env.REACT_APP_API_URL}/mypage`,{     
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,
            } 
    })
    .then((response) => response.json())        
    .then((obj) => {setMyPageData(obj.data.myAllTeams); console.log(obj)});
    }, []);

  return (
    <div className="myteamlist_wrapper">
        {mypagedata && mypagedata.map(myAllTeams =>(  
          <div className="first-div" key={myAllTeams.teamId}>      
                  
              <div className="card-wrapper">
                <Card team={myAllTeams} />                
              </div>
              {myAllTeams && myAllTeams.requestList && myAllTeams.requestList.map(request => (
                <div className="my-page-list-wrapper" key={request.requestId}>
                  <MyPageList request={request} />
                </div>
              ))}                      
          </div>
        ))}
    </div>
  );
};

export default Teams;