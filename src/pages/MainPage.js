import { Link } from "react-router-dom";
import Team from "../components/Teams/team";

function MainPage() {
  return (
    <div>
      <p>
        <Link to="/post/team">팀 빌딩</Link>
      </p>
      <p>
        <Link to="/post/user">사용자 등록</Link>
      </p>
      <div>
        <Team />
      </div>
    </div>
  );
}

export default MainPage;
