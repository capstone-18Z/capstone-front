import React, { useEffect } from 'react';
import { useState } from "react";
import { ContestCard } from "../ContestCard/contestCard.js"
import {Link} from "react-router-dom";
import {useSearchParams} from "react-router-dom";
import { Pagination } from "@mui/material";
import "./contest.css";

function Contest() {
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    
    const [contestList, setContestList] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState("");
    const searchBarOnChange = (e) => {
        setSearch(e.target.value)
    }   
    const search_string = searchParams.get("search");
    

    const searchContest = () => {
        fetch(`${process.env.REACT_APP_API_URL}/contest/${search}?page=1`,{
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
            },      
        })
        .then((response) => response.json())        
        .then((obj) => {setContestList(obj.data)
        console.log(obj); setPage_maxcount(obj.metadata.totalPage);
        window.location.href = `/list/contest?search=${search}&page=1`;
    })}

    const page_number = searchParams.get("page");
    const [page_maxcount, setPage_maxcount] = useState(0);

    useEffect(() => {
        if(search_string != null){
            setSearch(search_string);
            fetch(`${process.env.REACT_APP_API_URL}/contest/${search_string}?page=${page_number}`,{
                headers: {
                    'refresh-token': refresh_token,
                    'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
                },      
            })
            .then((response) => response.json())        
            .then((obj) => {setContestList(obj.data)
            console.log(obj); setPage_maxcount(obj.state);})
        }        
        else {
            fetch(`${process.env.REACT_APP_API_URL}/contest?page=${page_number}`,{
                headers: {
                    'refresh-token': refresh_token,
                    'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
                },      
            })
            .then((response) => response.json())        
            .then((obj) => {setContestList(obj.data)
            console.log(obj); setPage_maxcount(obj.state);})
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
        <div className='contest_list'>
            <input
            type="text"
            placeholder={search_string==null ? "공모전을 검색해보세요. ":search_string}
            className="search_bar"
            name="searchText"
            onChange={searchBarOnChange}
            />
            <button onClick={searchContest}>고우</button>
            <h3>카테고리</h3>
            <p>팀원 모집중</p>
            {page_number}페이지
            
            
            <div className="card-container">          
                {contestList && contestList.map(contest => (
                    <div key={contest.cid} className="card_contest" sx={{ ...cardStyle, ...mediaQueryStyle }}>                    
                        <ContestCard contest={contest} />
                    </div>
                    ))}
            </div>
            <div class="page">
            <Pagination page={Number(searchParams.get("page"))} count={page_maxcount} size="large" 
             onChange={(e, value) => {
                search === "" ? 
                window.location.href = `/list/contest?page=${value}`
                :
                window.location.href = `/list/contest?search=${search}&page=${value}`
                ;
              }}
            />
            </div>
            
        </div>
    );
            
}

export default Contest;