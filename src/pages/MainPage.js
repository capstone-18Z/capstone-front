import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div>
      <p>
        <Link to="/post/team">팀 빌딩</Link>
      </p>
      <p>
        <Link to="/post/user">사용자 등록</Link>
      </p>
    </div>
  );
}

export default MainPage;
