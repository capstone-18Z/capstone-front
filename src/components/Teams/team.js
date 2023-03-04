import React, { useEffect } from 'react';
import { useState } from "react";

function Team() {
    
    const [todoList, setTodoList] = useState(null);
    
    useEffect(() => {
        fetch('http://1871166.iptime.org:8080/teams')
        .then((response) => response.json())
        .then((data) => setTodoList(data));
    }, []);
   
            
            

    return (
        <div>
            {todoList && todoList.data.map(data =>(
                <div key={data.teamid}>
                    <div><h1>{data.title}</h1></div>
                    <div>{data.detail}</div>
                    <div>{data.current_fm}</div>
                    <div>{data.current_bm}</div>
                </div>
            ))}
        </div>
    );
            
}

export default Team;