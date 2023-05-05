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

  return (
    <div>
      <div className="members-title-box">
        <h1>한성 메이트</h1>
        <p className="subtitle">추천 외에 다른 메이트들도 찾아보세요!</p>
      </div>
      <form className="search-box">
        <TextField
          placeholder="닉네임으로 검색"
          variant="outlined"
          size="small"
          name="nickname"
          value={searchNickname.nickname}
          onChange={setSearchNickname}
        />
        <Button variant="contained" sx={{ marginLeft: "5px" }} onClick={searchMember}>
          검색
        </Button>
      </form>
      <div className="member-card-container">
        {members.length > 0 ? (
          Array.isArray(members) ? (
            members.map((member) => (
              <div key={member.id}>
                <MemberCard payload={member} fetchData={fetchData} />
              </div>
            ))
          ) : (
            <div key={members.id}>
              <MemberCard payload={members} fetchData={fetchData} />
            </div>
          )
        ) : (
          <p>No members found.</p>
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
