import "./style.css";
import { Alert, CircularProgress, TextField, Button } from "@mui/material";
import MemberCard from "../MemberCard/index";
import useApiCall from "../../hooks/useApiCall";
import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import { Margin } from "@mui/icons-material";

function Members() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchNickname, serSearchNickname] = useInput();
  const [page_number, setPage_number] = useState(searchParams.get("page"));
  const [loading, payload, error, fetchData] = useApiCall(`${process.env.REACT_APP_API_URL}/member/all?page=${page_number}`);

  useEffect(() => {
    setPage_number(searchParams.get("page"));
  }, [searchParams])


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
  console.log(payload)

  return (
    <div>
      <div className="members-title-box">
        <h1>한성 메이트</h1>
        <p className="subtitle">추천 외에 다른 메이트들도 찾아보세요!</p>
      </div>
      <div className="search-box">
        <TextField placeholder="닉네임으로 검색" variant="outlined" size="small" />
        <Button variant="contained" sx={{ marginLeft: "5px" }}>
          검색
        </Button>
      </div>
      <div className="member-card-container">
        {payload &&
          payload.data.map((member) => (
            <div key={member.id}>
              <MemberCard payload={member} fetchData={fetchData} />
            </div>
          ))}
      </div>
      <Pagination
          sx={{display: "flex", justifyContent: "center", margin: "30px" }}
          page={Number(searchParams.get("page"))}
          count={payload.state}
          size="large"
          onChange={(e, value) => {
            navigate(`?page=${value}`);
          }}
        />
    </div>
  );
}
export default Members;
