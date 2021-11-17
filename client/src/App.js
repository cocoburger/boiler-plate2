import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
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
