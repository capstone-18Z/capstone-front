import React, { useEffect } from 'react';
import { useState } from "react";
import { Card } from "../Card/card.js"
import {Link} from "react-router-dom";
import {useSearchParams} from "react-router-dom";
import { Alert, CircularProgress, TextField, Button, Pagination } from "@mui/material";
import {useNavigate} from "react-router-dom";
import "./team.css";
import Category from './category.js';

function Team() {
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    
    const [teamList, setTeamList] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page,setPage] =useState(1);
    const [search, setSearch] = useState("");
    const searchBarOnChange = (e) => {
        setSearch(e.target.value)
    }   
    const search_string = searchParams.get("search");
    

    const searchTeam = () => {
        fetch(`${process.env.REACT_APP_API_URL}/teams/filter?search=${search}&category=${category}&subject=${isSpecialCategory ? combined : subject}&rule=${rule}&page=1`,{
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
            },      
        })
        .then((response) => response.json())        
        .then((obj) => {setTeamList(obj.data)
        console.log(obj); setPage_maxcount(obj.metadata.totalPage);
        ;
    })}

    const [page_maxcount, setPage_maxcount] = useState(0);
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/teams/filter?search=${search}&category=${category}&subject=${isSpecialCategory ? combined : subject}&rule=${rule}&page=${page}`,{
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
            },      
        })
        .then((response) => response.json())        
        .then((obj) => {setTeamList(obj.data)
        console.log(obj); setPage_maxcount(obj.metadata.totalPage);})  
    },[page])
    useEffect(() => {
            if(checkCategory.length==0 && checkRule.length==0 && checkSubject.length==0){ //카테고리 체크한개 셋다 빈상태면

                fetch(`${process.env.REACT_APP_API_URL}/teams?page=${page}`,{
                    headers: {
                        'refresh-token': refresh_token,
                        'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
                    },      
                })
                .then((response) => response.json())        
                .then((obj) => {setTeamList(obj.data)
                console.log(obj); setPage_maxcount(obj.metadata.totalPage);}) 
            }
            if(checkCategory.length>=1 || checkRule.length>=1 || checkSubject.length>=1){   //카테고리 체크한개가 하나라도 있으면 카테고리 방식으로 보냄 즉 카테고리 체크한 상태에서의 2페이지 이상을 확인할때 이 fetch가 돔
                console.log(`서버에 카테고리 방식으로 보냄 ${page}페이지`);
                fetch(`${process.env.REACT_APP_API_URL}/teams/filter?search=${search}&category=${category}&subject=${isSpecialCategory ? combined : subject}&rule=${rule}&page=${page}`,{
                    headers: {
                        'refresh-token': refresh_token,
                        'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
                    },      
                })
                .then((response) => response.json())        
                .then((obj) => {setTeamList(obj.data)
                    console.log(obj); setPage_maxcount(obj.metadata.totalPage);
                    console.log(checkCategory,checkRule,checkSubject);
                })
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
    const navigate = useNavigate();

    const [checkCategory, setCheckCategory] = useState([]);
    const [checkRule, setCheckRule] = useState([]);
    const [checkSubject, setCheckSubject] = useState([]);

    const excludedCategories = ['과목 팀프로젝트'];
    const filteredCategories = checkCategory.filter(category => !excludedCategories.includes(category));

    const category = filteredCategories.join(',');
    const rule = checkRule.join(',');
    const subject = checkSubject.join(',');

    const isSpecialCategory = checkCategory.includes("개인 팀프로젝트") ||
                          checkCategory.includes("공모전 및 대회") ||
                          checkCategory.includes("캡스톤 디자인");
    const combined = [...checkRule, "상관없음"].join(',');

    const categoryOnClick= () =>{  
        fetch(`${process.env.REACT_APP_API_URL}/teams/filter?search=${search}&category=${category}&subject=${subject}&rule=${isSpecialCategory ? combined : rule}&page=1`,{
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
            },      
        })
        .then((response) => response.json())        
        .then((obj) => {setTeamList(obj.data)
        console.log(obj); setPage_maxcount(obj.metadata.totalPage);
        console.log(checkCategory,checkRule,checkSubject)
    })}
    
    const onClick =(e) => { //팀원 모집 으로 보내기
        navigate(`/post/team`);
    }

    return (
        <div className='team_list'>
            <div className="members-title-box">
        <h1>한성 메이트</h1>
        <p className="subtitle">원하는 팀을 찾아보세요!</p>
        
        </div>
        <div className="search-box mt-3 text-center pxp-hero-form-round">
            
            <TextField className="search-bar" onChange={searchBarOnChange}
            placeholder={search_string==null ? "팀을 검색해보세요. ":search_string} variant="outlined" size="small" />
            <Button className="search-btn" onClick={searchTeam} variant="contained" sx={{ marginLeft: "5px" }}>
            검색
            </Button>
        </div>
        <Button onClick={onClick} variant="contained" sx={{ width: "245px" }}>팀원 모집 하기</Button>
            <div class="team-container">
                
                <Category checkCategory={checkCategory} setCheckCategory={setCheckCategory} checkRule={checkRule}
                    setCheckRule={setCheckRule} checkSubject={checkSubject} setCheckSubject={setCheckSubject} categoryOnClick={categoryOnClick} />
               
                <div className="card-container" style={{ flex: 1 }}>          
                    {teamList && teamList.map(team => (
                        <div key={team.teamId} className="card_ryu" sx={{ ...cardStyle, ...mediaQueryStyle }}>                    
                            <Card team={team} />
                        </div>
                        ))}
                </div>
            </div>
            <div class="page">
            <Pagination page={page} count={page_maxcount} size="large" 
             onChange={(e, value) => {
                setPage(value);
              }}
            />
            </div>
            
        </div>
    );
            
}

export default Team;