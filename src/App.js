import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/main" element={<MainPage />}></Route>
          {/* 중첩라우팅 */}
          <Route path="/post/*" element={<PostPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
