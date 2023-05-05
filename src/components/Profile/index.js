import "./style.css";
import {
  Chip,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useInput from "../../hooks/useInput";

const imglink = "https://firebasestorage.googleapis.com/v0/b/caps-1edf8.appspot.com/o/langIcon%2F";

function Profile({ payload }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [memberData, setmemberData] = useState(payload.data.member);
  const [myTeams, setMyTeams] = useState("");
  const [inputs, setInputs] = useInput({
    teamId: "",
  });
  const [buttonVisible, setButtonVisible] = useState(true);
  const [requestVisible, setRequestVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const getAnotherProfile = async (uid) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/member/search/uid/${uid}`);
      setmemberData(response.data);
      setButtonVisible(false);
      setRequestVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location.state?.userId !== localStorage.getItem("userId")) {
      console.log("실행");
      getAnotherProfile(location.state?.userId);
    } else {
      return;
    }
  }, [location.state?.userId]);

  const handleRequest = () => {
    setOpen(true);
    console.log(open);
    axios
      .get(`${process.env.REACT_APP_API_URL}/teams/myteams`)
      .then((response) => {
        setMyTeams(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const onClickRequest = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/${inputs.teamId}/match-request`, {
        userId: location.state?.userId,
      })
      .then((response) => {
        if (response.data) {
          alert("요청 완료");
        }
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data.message);
      });
  };

  const checkGrade = (grade) => {
    if (grade !== 0) {
      return (
        <>
          <h5 className="grade-box">학년: {grade}</h5>
        </>
      );
    }
  };

  const checkGit = (git) => {
    if (git !== null && git !== "") {
      return (
        <>
          <h5 className="githublink-box">깃허브 링크: {git}</h5>
        </>
      );
    }
  };

  const checkSolvedNickname = (memberData) => {
    if (
      memberData.solvedNickname !== "!!No User!!" &&
      memberData.solvedNickname !== "" &&
      memberData.solvedNickname !== null
    ) {
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
          {checkGit(memberData.github)}
          {checkGrade(memberData.grade)}
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
                .map(([key, value]) => (
                  <IconButton disabled>
                    <img src={`${imglink}${key}.png?alt=media`} alt="logo" width={30} style={{ marginRight: "5px" }} />
                  </IconButton>
                ))
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
                .map(([key, value]) => (
                  <IconButton disabled>
                    <img src={`${imglink}${key}.png?alt=media`} alt="logo" width={30} style={{ marginRight: "5px" }} />
                  </IconButton>
                ))
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
              navigate("/profile/edit");
            }}
          >
            프로필 수정
          </Button>
        )}
        {requestVisible && (
          <>
            <Button variant="contained" onClick={() => handleRequest()}>
              팀 요청하기
            </Button>
            {myTeams?.data?.length > 0 ? (
              <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>팀 요청하기</DialogTitle>
                <DialogContentText>요청할 팀을 골라주세요</DialogContentText>
                <FormControl sx={{ mt: 2, minWidth: 120 }}>
                  <InputLabel>팀</InputLabel>
                  <Select name="teamId" value={inputs.teamId} onChange={setInputs}>
                    {myTeams.data.map((team) => {
                      return <MenuItem value={team.teamId}>{team.title}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
                <DialogActions>
                  <Button onClick={handleDialogClose}>Close</Button>
                  <Button onClick={onClickRequest}>요청</Button>
                </DialogActions>
              </Dialog>
            ) : (
              <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>팀 요청하기</DialogTitle>
                <DialogContentText>팀이 없습니다.</DialogContentText>
                <DialogActions>
                  <Button onClick={handleDialogClose}>Close</Button>
                </DialogActions>
              </Dialog>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
