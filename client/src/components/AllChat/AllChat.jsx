import React, { useState, useEffect } from "react";
import styles from "./AllChat.module.css";
import Header from "../AllChatHeader/AllChatHeader";

const AllChat = ({ setSelectedChat, onlineUsers, setIsAuthenticated }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(user => {
    return user.username.toLowerCase().includes(searchQuery.toLowerCase());
  })

  // Fetch Users
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/message/users`, {
          credentials: 'include',
        });
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);

      } catch (err) {
        console.error("Failed to fetch chats", err);
      }
    };
    fetchChats();
  }, []);

  const getImageUrl = (profilePic) => {
    return profilePic ? `${import.meta.env.VITE_API_URL}/${profilePic}`
      : "./defaultPfp.png";
  }

  return (
    <div className={styles.chatContainer}>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} setIsAuthenticated={setIsAuthenticated}/>

      <div className={styles.chatList}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className={styles.chatItem}
              onClick={() => setSelectedChat(user)}
            >
              <img
                src={getImageUrl(user.profilePic)}
                alt={user.username}
                className={styles.avatar}
              />
              <div className={styles.chatInfo}>
                <div className={styles.chatHeader}>
                  <span className={styles.chatName}>
                    {user.username}
                    {onlineUsers.includes(user._id) && (
                      <span className={styles.onlineIndicator}></span>
                    )}
                  </span>
                </div>
                <p className={styles.chatMessage}>
                  Start a conversation...
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noChats}>
            {users.length > 0 ? "No matching chats found" : "No chats found"}
          </p>)}
      </div>
    </div>
  );
};

export default AllChat;
