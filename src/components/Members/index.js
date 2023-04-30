import { Alert, CircularProgress } from "@mui/material";
import MemberCard from "../MemberCard/index";
import useApiCall from "../../hooks/useApiCall";

function Members() {
  const [loading, payload, error, fetchData] = useApiCall(
    `${process.env.REACT_APP_API_URL}/member/all`
  );

  if (!payload) {
    return <><Alert severity="error">정보를 읽어오는데 실패했습니다.</Alert></>
  }

  if (loading) {
    return <><CircularProgress color="inherit" /></>
  }

  if (error) {
    return <><Alert severity="error">{error}</Alert></>
  }

  const cardStyle = {
    width: '25%',
    minWidth: 200,
    height: 200,
  };
  
  const mediaQueryStyle = {
    '@media (max-width: 768px)': {
      width: '25%',
      minWidth: 200,
    },
  };

  return (
    <div>
      <div className="card-container">          
                {payload && payload.map(member => (
                    <div key={member.id} className="card_ryu" sx={{ ...cardStyle, ...mediaQueryStyle }}>                    
                        <MemberCard payload={member} fetchData={fetchData} />
                    </div>
                    ))}
            </div>
    </div>
  )
}
export default Members;