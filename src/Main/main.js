import React, { useEffect } from "react";
import { MainTeamCard } from "./mainTeamCard";
import { MainMemberCard } from "./mainMemberCard";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Dialog } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Banner1 from "../assets/images/HansungMatingBanner.png";
import "./main.css";
import StackModal from "../components/StackModal/index";
import axios from "axios";

function Main() {
  const location = useLocation();

  const refresh_token = localStorage.getItem("refresh-token");
  const login_token = localStorage.getItem("login-token");

  const [teamList, setTeamList] = useState(null);
  const [memberList, setMemberList] = useState(null);
  const [memberData, setMemberData] = useState("");
  const [stackOpen, setStackOpen] = useState(false);

  const handleStackOpen = () => {
    setStackOpen(true);
  };

  const handleClose = () => {
    setStackOpen(false);
  };

  const cardStyle = {
    width: "25%",
    minWidth: 200,
    height: 200,
  };

  const mediaQueryStyle = {
    "@media (max-width: 768px)": {
      width: "25%",
      minWidth: 200,
    },
  };
  useEffect(() => {
    Promise.all([
      fetch(`${process.env.REACT_APP_API_URL}/teams/main`, {
        headers: {
          "refresh-token": refresh_token,
          "login-token": login_token,
        },
      }),
      fetch(`${process.env.REACT_APP_API_URL}/member/main`, {
        headers: {
          "refresh-token": refresh_token,
          "login-token": login_token,
        },
      }),
    ])
      .then(([teamResponse, memberResponse]) => Promise.all([teamResponse.json(), memberResponse.json()]))
      .then(([teamObj, memberObj]) => {
        setTeamList(teamObj.data);
        setMemberList(memberObj.data);
        console.log(teamObj, memberObj);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/member/userForm`);
        console.log(response.data.data.member);
        setMemberData(response.data.data.member);
        checkMemberStack(response.data.data.member);
      } catch (error) {
        console.log(error);
      }
    };

    const loginToken = localStorage.getItem("login-token");
    if (loginToken) {
      fetchData();
    }
  }, [localStorage.getItem("login-token")]);

  const checkMemberStack = (member) => {
    const allValuesAreZeroDB = Object.values(member.memberDB)
      .filter((value, index) => index !== 0)
      .every((value) => value === 0);

    const allValuesAreZeroFramework = Object.values(member.memberFramework)
      .filter((value, index) => index !== 0)
      .every((value) => value === 0);

    const allValuesAreZeroLang = Object.values(member.memberLang)
      .filter((value, index) => index !== 0)
      .every((value) => value === 0);
    console.log(allValuesAreZeroDB && allValuesAreZeroFramework && allValuesAreZeroLang);
    if (allValuesAreZeroDB && allValuesAreZeroFramework && allValuesAreZeroLang) {
      setStackOpen(true);
    }
  };

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    fade: true,
    adaptiveHeight: true,
  };

  const navigate = useNavigate();

  return (
    <div>
      <Dialog open={stackOpen} onClose={handleClose} maxWidth="lg">
        <StackModal onClose={handleClose} member={memberData} />
      </Dialog>
      <div className="main_slider">
        <Slider {...settings}>
          <div className="main_introduce">
            <p className="introduce_first">나만의 맞춤형 팀 빌딩 서비스</p>
            <p className="introduce_second">한성 메이팅</p>
          </div>
          <img src={Banner1} className="main_banner" />
        </Slider>
      </div>
      <div className="main_body">
        <p>가장 최근 팀이에요!</p>
        <a href="/list/team?page=1">팀 확인하기 </a>
        <div className="main_team">
          {teamList &&
            teamList.map((team) => (
              <div key={team.teamId} className="main_card_team" sx={{ ...cardStyle, ...mediaQueryStyle }}>
                <MainTeamCard team={team} />
              </div>
            ))}
        </div>
      </div>
      <div className="main_body">
        <p>이런 개발자는 어떠세요?</p>
        <a href="/list/members?page=1">유저 찾아보기 </a>
        <div className="main_team">
          {memberList &&
            memberList.map((member) => (
              <div key={member.id} className="main_card_team" sx={{ ...cardStyle, ...mediaQueryStyle }}>
                <MainMemberCard member={member} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
