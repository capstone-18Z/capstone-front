import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {Button, TextField, Radio,RadioGroup, FormControlLabel} from '@mui/material';
import { Doughnut } from 'react-chartjs-2';

import RecommendUserList from '../RecommendUserList/recommendUserList';
import "./teamDetail.css"

ChartJS.register(ArcElement, Tooltip, Legend);


function TeamDetail() {
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    const params = useParams();
    const teamId = params.teamId;
    const navigate = useNavigate();
    const [updatable, setUpdatable] = useState(false);

    const [teamDetail, setTeamDetail] = useState({
        createDate:"",
        currentTeamMemberCount:0,
        detail:"",
        imagePaths:[],
        purpose:null,
        purposeDetail1:null,
        purposeDetail2:null,
        requestList: {},
        teamKeyword:{},
        teamDatabase : {}, 
        teamFramework : {},  
        teamLanguage: {},
        teamLeader: "",
        title:"",
        updateDate:"", 
        wantTeamMemberCount:0,
        writer:null
    });
   
    const [inputs, setInputs] = useState({
        input_detail: "",
        input_field: 0, //프론트 1 백 2 상관없음 3 선택하는 이렇게 해서 서버에 보냄
    });
    const {input_detail, input_field} = inputs;

    const onChange = (e) => {
        const {name, value} = e.target;
        const nextInputs = {
            //spread 문법. 현재 상태의 내용이 이 자리로 온다. 
            ...inputs,
            [name] : value,
        };
        //객체를 새로운 상태로 쓰겠다. 
        setInputs(nextInputs);
        console.log(inputs);
    };

    const Putinputs = () => {
        fetch(`${process.env.REACT_APP_API_URL}/user-to-team/${teamId}/add`,{
            method: 'POST',
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                detail : inputs.input_detail,
                field : inputs.input_field,
                //백프론트 선택이랑 detail은 간단한 설명
            }),         
        })
        .then((response) => response.json())
        .then((obj) => alert(obj.message))        
    }
    const test = () => {
        console.log(uppercasedData);
    }
    //들어온 요구사항 값을 나눠서 그래프에 띄우기 위해 처리하는 코드로 ~data1이 C,JAVA 같은 문자 data2가 그에 맞는 숫자 값이다.
    const filteredLanguage = Object.entries(Object.entries(teamDetail.teamLanguage).sort((a, b) => b[1] - a[1])
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}))
    .filter(([key, value]) =>  key !== 'id' && value !== 0);
    const Languagedata1 = filteredLanguage.map(item => item[0]).map(item => item.toUpperCase().replace('CS', 'C#').replace('CPP','C++'));
    const Languagedata2 = filteredLanguage.map(item => item[1]);

    const filteredFramework = Object.entries(Object.entries(teamDetail.teamFramework).sort((a, b) => b[1] - a[1])
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}))
    .filter(([key, value]) =>  key !== 'id' && value !== 0);
    const Frameworkdata1 = filteredFramework.map(item => item[0]).map(item => item.toUpperCase().replace('TDMAX', '3DMAX'));
    const Frameworkdata2 = filteredFramework.map(item => item[1]);    

    const uppercasedData = Frameworkdata1.map(item => item.toUpperCase().replace('TDMAX', '3DMAX'));

    const filteredDatabase = Object.entries(Object.entries(teamDetail.teamDatabase).sort((a, b) => b[1] - a[1])
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}))
    .filter(([key, value]) =>  key !== 'id' && value !== 0);
    const Databasedata1 = filteredDatabase.map(item => item[0]).map(item => item.toUpperCase().replace('MYSQLL', 'MYSQL').replace('MARIADBL','MARIA DB').replace('MONGODBL','MONGO DB').replace('SCHEMAL','SCHEMA'));
    const Databasedata2 = filteredDatabase.map(item => item[1]);

    useEffect(() => {                 
        fetch(`${process.env.REACT_APP_API_URL}/teams/${teamId}`,{     
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,
            } 
    })
    .then((response) => response.json())        
    .then((obj) => {setTeamDetail(obj.data); setUpdatable(obj.updatable); console.log(obj);});
    }, []);

    
    //도넛 그래프를 위해 선언해놓는거
    const Databasedonut = {
        labels: Databasedata1,
        datasets: [
          {
            label: '# of Votes',            
            data: Databasedata2,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [            
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],        
    };

    const Frameworkdonut = {
        labels: Frameworkdata1,
        datasets: [
          {
            label: '# of Votes',            
            data: Frameworkdata2,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [            
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],        
    };

    const Languagedonut = {
        labels: Languagedata1,
        datasets: [
          {
            label: '# of Votes',            
            data: Languagedata2,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [            
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            borderRadius: 1,
          },
        ],        
    };      
    


    return (
        <div className="teamdetail">
            
            <div className="teamdetail1">
                <div className="teamdetail_head">
                    <div className="title"><h1>제목: {teamDetail.title}</h1></div> 
                    <div className="image">
                    {teamDetail.imagePaths.map(filename => (
                      <img src={`${filename}`} alt={filename} key={filename} style={{ width: "80%", height: "auto" }} />
                    ))}    
                    </div>                   
                </div>
            <hr/>
                {teamDetail.teamKeyword.sub ==null ? 
                <h3>{teamDetail.teamKeyword.field}의 {teamDetail.teamKeyword.sub}반에서 {teamDetail.teamKeyword.category}로 뽑고 있습니다! </h3>
                :
                <h3>{teamDetail.teamKeyword.category}에서 {teamDetail.teamKeyword.field}를 뽑고 있습니다! </h3>
            }
                <div className="teamdetail_summary">
                    <div className="모집유형">
                        <h3>모집유형</h3>
                        <span>팀 빌딩 목적&emsp; {teamDetail.teamKeyword.category} </span>
                        <span>모집 역할&emsp; {teamDetail.teamKeyword.field} </span>
                        <span>모집 인원&emsp; {teamDetail.wantTeamMemberCount} </span>
                        <h3>요구 능력</h3>
                        <div className="요구능력">
                            <div>
                            {filteredLanguage.length === 0 ? null: "프로그래밍 언어"}
                            {filteredLanguage.length === 0 ? null: <div style={{width:300, height:300}}><Doughnut data={Languagedonut} /></div>  }                       
                            </div>
                            <div>
                            {filteredFramework.length === 0 ? null: "프레임워크"}
                            {filteredFramework.length === 0 ? null: <div style={{width:300, height:300}}><Doughnut data={Frameworkdonut}/></div> }                      
                            </div>
                            <div>
                            {filteredDatabase.length === 0 ? null: "데이터베이스"}
                            {filteredDatabase.length === 0 ? null: <div style={{width:300, height:300}}><Doughnut data={Databasedonut}/></div> }                       
                            </div>
                        </div>
                    </div>                    
                    <hr/>
                    <div className="summary">     
                        <h2>내용</h2>         
                        <div dangerouslySetInnerHTML={{ __html: teamDetail.detail }} />    
                    </div>
                </div>      
            </div>
            
            {(updatable?
            <div className="teamdetail_bottom">
                <button onClick={() =>{ 
                    navigate(`/post/team/${teamId}/editTeam`)                    
                }}>        
                수정하기</button>

                <button onClick={() =>{
                    fetch(`${process.env.REACT_APP_API_URL}/teams/${teamId}/delete`,{
                        method: 'POST',
                        headers: {
                            'refresh-token': refresh_token,
                            'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
                        }           
                    })
                    .then((response) => response.json())
                    .then((obj)=>alert(obj.message))
                    .then(()=>navigate(`/team`))
                }}>        
                삭제하기</button>                   
            </div>  
                :
                
                <div className="teamdetail_bottom">
                    <details >
                        
                        <summary>팀원 신청 하기</summary>
                        간단한 자기 어필:
                        <TextField sx={{ width: { sm: 650 }, marginBottom: '16px' }} variant="standard" value={input_detail} name="input_detail" onChange={onChange} />
                        <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={input_field ?? 0} //?? 0 으로 null일때 0 설정 안돌아가지는 않는데 오류가떠서 구글참고해서 고침
                        name="input_field"
                        onChange={onChange}
                        row>   
                            <FormControlLabel value="1" control={<Radio />} label="프론트엔드" />
                            <FormControlLabel value="2" control={<Radio />} label="백엔드" />
                            <FormControlLabel value="3" control={<Radio />} label="상관없음" />
                        </RadioGroup>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <Button variant="contained" onClick={Putinputs}>신청 보내기</Button>  
                        </div>
                </details>               
            </div>

                )}

            <div>
                <h2>이 팀의 다른 공고</h2>
            </div>
            
        </div>
    );
}

export default TeamDetail;