import { Avatar, Chip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";

function MemberCard({ payload, fetchData }) {
  const navigate = useNavigate();
  const memberData = payload;

  return (
    <Card
      sx={{ width:"345px", height:"330px" }}
      onClick={(e) => {
        navigate(`/profile/${memberData.email}`, {
          state: {
            email: memberData.email,
          },
        });
      }}
    >
      <CardActionArea sx={{ width:"345px", height:"330px" }}>
        <div className="card-top-box">
          <div className="top-left-box">
            <Avatar alt="Remy Sharp" src={memberData.profileImageUrl} sx={{ width: 150, height: 150 }} />
          </div>
          <div className="top-right-box">
            <h1 className="member-card-title">{memberData.nickname}</h1>
            <h3 className="member-card-title">{memberData.grade}학년</h3>
          </div>
        </div>
        <CardContent sx={{width:"313px", marginTop:"10px"}} className="card-bottom-box">
          <Typography variant="body2" color="text.secondary">
            <p className="member-card-text">
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
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MemberCard;
