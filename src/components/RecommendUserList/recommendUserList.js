import React, { useEffect } from 'react';

import { useState } from "react";

function RecommendUserList( ) {
    const [userList, setUserList] = useState(null);
    /*
    useEffect(() => {        
        //fetch('http://1871166.iptime.org:8080/teams',{            
        fetch('https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/teams',{            
        })
        .then((response) => response.json())        
        .then((obj) => {setUserList(obj.data.dataWithoutLogin)
        console.log(obj)});
    }, []);


    
            {userList && userList.map(data =>(
            <div key={data.teamId}>
                <h2>점수: </h2>
                <p>닉네임: </p>
                <p>팀원 요청 보내기</p>                
            </div>
                ))}
    */

    return (
        <div>
            <p>추천 유저</p>            
        </div>
    );
}

export default RecommendUserList;