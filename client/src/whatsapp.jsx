import { useState, useEffect } from "react";
import Sidebar from "./components/SideBar/SideBar";
import ChatArea from "./components/ChatArea/ChatArea";
import ChatAreaHeader from "./components/ChatAreaHeader/ChatAreaHeader";
import AllChat from "./components/AllChat/AllChat";
import DefaultPage from "./components/DefaultPage/defaultPage";
import Status from "./components/SideBar/Status/Status";
import Community from "./components/SideBar/Community/community";
import Channel from "./components/SideBar/Channel/channel";
import MetaAi from "./components/SideBar/MetaAi/metaai";
import Profile from "./components/SideBar/Profile/profile";
import Setting from "./components/SideBar/Setting/setting";
import "./App.css";

function WhatsApp({ setIsAuthenticated, onlineUsers, socket, userData, handleLogout }) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [activePanel, setActivePanel] = useState("chats");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (userData) {
      setCurrentUser(userData);
    } else {
      const fetchUser = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/check`, {
            method: "GET",
            credentials: "include",
          });
          if (response.ok) {
            const userData = await response.json();
            setCurrentUser(userData);
            
            if (socket && userData._id) {
              socket.emit("userOnline", userData._id);
            }
          } else {
            console.error("User not authenticated");
          }
        } catch (error) {
          console.error("Error fetching user", error);
        }
      };

      fetchUser();
    }
  }, [userData, socket]);

  const onLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: "POST", 
        credentials: "include",
      });
      
      if (response.ok) {
        if (handleLogout) {
          handleLogout();
        } else {
          setIsAuthenticated(false);
        }
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <div className={`whatsapp-container ${selectedChat ? 'chat-active' : ''}`}>
      <div className="appSidebar">
        <Sidebar setActivePanel={setActivePanel} />
      </div>

      <div className="left-section">
        {activePanel === "chats" && (
          <AllChat 
            setSelectedChat={setSelectedChat} 
            onlineUsers={onlineUsers} 
            setIsAuthenticated={setIsAuthenticated}
            onLogout={onLogout}
            currentUser={currentUser}
          />
        )}
        {activePanel === "status" && <Status />}
        {activePanel === "community" && <Community />}
        {activePanel === "channel" && <Channel />}
        {activePanel === "meta-ai" && <MetaAi />}
        {activePanel === "profile" && <Profile currentUser={currentUser} />}
        {activePanel === "setting" && (
          <Setting 
            setIsAuthenticated={setIsAuthenticated} 
            onLogout={onLogout}
          />
        )}
      </div>

      <div className="right-section">
        {selectedChat ? (
          <>
            <ChatAreaHeader 
              selectedChat={selectedChat} 
              onlineUsers={onlineUsers} 
              setSelectedChat={setSelectedChat}
            />
            <ChatArea 
              selectedChat={selectedChat} 
              currentUser={currentUser} 
              socket={socket}
            />
          </>
        ) : (
          <DefaultPage />
        )}
      </div>
    </div>
  );
}

export default WhatsApp;