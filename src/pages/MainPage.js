import UserCard from "../components/UserCard/index";
import useApiCall from "../hooks/useApiCall";

const BASE_URL = "https://port-0-capstone-back-6g2llf7te70n.sel3.cloudtype.app";

function MainPage() {
  const [loading, userListData, error] = useApiCall(`${BASE_URL}/member/post`);

  if (!userListData) {
    // null일경우
    return <></>;
  }

  if (loading) {
    return <>로딩중</>;
  }

  if (error) {
    return <>{error}</>;
  }
  return (
    <div style={{display:"flex"}}>
      {userListData.map((data) => (
        <UserCard
          key={data.pid}
          title={data.data.title}
          nickname={data.data.nickname}
          detail={data.data.detail}
          postId={data.data.postId}
        ></UserCard>
      ))}
    </div>
  );
}

export default MainPage;
