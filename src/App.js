import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Link} from "react-router-dom";
import Index from './component/teambuildingform';

function App() { 
  
    return (
    <div className="App">
      <BrowserRouter>	
      <p><Link to="/index">팀빌딩하기</Link></p>
      <p><Link to="/index2">팀구하기</Link></p>
				<Routes>          
					<Route path="/index" element={<Index/>}></Route>					
				</Routes>
			</BrowserRouter>
    </div>
  );
}

export default App;