import React, { useState, useEffect } from "react";
import styles from "./AllChat.module.css";
import Header from "../AllChatHeader/AllChatHeader";

const AllChat = ({ setSelectedChat }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastMessages, setLastMessages] = useState({});

  // Load User Profile Picture
  // useEffect(() => {
  //   const storedPic = localStorage.getItem("profilePic");
  //   if (storedPic) {
  //     setProfilePic(`http://localhost:5000${storedPic}`);
  //   }
  // }, []);
  // Fetch Users
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/message/users", {
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
    return profilePic ? `http://localhost:5000/${profilePic}`
      : "./defaultPfp.png";
  }

  // Fetch Last Message for Each User
  // const fetchLastMessage = async (userId) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/messages/fetch?user1=${currUser}&user2=${userId}`
  //     );
  //     const data = await response.json();
  //     if (data.length > 0) {
  //       setLastMessages((prev) => ({
  //         ...prev,
  //         [userId]: data[data.length - 1].content,
  //       }));
  //     }
  //   } catch (err) {
  //     console.error("Failed to fetch last message", err);
  //   }
  // };

  // Load Last Messages
  // useEffect(() => {
  //   users.forEach((user) => fetchLastMessage(user._id));
  // }, [users]);

  return (
    <div className={styles.chatContainer}>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className={styles.chatList}>
        {users.length > 0 ? (
          users.map((user) => (
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
                  <span className={styles.chatName}>{user.username}</span>
                </div>
                <p className={styles.chatMessage}>
                  {lastMessages[user._id] || "Start a conversation..."}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noChats}>No chats found</p>
        )}
      </div>
    </div>
  );
};

export default AllChat;
