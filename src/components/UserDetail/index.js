import "./style.css";
import axios from "axios";
import useApiCall from "../../hooks/useApiCall";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const BASE_URL = "https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app";

function UserDetail() {
  const navigate = useNavigate();
  const postId = useParams().postId;
  console.log(postId);
  const [loading, userDetailData, error] = useApiCall(`${BASE_URL}/member/post/${postId}`);
  if (!userDetailData) {
    // null일경우
    return <></>;
  }
  if (loading) {
    return <>로딩중</>;
  }
  if (error) {
    return <>{error}</>;
  }

  const updateButton = (e) => {
    navigate(`/post/user/update/${userDetailData.data.postId}`);
  };

  const deleteButton = async (e) => {
    try {
      const response = await axios.post(`${BASE_URL}/member/post/delete/${userDetailData.data.postId}`);
      if (response.data) {
        alert("삭제 완료");
        navigate("/main");
      }
    } catch (err) {
      console.log(err.response.data.message);
      alert(err.response.data.message);
    }
  };
  return (
    <div>
      <div>
        <h3>제목: {userDetailData.data.title}</h3>
      </div>
      <div>
        <p>닉네임: {userDetailData.data.nickname}</p>
      </div>
      <div>
        <p>언어</p>
        <p>C: {userDetailData.data.c}</p>
        <p>C++: {userDetailData.data.cpp}</p>
        <p>C#: {userDetailData.data.cs}</p>
        <p>JAVA: {userDetailData.data.java}</p>
        <p>Python: {userDetailData.data.python}</p>
        <p>Javascript: {userDetailData.data.javascript}</p>
        <p>Visual Basic: {userDetailData.data.vb}</p>
        <p>SQL: {userDetailData.data.sqllang}</p>
        <p>Assembly: {userDetailData.data.assembly}</p>
        <p>Php: {userDetailData.data.php}</p>
      </div>
      <div>
        <p>키워드: {userDetailData && userDetailData.data.memberKeywords.map((data) => data.memberKeywords)}</p>
      </div>
      <div>
        <p>내용: {userDetailData.data.detail}</p>
      </div>
      <div>
        <Button variant="contained" onClick={updateButton}>
          수정
        </Button>
        <Button variant="contained" onClick={deleteButton}>
          삭제
        </Button>
      </div>
    </div>
  );
}

export default UserDetail;
