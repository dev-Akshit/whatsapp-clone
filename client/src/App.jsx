// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";
import Login from "../src/components/Login/login";
import Signup from "../src/components/Signup/signup";
import WhatsApp from "./whatsapp";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [socket, setSocket] = useState(null);

  // Initialize socket connection once
  useEffect(() => {
    const newSocket = io("http://localhost:5000", { withCredentials: true });
    setSocket(newSocket);
    return () => newSocket.disconnect(); // Cleanup on unmount
  }, []);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/check", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setIsAuthenticated(true);
          setUserId(userData._id);
          if(socket) socket.emit("userOnline", userData._id);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Error in checkAuth controller:", err);
      }
    };
    if(socket) checkAuth();
  }, [socket]);

  // Emit user online status and listen for online users
  useEffect(() => {
    if (socket) {
      const handleOnlineUsers = (users) => setOnlineUsers(users);
      socket.on("onlineUsers", handleOnlineUsers);
      return () => socket.off("onlineUsers", handleOnlineUsers);
    }
  }, [socket]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? (
              <WhatsApp
                setIsAuthenticated={setIsAuthenticated}
                onlineUsers={onlineUsers}
                socket={socket}
              />
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route
            path="/login"
            element={isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )}
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
