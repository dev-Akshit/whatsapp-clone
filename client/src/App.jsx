import { useState } from "react";
import Sidebar from "./components/SideBar/SideBar";
import ChatArea from "./components/ChatArea/ChatArea";
import ChatAreaHeader from "./components/ChatAreaHeader/ChatAreaHeader";
import AllChat from "./components/AllChat/AllChat";
import ChatAreaFooter from "./components/ChatAreaFooter/ChatAreaFooter";
import DefaultPage from "./components/DefaultPage/defaultPage";
import Status from "./components/SideBar/Status/Status";
import Community from "./components/SideBar/Community/community";
import Channel from "./components/SideBar/Channel/channel";
import MetaAi from "./components/SideBar/MetaAi/metaai";
import Profile from "./components/SideBar/Profile/profile";
import Setting from "./components/SideBar/Setting/setting";
import "./App.css";

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [activePanel, setActivePanel] = useState("chats");

  return (
    <div style={{display:"flex"}}>
      <Sidebar setActivePanel={setActivePanel} />

      {/* Left Section: Show AllChat or Selected Panel */}
      <div style={{ flex: 1 }}>
        {activePanel === "chats" && <AllChat setSelectedChat={setSelectedChat} />}
        {activePanel === "status" && <Status />}
        {activePanel === "community" && <Community />}
        {activePanel === "channel" && <Channel />}
        {activePanel === "meta-ai" && <MetaAi />}
        {activePanel === "profile" && <Profile />}
        {activePanel === "setting" && <Setting />}

      </div>

      {/* Right Section: Chat Area (only if a chat is selected) */}
      <div>
        {selectedChat ? (
          <>
            <ChatAreaHeader selectedChat={selectedChat} />
            <ChatArea selectedChat={selectedChat} />
            <ChatAreaFooter />
          </>
        ) : (
          <DefaultPage />
        )}
      </div>
    </div>
  );
}

export default App;
