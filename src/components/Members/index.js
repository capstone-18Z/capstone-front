import "./style.css";
import { Alert, CircularProgress, TextField, Button } from "@mui/material";
import MemberCard from "../MemberCard/index";
import useApiCall from "../../hooks/useApiCall";
import useInput from "../../hooks/useInput";

function Members() {
  const [searchNickname, serSearchNickname] = useInput()
  const [loading, payload, error, fetchData] = useApiCall(`${process.env.REACT_APP_API_URL}/member/all`);

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

  return (
    <div>
      <div className="members-title-box">
        <h1>한성 메이트</h1>
        <p className="subtitle">추천 외에 다른 메이트들도 찾아보세요!</p>
      </div>
      <div className="search-box">
        <TextField  placeholder="닉네임으로 검색" variant="outlined" size="small" />
        <Button  variant="contained" sx={{ marginLeft: "5px" }}>
          검색
        </Button>
      </div>
      <div className="card-container">
        {payload &&
          payload.map((member) => (
            <div key={member.id}>
              <MemberCard payload={member} fetchData={fetchData} />
            </div>
          ))}
      </div>
    </div>
  );
}
export default Members;
