import React,{useEffect} from 'react';
import { Button} from "@mui/material";
const category = [
  { id: "개인 팀프로젝트", title: "개인 팀프로젝트" },
  { id: "공모전 및 대회", title: "공모전 및 대회" },
  { id: "캡스톤 디자인", title: "캡스톤 디자인" },
  { id: "과목 팀프로젝트", title: "과목 팀프로젝트" },   
];



const subject = [ //과목 팀프로젝트용
  {id:"웹프레임워크1" ,title:"웹프레임워크1"},
  {id:"네트워크프로그래밍" ,title:"네트워크프로그래밍"},
  {id:"안드로이드프로그래밍" ,title:"안드로이드프로그래밍"},
  {id:"고급모바일프로그래밍" ,title:"고급모바일프로그래밍"},
];

const rule = [
  { id: "프론트엔드", title: "프론트엔드"},
  { id: "백엔드", title: "백엔드"},
];

function Category({checkCategory,setCheckCategory, checkRule,setCheckRule,checkSubject,setCheckSubject , categoryOnClick ,handleCheckboxChange }) {
  
   // 체크된 아이템을 담을 배열을 props로 받는다.
   function handleCheck(event) {
    const { name, value, checked } = event.target;
  
    if (checked) {
      switch (name) {
        case "category":
          setCheckCategory((prev) => [...prev, value]);
          localStorage.setItem("category", JSON.stringify([...checkCategory, value]));          
          break;
        case "rule":
          setCheckRule((prev) => [...prev, value]);
          localStorage.setItem("rule", JSON.stringify([...checkRule, value]));
          break;
        case "subject":
          setCheckSubject((prev) => [...prev, value]);
          localStorage.setItem("subject", JSON.stringify([...checkSubject, value]));
          break;
        default:
          break;
      }
    } else {
      switch (name) {
        case "category":
          if(checkCategory.includes("과목 팀프로젝트")){
            setCheckSubject([]);
          }
          setCheckCategory((prev) => prev.filter((id) => id !== value));
          localStorage.setItem("category", JSON.stringify(checkCategory.filter((id) => id !== value)));          
          break;
        case "rule":
          setCheckRule((prev) => prev.filter((id) => id !== value));
          localStorage.setItem("rule", JSON.stringify(checkRule.filter((id) => id !== value)));
          break;
        case "subject":
          setCheckSubject((prev) => prev.filter((id) => id !== value));
          localStorage.setItem("subject", JSON.stringify(checkSubject.filter((id) => id !== value)));
          break;
        default:
          break;
      }
    }
  }

  const handleCheckAll = (event) => {
    if (event.target.checked) {
      const allDataItems = category.map((item) => item.id);
      const allRuleItems = rule.map((item) => item.id);
      const allSubjectItems = subject.map((item) => item.id);
      setCheckCategory(allDataItems);
      setCheckRule(allRuleItems);
      setCheckSubject(allSubjectItems);
    } else {
      setCheckCategory([]);
      setCheckRule([]);
      setCheckSubject([]);
    }   
  }

  useEffect(() => {
      // 로컬 스토리지에서 체크박스 값 불러오기
      const category = localStorage.getItem("category");
      const rule = localStorage.getItem("rule");
      const subject = localStorage.getItem("subject");
  
      if (category) setCheckCategory(JSON.parse(category));
      if (rule) setCheckRule(JSON.parse(rule));
      if (subject) setCheckSubject(JSON.parse(subject));
  }, []);

  return (
    <table>    
      <tbody>
        <tr>
          <td>
          <input type="checkbox" checked={checkCategory.length+checkRule.length+checkSubject.length==10} onChange={handleCheckAll} />
          <label>전체선택</label>
          </td>          
        </tr>     
        <tr>프로젝트 </tr>
        {category.map((item) => (          
          <tr key={item.id}>
            <td>
              <input
                type="checkbox"
                id={item.id}
                value={item.id}
                name='category'
                checked={checkCategory.includes(item.id)}
                onChange={handleCheck}
              />
              <label htmlFor={item.id}>{item.title}</label>
            </td>
          </tr>
        ))}       
        {checkCategory.includes("과목 팀프로젝트")?<td>과목 선택</td> : null}
        {checkCategory.includes("과목 팀프로젝트") &&          
          subject.map((item) => (
            <>            
            <tr key={item.id}>              
              <td>
                <input
                  type="checkbox"
                  id={item.id}
                  name='subject'
                  value={item.id}
                  checked={checkSubject.includes(item.id)}
                  onChange={handleCheck}
                />
                <label htmlFor={item.id}>{item.title}</label>
              </td>
            </tr>
            </>
          ))}
         <tr>역할</tr>
        {rule.map((item) => (
          <tr key={item.id}>
          <td>
            <input
              type="checkbox"
              name='rule'
              id={item.id}
              value={item.id}
              checked={checkRule.includes(item.id)}
              onChange={handleCheck}
            />
            <label htmlFor={item.id}>{item.title}</label>
          </td>
          
        </tr>        
        ))}
        <Button onClick={{handleCheckboxChange, categoryOnClick}} variant="contained" sx={{ width: "200px" }}>필터 적용</Button>
      </tbody>
    </table>
  );
}
export default Category;