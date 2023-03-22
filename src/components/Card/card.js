import {useNavigate} from "react-router-dom";

export const Card = ({teamId, title, detail, currentFrontMember, currentBackMember, wantedFrontMember, wantedBackEndMember}) => {
  const navigate = useNavigate();
  return (
    <div className="card-wrapper" onClick={()   => {
      navigate(`/team/${teamId}`)
    }}>
      <div className="card-body-img">
      </div>
      <div className="card-body-text">
        <div className="card-body-text-title"><h1>{title}</h1></div>
        <div className="card-body-text-detail">설명: {detail}</div>
        <p>현재 팀 아이디 {teamId}</p>
          <div>현재 팀원 수                     
                    <p>프론트엔드{currentFrontMember}</p>
                    <p>백엔드{currentBackMember}</p>
                   
                    <div>현재 구하는 팀원 수</div>
                    <p>프론트엔드{wantedFrontMember}</p>
                    <p>백엔드{wantedBackEndMember}</p>                   
          </div>
      </div>
    </div>
  );
};

