import React, { useState, useEffect } from "react";
import MyPageList from "../MyPageList/mypagelist";

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
    <div>
      {mypagedata && mypagedata.map(myAllTeams =>(  
                    <div key={myAllTeams.teamId} className="requestlist">
                    <div>
                    <li className='tap'
                    onClick={() => (console.log(myAllTeams))}>팀 제목: {myAllTeams.title}  목적:{myAllTeams.teamKeyword.category}</li>                       
                    {myAllTeams.requestList && myAllTeams.requestList.map(request => (                        
                        <MyPageList key={request.requestId} request={request}/>
                    ))}
                    </div>
                    
                    </div>                                       
                ))}    
    </div>
  );
};

export default Teams;