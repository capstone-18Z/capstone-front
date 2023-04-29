import React, { useEffect } from 'react';
import { useState } from "react";
import { Card } from "../Card/card.js"
import {Link} from "react-router-dom";
import {useSearchParams} from "react-router-dom";
import { Pagination } from "@mui/material";
import "./team.css";

function Team() {
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    
    const [teamList, setTeamList] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState("");
    const searchBarOnChange = (e) => {
        setSearch(e.target.value)
    }   
    const search_string = searchParams.get("search");
    

    const searchTeam = () => {
        fetch(`${process.env.REACT_APP_API_URL}/teams/search/${search}?page=1`,{
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
            },      
        })
        .then((response) => response.json())        
        .then((obj) => {setTeamList(obj.data)
        console.log(obj); setPage_maxcount(obj.metadata.totalPage);
        window.location.href = `/list/team?search=${search}&page=1`;
    })}

    const page_number = searchParams.get("page");
    const [page_maxcount, setPage_maxcount] = useState(0);

    useEffect(() => {
        if(search_string != null){
            setSearch(search_string);
            fetch(`${process.env.REACT_APP_API_URL}/teams/search/${search_string}?page=${page_number}`,{
                headers: {
                    'refresh-token': refresh_token,
                    'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
                },      
            })
            .then((response) => response.json())        
            .then((obj) => {setTeamList(obj.data)
            console.log(obj); setPage_maxcount(obj.metadata.totalPage);})
        }        
        else {
            fetch(`${process.env.REACT_APP_API_URL}/teams?page=${page_number}`,{
                headers: {
                    'refresh-token': refresh_token,
                    'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
                },      
            })
            .then((response) => response.json())        
            .then((obj) => {setTeamList(obj.data)
            console.log(obj); setPage_maxcount(obj.metadata.totalPage);})
        }              
    }, []);
    
    //삭제할때 teams/{team.id}/delete 이렇게 post로 보내면 삭제됨
    //``역따음표 사이에 값넣기
    
    const cardStyle = {
        width: '25%',
        minWidth: 200,
        height: 200,
      };
      
      const mediaQueryStyle = {
        '@media (max-width: 768px)': {
          width: '25%',
          minWidth: 200,
        },
      };

    return (
        <div className='team_list'>
            <Link to="/post/team">
                팀원 모집 하기
                </Link>
            <input
            type="text"
            placeholder={search_string==null ? "팀을 검색해보세요. ":search_string}
            className="search_bar"
            name="searchText"
            onChange={searchBarOnChange}
            />
            <button onClick={searchTeam}>고우</button>
            <p>팀원 모집중</p>
            {page_number}페이지임
            
            
            <div className="card-container">          
                {teamList && teamList.map(team => (
                    <div key={team.teamId} className="card_ryu" sx={{ ...cardStyle, ...mediaQueryStyle }}>                    
                        <Card team={team} />
                    </div>
                    ))}
            </div>
            <Pagination page={Number(searchParams.get("page"))} count={page_maxcount} size="large" 
             onChange={(e, value) => {
                search == null ? 
                window.location.href = `/list/team?page=${value}`
                :
                window.location.href = `/list/team?search=${search}&page=${value}`
                ;
              }}
            />
            
        </div>
    );
            
}

export default Team;