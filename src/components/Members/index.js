import "./style.css";
import { Alert, CircularProgress, TextField, Button } from "@mui/material";
import MemberCard from "../MemberCard/index";
import useApiCall from "../../hooks/useApiCall";
import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

function Members() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchNickname, setSearchNickname] = useInput({
    nickname: "",
  });
  const [page_number, setPage_number] = useState(searchParams.get("page"));
  const [pageCount, setPageCount] = useState(1);
  const [loading, payload, error, fetchData] = useApiCall(
    `${process.env.REACT_APP_API_URL}/member/all?page=${page_number}`
  );
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (payload) {
      setPage_number(searchParams.get("page"));
      setMembers(payload?.data || []);
      setPageCount(payload.state);
    }
  }, [searchParams, payload]);

  if (!payload) {
    return <></>;
  }

  if (loading) {
    return (
      <>
        <CircularProgress color="inherit" />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Alert severity="error">{error}</Alert>
      </>
    );
  }

  const searchMember = async () => {
    if (!searchNickname.nickname) {
      window.location.reload(); // 페이지 새로고침
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/member/search/email/${searchNickname.nickname}`
      );
      console.log(response);
      setSearchParams({ page: 1 }); // 검색 결과 페이징 초기화
      setPageCount(1);
      if (response.data === null) {
        setMembers([]);
      } else {
        setMembers(response.data); // 검색 결과로 payload 상태 설정
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(members);
  const handleKeyDown = (event) => {
    const key = event.code;
    switch (key) {
      case "Enter":
        searchMember();
        break;
      default:
    }
  };

  return (
    <div>
      <div className="contest_search">
        <p className="contest_search_title">메이트 검색</p>
        <div className="search-form">
          <input
            type="text"
            placeholder={searchNickname.nickname === "" ? "닉네임으로 검색해보세요. " : searchNickname}
            className="search_bar"
            name="nickname"
            value={searchNickname.nickname}
            onChange={setSearchNickname}
            onKeyDown={handleKeyDown}
          />
          <button class="search-button" onClick={searchMember}>
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="member-card-container">
        {Array.isArray(members) && members.length > 0 ? (
          members.map((member) => (
            <motion.div
              initial={{ opacity: 0.2 }}
              whileInView={{
                opacity: 1,
                transition: { delay: 0.1 },
              }}
              whileHover={{
                scale: 1.12,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
              key={member.id}
            >
              <div>
                <MemberCard payload={member} fetchData={fetchData} />
              </div>
            </motion.div>
          ))
        ) : members && Object.keys(members).length > 0 ? (
          <motion.div
            initial={{ opacity: 0.2 }}
            whileInView={{
              opacity: 1,
              transition: { delay: 0.1 },
            }}
            whileHover={{
              scale: 1.12,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
            key={members.id}
          >
            <div>
              <MemberCard payload={members} fetchData={fetchData} />
            </div>
          </motion.div>
        ) : (
          <Alert severity="info">검색결과 0 건</Alert>
        )}
      </div>
      <Pagination
        sx={{ display: "flex", justifyContent: "center", margin: "30px" }}
        page={Number(searchParams.get("page"))}
        count={pageCount}
        size="large"
        onChange={(e, value) => {
          navigate(`?page=${value}`);
        }}
      />
    </div>
  );
}
export default Members;
