import React, { useEffect } from 'react';
import { useState } from "react";

function Team() {
    
    const [todoList, setTodoList] = useState(null);
    
    
    useEffect(() => {
        fetch('http://1871166.iptime.org:8080/teams')
        .then((response) => response.json())        
        .then((obj) => {setTodoList(obj.data.dataWithoutLogin)
        console.log(obj.data.dataWithoutLogin)});
    }, []);
   
            
            

    return (
        <div>
            <p>팀원 모집</p>
            {todoList && todoList.map(data =>(
                <div key={data.teamid}>
                    <div><h1>{data.title}</h1></div>
                    <div>{data.detail}</div>
                    <div>현재 팀원 수 </div>
                    <p>프론트엔드{data.current_fm}</p>
                    <p>백엔드{data.current_bm}</p>
                   
                    <div>현재 구하는 팀원 수</div>
                    <p>프론트엔드{data.wanted_fm}</p>
                    <p>백엔드{data.wanted_bm}</p>
                </div>
            ))}
        </div>
    );
            
}

export default Team;