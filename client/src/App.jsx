import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";
import Login from "../src/components/Login/login";
import Signup from "../src/components/Signup/signup";
import WhatsApp from "./whatsapp";

const socket = io("http://localhost:5000/", {
  withCredentials: true,
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //check authentication
  useEffect(() => {
    const checkAuth = async (req, res) => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/check', {
          method: 'GET',
          credentials: 'include'
        })
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Error in checkAuth controller:', err.msg);
        return res.status(500).json({ msg: 'Internal Server error' });
      }
    }
    checkAuth();
  }, []);

  // Socket.io connection
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);

      socket.on("message", (msg) => {
        console.log("Received message:", msg);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from socket");
      });
    });
    
  }, []);

  return (
    <>
    <Toaster position="top-center" reverseOrder={false}/>
      <Router>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <WhatsApp setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated}/>}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
          />
        </Routes>
      </Router>
    </>

  );
}

export default App;