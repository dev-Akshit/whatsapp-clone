import React from "react";
import styles from "./ChatAreaHeader.module.css";
import { FaSearch, FaEllipsisV, FaArrowLeft } from "react-icons/fa";
import { IoVideocam } from "react-icons/io5";

const ChatAreaHeader = ({ selectedChat, onlineUsers, setSelectedChat }) => {
  const getImageUrl = (profilePic) => {
    return profilePic
      ? `${import.meta.env.VITE_API_URL}/${profilePic}`
      : "./defaultPfp.png";
  };

  // Check if the selected user is online
  const isUserOnline = selectedChat && onlineUsers?.includes(selectedChat._id);

  const handleBackClick = () => {
    setSelectedChat(null); // Clear selected chat to return to AllChat
  };

  return (
    <div className={styles.header}>
      <div className={styles.userInfo}>
        <FaArrowLeft
          className={styles.backIcon}
          onClick={handleBackClick}
          size="24"
        />
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