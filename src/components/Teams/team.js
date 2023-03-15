import React, { useEffect } from 'react';
import { useState } from "react";

function Team() {
    
    const [teamList, setTeamList] = useState(null);
    
    //fetch('http://1871166.iptime.org:8080/teams')
    useEffect(() => {
        fetch('https://port-0-capstoneback-6g2llf7te70n.sel3.cloudtype.app/teams/')
        .then((response) => response.json())        
        .then((obj) => {setTeamList(obj.data.dataWithoutLogin)
        console.log(obj.data.dataWithoutLogin)});
    }, []);
   
    //삭제할때 teams/{team.id}/delete 이렇게 post로 보내면 삭제됨
    //``역따음표 사이에 값넣기
    
            

    return (
        <div>
            <p>팀원 모집</p>
            {teamList && teamList.slice(0).reverse().map(data =>(
                <div key={data.teamId}>
                    <div><h1>{data.title}</h1></div>
                    <div>{data.detail}</div>
                    <div>현재 팀원 수 </div>
                    <p>프론트엔드{data.current_fm}</p>
                    <p>백엔드{data.current_bm}</p>
                   
                    <div>현재 구하는 팀원 수</div>
                    <p>프론트엔드{data.wanted_fm}</p>
                    <p>백엔드{data.wanted_bm}</p>
                    <button onClick={() =>{
                        
                    }}>        
                    수정하기</button>
                    <button onClick={() =>{
                        fetch(`https://port-0-capstoneback-6g2llf7te70n.sel3.cloudtype.app/teams/${data.teamId}/delete`,{
                            method: 'POST',           
                        })
                        .then(console.log(`${data.teamId} 삭제 완료`))
                    }}>        
                    삭제하기</button>
                    
                </div>
            ))}
        </div>
    );
            
}

export default Team;