import "./style.css";

function Profile() {
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
          <img alt="" style={{ width: "200px", height: "200px" }}></img>
        </div>
      </div>
      <div className="profile-bottom-box">
        <div className="wantteam-box">
          <p>원하는 팀</p>
          <p>캡스톤디자인/백엔드</p>
        </div>
        <div>
          <p>잘 다뤄요!</p>
          <p>JAVA, SPRING</p>
        </div>
        <div>
          <p>써본적은 있지만 잘 다루진 못해요</p>
          <p>REACT</p>
        </div>
      </div>
      <div>
        <button>프로필 수정</button>
      </div>
    </div>
  );
}

export default Profile;
