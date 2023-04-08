import React, { useState, useEffect } from "react";
import MyPageList from "../MyPageList/mypagelist";

const BASE_URL = "http://1871166.iptime.org:8080";



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
    .then((obj) => {setMyPageData(obj.data.myAllTeams); console.log(obj.data.myAllTeams)});
    }, []);
    
    return (
        <div>
            밑에 리스트가 뜹니다.
            {mypagedata && mypagedata.map(team =>(                     
                    <div key={team.teamId} className="card" sx={{ width: 200, height: 200 }}>
                        
                    {team.requestList && team.requestList.map(request => (
                        
                        <MyPageList request={request}/>
                        
                        
                    ))}
                    </div>
                                       
                ))}
        </div>
    );
}

export default MyPage;