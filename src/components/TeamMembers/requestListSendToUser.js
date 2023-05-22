import React from "react";
import "./RequestSendToUser.css"
function RequestSendToUser({requestInfo,requestListSendToUser,setRequestListSendToUser}){
    const matchId=requestInfo.id
    const userInfo=requestInfo.info
    const refresh_token=localStorage.getItem("refresh-token")
    const login_token=localStorage.getItem("login-token")
    const deleteRequest=()=>{
        fetch(
            `${process.env.REACT_APP_API_URL}/team-to-user/${matchId}/delete`,
            {
                method:"post",
              headers: {
                "refresh-token": refresh_token,
                "login-token": login_token, //헤더로 로그인 토큰 넣어야 삭제됨
              },
            }
          )
            .then((response) => response.json())
            .then((obj) => {
              console.log("obj", obj);
              setRequestListSendToUser(requestListSendToUser.filter(data=>{
                return data.id!=matchId
              }))
            });
    }
    return(
      <div className="member-container">
      <div className="request-top">
       
      </div>
      <img className="user-image" src={userInfo.profileImageUrl} />
      <div className="user-nickname">
        {userInfo.nickname}
      </div>

      <div className="user-info">
        <div className="grid-50-50">
          <div className="user-email">Email : {userInfo.email}</div>
          <div className="user-grade">{userInfo.grade}학년</div>
        </div>
        <div className="user-keywords">
          {userInfo.memberKeywords.map((keyword) => (
            <div className="user-keyword">
              {`${keyword.category}/${keyword.field}${
                keyword.sub == "none" ? "" : "(" + keyword.sub + ")"
              }`}
            </div>
          ))}
        </div>
      </div>
      <div className="btn-grp">
                <button onClick={deleteRequest}>취소</button>
                
            </div>
    </div>
    );
}
export default RequestSendToUser;