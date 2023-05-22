import React from "react";
import GroupIcon from "@mui/icons-material/Group";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import SearchIcon from "@mui/icons-material/Search";
import "./member.css";
import CrownImg from "../../assets/images/crown.png";
import human from "../../assets/images/human.png";
function Member({ memberInfo }) {
  const userId = localStorage.getItem("userId");
  console.log(memberInfo);
  const deleteMember = () => {
    alert("asdasd");
  };
  return (
    <div className="member">
      <div className="member-container">
        <div className="request-top">
          {userId == memberInfo.id ? (
            <div style={{ height: "2em" }}></div>
          ) : (
            <div className="delete-member">delete</div>
          )}
        </div>
        <img className="user-image" src={memberInfo.profileImageUrl} />
        <div className="user-nickname">
          {userId == memberInfo.id ? (
            <>
              <div className="member-role">
                <img src={CrownImg} width={30} />
              </div>
            </>
          ) : (
            <>
              <div className="member-role">
                <img src={human} width={20} />
              </div>
            </>
          )}
          {memberInfo.nickname}
        </div>

        <div className="user-info">
          <div className="grid-50-50">
            <div className="user-email">Email : {memberInfo.email}</div>
            <div className="user-grade">{memberInfo.grade}학년</div>
          </div>
          <div className="user-keywords">
            {memberInfo.memberKeywords.map((keyword) => (
              <div className="user-keyword">
                {`${keyword.category}/${keyword.field}${
                  keyword.sub == "none" ? "" : "(" + keyword.sub + ")"
                }`}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Member;
