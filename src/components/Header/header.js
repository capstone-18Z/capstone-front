import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./header.css";

function Header() {
  const navigate = useNavigate();
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
    localStorage.removeItem("login-token");
    localStorage.removeItem("email");
    localStorage.removeItem("nickname");
    navigate("/");
  };

  return (
    <header>
      <h2
        onClick={(e) => {
          navigate("/main");
        }}
      >
        한성메이팅
      </h2>
      <nav>
        <ul>
          <li>
            <div>자유게시판</div>
          </li>
          <li>
            <div
              onClick={(e) => {
                navigate("/list/members?page=1");
              }}
            >
              유저 찾기
            </div>
          </li>
          <li>
            <div
              onClick={(e) => {
                navigate("/list/team?page=1");
              }}
            >
              팀원 모집
            </div>
          </li>
          <li>
            <div
              onClick={(e) => {
                navigate("/list/contest?page=1");
              }}
            >
              공모전
            </div>
          </li>
          <li>
            {loginCheck ? (
              <div
                onClick={(e) => {
                  navigate("/mypage/profile");
                }}
              >
                마이페이지
              </div>
            ) : (
              <div></div>
            )}
          </li>
          <li>
            {loginCheck ? (
              <div
                onClick={(e) => {
                  navigate(`/profile/${localStorage.getItem("email")}`);
                }}
              >
                프로필
                {/* {localStorage.getItem("nickname")} */}
              </div>
            ) : (
              <div></div>
            )}
          </li>
          <li>
            {loginCheck ? (
              <Button variant="contained" onClick={logout}>
                로그아웃
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={(e) => {
                  navigate("/");
                }}
              >
                로그인/회원가입
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
