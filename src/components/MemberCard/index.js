import { Avatar, Chip } from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";

function MemberCard({ payload, fetchData }) {
  const navigate = useNavigate();
  const memberData = payload;

  return (
    <div className="member-card-wrapper" onClick={(e) => {
      navigate(`/profile/${memberData.email}`, {
        state: {
          email: memberData.email
        }
      }) 
    }}>
      <div className="card-top-box">
        <div className="top-left-box">
          <Avatar alt="Remy Sharp" src={memberData.profileImageUrl} sx={{ width: 150, height: 150 }} />
        </div>
        <div className="top-right-box">
          <h3 className="card-title">{memberData.nickname}</h3>
          <h4 className="card-title">{memberData.grade}학년</h4>
        </div>
      </div>
      <div className="member-card-body">
        <p className="card-text">
          {memberData.memberKeywords.map(
            (keyword) =>
              `#${keyword.category}/${
                keyword.field === "1"
                  ? "프론트엔드"
                  : keyword.field === "2"
                  ? "백엔드"
                  : keyword.field === "3"
                  ? "상관없음"
                  : keyword.field
              }`
          )}
        </p>
        <p>
          {[memberData.memberLang, memberData.memberFramework, memberData.memberDB].flatMap((obj) =>
            Object.entries(obj)
              .filter(([key, value]) => value === 100)
              .map(([key, value]) => `#${key}`)
          )}
        </p>
        <p className="card-text"></p>
      </div>
      <div className="card-footer">
        <small className="text-muted">Last updated시간 전</small>
      </div>
    </div>
  );
}

export default MemberCard;
