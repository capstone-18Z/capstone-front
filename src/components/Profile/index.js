import "./style.css";
import { Chip, Avatar, Button, Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Profile({ payload, fetchData }) {
  const navigate = useNavigate();
  const memberData = payload.data.member;
  return (
    <div className="profile-box">
      <div className="profile-top-box">
        <div className="profile-info-box">
          <h3 className="nickname-box">닉네임: {memberData.nickname}</h3>
          <h5 className="email-box">이메일: {memberData.email}</h5>
          <h5 className="githublink-box">깃허브 링크: {memberData.github}</h5>
          <h5 className="grade-box">학년: {memberData.grade}</h5>
        </div>
        <div className="profile-img-box">
          <Avatar alt="Remy Sharp" src={memberData.profileImageUrl} sx={{ width: 200, height: 200 }} />
        </div>
      </div>
      <div className="profile-bottom-box">
        <div className="wantteam-box">
          <p>원하는 팀</p>
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
          <p>잘 다뤄요!</p>
          {[memberData.memberLang, memberData.memberFramework, memberData.memberDB].flatMap((obj) =>
            Object.entries(obj)
              .filter(([key, value]) => value === 100)
              .map(([key, value]) => <Chip key={key} label={key} color="primary" variant="outlined" />)
              .concat(
                Object.entries(obj).filter(([key, value]) => value === 100).length === 0 && (
                  <Chip label="프로필을 수정하여 추가해주세요" color="secondary" variant="outlined" />
                )
              )
          )}
        </div>
        <div>
          <p>써본적은 있지만 잘 다루진 못해요</p>
          {[memberData.memberLang, memberData.memberFramework, memberData.memberDB].flatMap((obj) =>
            Object.entries(obj)
              .filter(([key, value]) => value === 50)
              .map(([key, value]) => <Chip key={key} label={key} color="primary" variant="outlined" />)
              .concat(
                Object.entries(obj).filter(([key, value]) => value === 50).length === 0 && (
                  <Chip label="프로필을 수정하여 추가해주세요" color="secondary" variant="outlined" />
                )
              )
          )}
        </div>
      </div>
      <div>
        <Button
          variant="contained"
          onClick={(e) => {
            navigate("/profile/edit");
          }}
        >
          프로필 수정
        </Button>
      </div>
    </div>
  );
}

export default Profile;
