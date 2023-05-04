import "./style.css";
import { Chip, Avatar, Button, Alert, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Profile({ payload, fetchData }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [memberData, setmemberData] = useState(payload.data.member);
  console.log(memberData);
  const [buttonVisible, setButtonVisible] = useState(true);

  const getAnotherProfile = async (email) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/member/search/email/${email}`);
      setmemberData(response.data);
      setButtonVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(location.state?.email);
    if (location.state?.email && location.state.email !== localStorage.getItem("email")) {
      getAnotherProfile(location.state?.email);
    } else {
      return;
    }
  }, [location.state?.email]);

  const checkGrade = (grade) => {
    if(grade !== 0) {
      return (
        <>
          <h5 className="grade-box">학년: {grade}</h5>
        </>
      )
    }
  }

  const checkGit = (git) => {
    if(git !== null && git !== "") {
      return (
        <>
          <h5 className="githublink-box">깃허브 링크: {git}</h5>
        </>
      )
    }
  } 

  const checkSolvedNickname = (memberData) => {
    if (memberData.solvedNickname !== "!!No User!!" && memberData.solvedNickname !== "" && memberData.solvedNickname !== null) {
      return (
        <>
          <h5 className="bj-nickname">백준 닉네임: {memberData.solvedNickname}</h5>
          <h5 className="bj-tier">백준 티어: {getRankInfo(memberData.solvedTier)}</h5>
          <h5 className="bj-solvedcount">백준 푼 문제: {memberData.solvedCount}</h5>
        </>
      );
    } else return;
  };

  const getRankInfo = (solvedTier) => {
    switch (true) {
      case solvedTier === 0:
        return "Unranked";
      case solvedTier >= 1 && solvedTier <= 5:
        return `Bronze ${6 - solvedTier}`;
      case solvedTier >= 6 && solvedTier <= 10:
        return `Silver ${11 - solvedTier}`;
      case solvedTier >= 11 && solvedTier <= 15:
        return `Gold ${16 - solvedTier}`;
      case solvedTier >= 16 && solvedTier <= 20:
        return `Platinum ${21 - solvedTier}`;
      case solvedTier >= 21 && solvedTier <= 25:
        return `Diamond ${26 - solvedTier}`;
      case solvedTier >= 26 && solvedTier <= 30:
        return `Ruby ${31 - solvedTier}`;
      default:
        return "";
    }
  };

  return (
    <div className="profile-box">
      <div className="profile-top-box">
        <div className="profile-info-box">
          <h3 className="nickname-box">닉네임: {memberData.nickname}</h3>
          <h5 className="email-box">이메일: {memberData.email}</h5>
          <h5 className="githublink-box">{checkGit(memberData.github)}</h5>
          <h5 className="grade-box">{checkGrade(memberData.grade)}</h5>
          {checkSolvedNickname(memberData)}
        </div>
        <div className="profile-img-box">
          <Avatar alt="Remy Sharp" src={memberData.profileImageUrl} sx={{ width: 200, height: 200 }} />
        </div>
      </div>
      <div className="profile-bottom-box">
        <div className="wantteam-box">
          <h4>원하는 팀</h4>
          {memberData.memberKeywords.length === 0 && <Chip label="미작성" color="secondary" variant="outlined" />}
          {memberData.memberKeywords.map((keyword) => (
            <Chip
              label={`${keyword.category}/${
                keyword.field === "1"
                  ? "프론트엔드"
                  : keyword.field === "2"
                  ? "백엔드"
                  : keyword.field === "3"
                  ? "상관없음"
                  : keyword.field
              }`}
              color="primary"
              variant="outlined"
            />
          ))}
        </div>
        <div>
          <h4>잘 다뤄요!</h4>
          {[memberData.memberLang, memberData.memberFramework, memberData.memberDB]
            .flatMap((obj) =>
              Object.entries(obj)
                .filter(([key, value]) => value === 100)
                .map(([key, value]) => <Chip key={key} label={key} color="primary" variant="outlined" />)
            )
            .concat(
              ![memberData.memberLang, memberData.memberFramework, memberData.memberDB].some((obj) =>
                Object.entries(obj).some(([key, value]) => value === 100)
              ) && <Chip label="미작성" color="secondary" variant="outlined" />
            )}
        </div>
        <div>
          <h4>써본적은 있지만 잘 다루진 못해요</h4>
          {[memberData.memberLang, memberData.memberFramework, memberData.memberDB]
            .flatMap((obj) =>
              Object.entries(obj)
                .filter(([key, value]) => value === 50)
                .map(([key, value]) => <Chip key={key} label={key} color="primary" variant="outlined" />)
            )
            .concat(
              ![memberData.memberLang, memberData.memberFramework, memberData.memberDB].some((obj) =>
                Object.entries(obj).some(([key, value]) => value === 50)
              ) && <Chip label="미작성" color="secondary" variant="outlined" />
            )}
        </div>
      </div>
      <div>
        {buttonVisible && (
          <Button
            variant="contained"
            onClick={(e) => {
              fetchData();
              navigate("/profile/edit");
            }}
          >
            프로필 수정
          </Button>
        )}
      </div>
    </div>
  );
}

export default Profile;
