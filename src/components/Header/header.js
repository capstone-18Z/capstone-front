import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  const [loginCheck, setLoginCheck] = useState(false);

  useEffect(() => {
    checkLoginToken();
  });

  const checkLoginToken = () => {
    if (localStorage.getItem("refresh-token")) {
      setLoginCheck(true);
    } else {
      setLoginCheck(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("refresh-token");
  };

  return (
    <div className="header">
      <Link to="/main">한성메이팅</Link>
      <div className="header_empty"></div>
      <Link to="/post/user">
        <div className="header_option">팀원 찾기</div>
      </Link>

      <Link to="/team">
        <div className="header_option">팀원 모집</div>
      </Link>
      <Link to="/">
        {loginCheck ? (
          <div className="header_option" onClick={logout}>
            로그아웃
          </div>
        ) : (
          <div className="header_option">로그인/회원가입</div>
        )}
      </Link>
    </div>
  );
}

export default Header;
