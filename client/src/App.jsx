import Sidebar from './components/SideBar/SideBar';
import ChatArea from './components/ChatArea/ChatArea';
import ChatAreaHeader from './components/ChatAreaHeader/ChatAreaHeader';
import AllChat from './components/AllChat/AllChat';
import ChatAreaFooter from './components/ChatAreaFooter/ChatAreaFooter';
import DefaultPage from './components/DefaultPage/defaultPage';

import { useState } from 'react';
import './App.css';

function App() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div style={{ display: "flex"}}>
      <Sidebar />
      
      {/* Left Section (All Chats) */}
      <div style={{ flex: 1}}>
        <AllChat setSelectedChat={setSelectedChat} />
      </div>

      {/* Right Section (Chat Area) */}
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
