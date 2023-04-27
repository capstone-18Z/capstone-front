import "./style.css";
import { Chip, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Profile(fetchData) {
  
  const navigate = useNavigate();
  return (
    <div className="profile-box">
      <div className="profile-top-box">
        <div className="profile-info-box">
          <h3 className="nickname-box">닉네임</h3>
          <h5 className="email-box">이메일</h5>
          <h5 className="githublink-box">깃허브 링크</h5>
          <h5 className="grade-box">학년</h5>
        </div>
        <div className="profile-img-box">
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 200, height: 200 }} />
        </div>
      </div>
      <div className="profile-bottom-box">
        <div className="wantteam-box">
          <p>원하는 팀</p>
          <Chip label="캡스톤디자인/백엔드" color="primary" variant="outlined" />
        </div>
        <div>
          <p>잘 다뤄요!</p>
          <Chip label="JAVA" color="primary" variant="outlined" />
          <Chip label="SPRING" color="primary" variant="outlined" />
        </div>
        <div>
          <p>써본적은 있지만 잘 다루진 못해요</p>
          <Chip label="REACT" color="primary" variant="outlined" />
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
