import "./index2.css";
function Index2() {
   

    return (
        <div className="userbulidingform">
        <h1>유저 빌딩 폼</h1>
        <form>
            <p>프로젝트 과목 <input type="text"/></p>
            <p>자기소개</p>
            <p>언어</p>
                <p>C언어 <input name= 'C언어' type='range' min={1}
                max={10} step={1}  className='custom-slider'/></p>
                <p>Java <input name= 'Java' type='range' min={1}
                max={10} step={1}  className='custom-slider'/></p>
                <p>C++ <input name= 'C++' type='range' min={1}
                max={10} step={1}  className='custom-slider'/></p>
            <p>현재 본인의 트랙</p>
                <input type="checkbox" id="btn1" name="checkWrap" value="웹공학트랙" />
                <label htmlFor="btn1">웹공학트랙</label>
                <input type="checkbox" id="btn2" name="checkWrap" value="모바일트랙" />
                <label htmlFor="btn2">모바일트랙</label>
                <input type="checkbox" id="btn3" name="checkWrap" value="빅데이터트랙" />
                <label htmlFor="btn3">빅데이터트랙</label>
                <input type="checkbox" id="btn4" name="checkWrap" value="디지털콘텐츠트랙" />
                <label htmlFor="btn4">디지털콘텐츠트랙</label>
                <p>내용 <textarea id="story" name="story"
                rows={5} cols={33}/></p>
                <button>등록하기</button>
        </form>
        
        </div>
        );
}
export default Index2;