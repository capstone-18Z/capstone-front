import React, { useEffect } from 'react';
import { useState } from "react";
import { Card } from "../Card/card.js"
import {Link} from "react-router-dom";

function Team() {
    
    const [teamList, setTeamList] = useState(null);
    
    useEffect(() => {
        fetch('https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/teams',{
        //fetch('http://1871166.iptime.org:8080/teams',{            
        //fetch('https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app/teams',{            
        })
        .then((response) => response.json())        
        .then((obj) => {setTeamList(obj.data.allTeamList)
        console.log(obj)});
    }, []);
    
    //삭제할때 teams/{team.id}/delete 이렇게 post로 보내면 삭제됨
    //``역따음표 사이에 값넣기
    
            

    return (
        <div>
            <Link to="/post/team">
                팀원 모집 하기
                    </Link>
            <p>팀원 모집중</p>
            {teamList && teamList.map(data =>(
                <Card teamId={data.teamId} title={data.title} detail={data.detail}
                currentFrontMember={data.currentFrontMember} currentBackMember={data.currentBackMember} 
                wantedFrontMember={data.wantedFrontMember} wantedBackEndMember={data.wantedBackEndMember}
                />
                
                
                /*
                <div key={data.teamId}>
                    <div><h1>{data.title}</h1></div>
                    <div>{data.detail}</div>
                    <div>현재 팀원 수 </div>
                    <p>프론트엔드{data.current_fm}</p>
                    <p>백엔드{data.current_bm}</p>
                   
                    <div>현재 구하는 팀원 수</div>
                    <p>프론트엔드{data.wanted_fm}</p>
                    <p>백엔드{data.wanted_bm}</p>
                    
                    
                    
                </div>
                */
            ))}
            
        </div>
    );
            
}

export default Team;