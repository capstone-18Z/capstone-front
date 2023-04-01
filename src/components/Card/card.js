import {useNavigate} from "react-router-dom";

export const Card = ({teamId, title, detail, currentFrontMember, currentBackMember, wantedFrontMember, wantedBackEndMember}) => {
  const navigate = useNavigate();
  return (
    <div className="card-wrapper" onClick={()   => {
      navigate(`/team/${teamId}`)
    }}>      
      <div class="card h-100">
                    <img src="https://www.hansung.ac.kr/hansung/3871/subview.do" class="card-img-top" alt="..."/>
                    <div class="card-body">
                    <h5 class="card-title">{title}</h5>
                    <p class="card-text">{detail}</p>
                    <p class="card-text">현재 팀원 수: 프론트엔드{currentFrontMember} 백엔드{currentBackMember}</p>
                    <p class="card-text">현재 구하는 팀원 수: 프론트엔드{wantedFrontMember} 백엔드{wantedBackEndMember}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
    </div>
  );
};

