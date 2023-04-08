import "./style.css";
import { useNavigate } from "react-router-dom";

function UserCard({ nickname, title, detail, postId }) {
  const navigate = useNavigate();
  return (
    <span
      className="usercard-box"
      onClick={(e) => {
        navigate(`/post/user/${postId}`);
      }}
    >
      <div className="usercard-content">
        <h3 className="usercard-title">{title}</h3>
        <div className="usercard-nickname">{nickname}</div>
        <div className="usercard-detail">{detail}</div>
      </div>
    </span>
  );
}

export default UserCard;
