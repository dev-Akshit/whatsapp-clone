import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";
import Login from "../src/components/Login/login";
import Signup from "../src/components/Signup/signup";
import ForgetPass from "./components/ForgetPass/forgetpass";
import NewPass from "./components/ForgetPass/newPass";
import WhatsApp from "./whatsapp";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_API_URL}`, {
      withCredentials: true
    });
    setSocket(newSocket);

    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/check`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const user = await response.json();
        setUserData(user);
        setIsAuthenticated(true);
        return user;
      } else {
        setIsAuthenticated(false);
        setUserData(null);
        return null;
      }
    } catch (err) {
      console.error("Error in checkAuth controller:", err);
      setIsAuthenticated(false);
      setUserData(null);
      return null;
    }
  }, []);

  // Socket events setup
  useEffect(() => {
    if (!socket) return;

    const handleOnlineUsers = (users) => {
      // console.log("Online users updated:", users);
      setOnlineUsers(users);
    };

    socket.on("onlineUsers", handleOnlineUsers);

    // Clean up event listeners
    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const setupUserOnline = async () => {
      const user = await checkAuth();
      if (user && user._id) {
        // console.log("Emitting userOnline with ID:", user._id);
        socket.emit("userOnline", user._id);
      }
    };

    setupUserOnline();
  }, [socket, checkAuth]);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setUserData(null);
  }, []);

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
                userData={userData}
                handleLogout={handleLogout}
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
          <Route
            path="/forget-password"
            element={<ForgetPass />}
          />
          <Route
            path="/reset-password/:token"
            element={<NewPass />}
          />

        </Routes>
      </Router>
    </>
  );
}

export default App;