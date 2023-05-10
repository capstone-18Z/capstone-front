import React from "react";
import "./RequestFromUser.css";
function RequestFromUser({
  requestInfo,
  requestListFromUser,
  setRequestListFromUser,
}) {
  const matchId = requestInfo.id;
  const userInfo = requestInfo.info;
  const userMsg = requestInfo.message;
  const refresh_token = localStorage.getItem("refresh-token");
  const login_token = localStorage.getItem("login-token");
  const approveRequest = () => {
    fetch(`${process.env.REACT_APP_API_URL}/user-to-team/${matchId}/approve`, {
      method: "post",
      headers: {
        "refresh-token": refresh_token,
        "login-token": login_token, //헤더로 로그인 토큰 넣어야 삭제됨
      },
    })
      .then((response) => response.json())
      .then((obj) => {
        console.log("obj", obj);
        setRequestListFromUser(
          requestListFromUser.filter((data) => {
            return data.id != matchId;
          })
        );
      });
  };
  const refuseRequest = () => {
    fetch(`${process.env.REACT_APP_API_URL}/user-to-team/${matchId}/fuckyou`, {
      method: "post",
      headers: {
        "refresh-token": refresh_token,
        "login-token": login_token, //헤더로 로그인 토큰 넣어야 삭제됨
      },
    })
      .then((response) => response.json())
      .then((obj) => {
        console.log("obj", obj);
        setRequestListFromUser(
          requestListFromUser.filter((data) => {
            return data.id != matchId;
          })
        );
      });
  };
  return (
    <div className="request-container">
      <img className="user-image" src={userInfo.profileImageUrl} />
      <div className="user-info">
        <div className="user-email">email : {userInfo.email}</div>
        <div className="user-nickname">nickname : {userInfo.nickname}</div>
        <div className="user-grade">{userInfo.grade}학년</div>
      </div>
      <div className="user-msg">"{userMsg}"</div>
      <div className="btn-grp">
        <button
          onClick={() => {
            const chatWindow = window.open(
              `/chat?userId=${userInfo.id}&waitingId=${matchId}&nickname=${userInfo.nickname}&mode=team`,
              "",
              "width=450,height=650"
            );

            chatWindow.addEventListener("load", () => {
              const style = document.createElement("style");
              style.innerHTML = `
              /* 원하는 스타일 추가 */
              body {
                background-color: #f2f2f2;
              }
              /* 스크롤바 숨기기 */
              ::-webkit-scrollbar {
                display: none;
              }
            `;
              chatWindow.document.head.appendChild(style);

              // 오른쪽으로 100px 이동하고 아래로 200px 이동
              chatWindow.moveTo(100, 200);
            });
          }}
        >
          채팅
        </button>
        <button onClick={approveRequest}>수락</button>
        <button onClick={refuseRequest}>거절</button>
      </div>
    </div>
  );
}
export default RequestFromUser;
