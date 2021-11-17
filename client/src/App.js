import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from './component/views/LandingPage/LandingPage';
import LoginPage from './component/views/LoginPage/LoginPage';
import RegisterPage from './component/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'
function App() {
  return (
    <Router>
    <div>
      <hr />


      {/*만들어준 Auth(HOC)인자값으로 각 페이지를 넣어준다.  */}

      <Routes>
        <Route path="/" element={Auth(LandingPage, null) } />
        <Route path="/login" element={Auth(LoginPage, false)} />
        <Route path="/register" element={Auth(RegisterPage, false)} />
      </Routes>
    </div>
  </Router>
);
}


export default App;
