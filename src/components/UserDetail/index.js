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
    <div className="userdetail-box">
      <div>
        <h2 className="userdetail-title">{userDetailData.data.title}</h2>
      </div>
      <div>
        <h4 className="userdetail-nickname">{userDetailData.data.nickname}</h4>
      </div>
      <div>
        <h4 className="userdetail-lang">언어</h4>
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
      <div className="userdetail-keyword">
        <h4>키워드</h4>
        <p>{userDetailData.data.memberKeywords.map((data) => <p key={data}>{data}</p>)}</p>
      </div>
      <div className="userdetail-detail">
        <h4>내용</h4>
        <img src={userDetailData.filenames} style={{width:"500px"}}></img>
        <p>{userDetailData && userDetailData.filenames.map((data) => data.filenames)}</p>
        <p> {userDetailData.data.detail}</p>
      </div>
      <div className="userdetail-button">
        <div className="update-button">
          <Button variant="contained" onClick={updateButton}>
            수정
          </Button>
        </div>
        <div className="delete-button">
          <Button variant="contained" onClick={deleteButton}>
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;