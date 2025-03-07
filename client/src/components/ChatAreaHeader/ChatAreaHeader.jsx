import React from "react";
import styles from "./ChatAreaHeader.module.css";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { IoVideocam } from "react-icons/io5";


const ChatAreaHeader = ({ selectedChat }) => {
 
  const getImageUrl = (profilePic) => {
    return profilePic ? `http://localhost:5000/${profilePic}`
      : "./defaultPfp.png";
  }
  return (
    <div className={styles.header}>
      <div className={styles.userInfo}>
      <img
          src={getImageUrl(selectedChat?.profilePic)}
          alt={selectedChat?.username || "User"}
          className={styles.avatar}
        />
        <div className={styles.name}>
          {selectedChat ? selectedChat.username : "Select a chat"}
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
