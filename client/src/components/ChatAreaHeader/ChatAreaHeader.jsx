import React from "react";
import styles from "./ChatAreaHeader.module.css";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { IoVideocam } from "react-icons/io5";

const ChatAreaHeader = ({ selectedChat, onlineUsers }) => {
  const getImageUrl = (profilePic) => {
    return profilePic ? `http://localhost:5000/${profilePic}`
      : "./defaultPfp.png";
  }
  // Check if the selected user is online
  const isUserOnline = selectedChat && onlineUsers?.includes(selectedChat._id);
  // console.log(selectedChat._id);
  return (
    <div className={styles.header}>
      <div className={styles.userInfo}>
        <img
          src={getImageUrl(selectedChat?.profilePic)}
          alt={selectedChat?.username || "User"}
          className={styles.avatar}
        />
        <div className={styles.userDetails}>
          <div className={styles.name}>
            {selectedChat ? selectedChat.username : "Select a chat"}
          </div>
          {selectedChat && (
            <div className={styles.status}>
              {isUserOnline ? (
                <span className={styles.online}>Online</span>
              ) : (
                <span className={styles.offline}>Offline</span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={styles.icons}>
        <IoVideocam size="24" className={styles.icon} />
        <FaSearch className={styles.icon} />
        <FaEllipsisV className={styles.icon} />
      </div>
    </div>
  );
};

export default ChatAreaHeader;