import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from 'pages/Login';
import SignUp from 'pages/SignUp'
import Menu from 'pages/Menu'

export default function App() {
  return (
    <div className="app">
      <div className="background">
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </Router>
    </div>
  );
}
