import { Avatar, Chip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, IconButton } from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";

const imglink = "https://firebasestorage.googleapis.com/v0/b/caps-1edf8.appspot.com/o/langIcon%2F";

function MemberCard({ payload, fetchData }) {
  const navigate = useNavigate();
  const memberData = payload;

  const checkGrade = (grade) => {
    if (grade !== 0) {
      return <h4 className="member-card-title">한성대학교/{grade}학년</h4>;
    } else {
      return <h4 className="member-card-title">한성대학교</h4>;
    }
  };
  return (
    <Card
      sx={{ width: "345px", height: "330px" }}
      onClick={(e) => {
        navigate(`/profile/${memberData.id}`, {
          state: {
            userId: memberData.id,
          },
        });
      }}
    >
      <CardActionArea sx={{ width: "345px", height: "330px" }}>
        <div className="card-top-box">
          <div className="top-left-box">
            <Avatar alt="Remy Sharp" src={memberData.profileImageUrl} sx={{ width: 150, height: 150 }} />
          </div>
          <div className="top-right-box">
            <h1 className="member-card-title">{memberData.nickname}</h1>
            <h3 className="member-card-title">{checkGrade(memberData.grade)}</h3>
          </div>
        </div>
        <CardContent sx={{ width: "313px", marginTop: "10px" }} className="card-bottom-box">
          <Typography variant="div" color="text.secondary">
            <div className="member-card-text">
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
            </div>
          </Typography>
          <div>
            {[memberData.memberLang, memberData.memberFramework, memberData.memberDB]
            .flatMap((obj) =>
              Object.entries(obj)
                .filter(([key, value]) => value == 100)
                .map(([key, value]) => (
                  <img src={`${imglink}${key}.png?alt=media`} alt="logo" width={30} height={30} style={{ marginRight: "10px" }} />
                ))
            )}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MemberCard;
