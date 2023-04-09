import React, { useState, useEffect } from "react";
import MyPageList from "../MyPageList/mypagelist";


const BASE_URL = "https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app";


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
    .then((obj) => {setMyPageData(obj.data.myAllTeams); console.log(obj.data)});
    }, []);
    
   
/*

*/
    return (     
        <div>          
        현재 팀별 모집 상황
            {mypagedata && mypagedata.map(team =>(  
                    <div key={team.teamId} className="requestlist">
                    <li className='tap'
                    onClick={() => (console.log(team))}>팀 제목: {team.title}  </li>                       
                    {team.requestList && team.requestList.map(request => (                        
                        <MyPageList key={request.requestId} request={request}/>
                    ))}
                    </div>                                       
                ))}    
        </div>
    );
}

export default MyPage;