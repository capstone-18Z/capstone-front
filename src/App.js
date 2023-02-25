import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Link} from "react-router-dom";
import Index from './component/teambuildingform';

function App() {    

      const onSubmitHandler = (e) => {
        e.preventDefault();
        const name = e.target.text.value;
        fetch('/members/new',{
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
            body: JSON.stringify({ 
            name,
          }),
        });
      };




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