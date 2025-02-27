import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useState } from "react";
import Login from "../src/components/Login/login"
import Signup from "../src/components/Signup/signup"
import WhatsApp from "./whatsapp";

function App() {
  const isAuth = () => !!localStorage.getItem('token');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/whatsapp"
          element={ isAuth() ? <WhatsApp /> : <Navigate to = "/login" />}
        />
      </Routes>
    </Router>
  )
}

export default App;