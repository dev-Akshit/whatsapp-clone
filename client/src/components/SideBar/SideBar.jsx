import React from "react";
import styles from "./Sidebar.module.css";
import { BsGear } from "react-icons/bs";
import { PiChatTextFill } from "react-icons/pi";
import { FaRegDotCircle, FaRegUserCircle } from "react-icons/fa";
import { TbMessageChatbot } from "react-icons/tb";
import { MdOutlineGroups } from "react-icons/md";
import { FaMeta } from "react-icons/fa6";

const Sidebar = ({ setActivePanel }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.topIcons}>
        <div className={styles.iconWrapper} onClick={() => setActivePanel("chats")}>
          <PiChatTextFill className={styles.icon} />
          <span className={styles.tooltip}>Chats</span>
        </div>
        <div className={styles.iconWrapper} onClick={() => setActivePanel("status")}>
          <FaRegDotCircle className={styles.icon} />
          <span className={styles.tooltip}>Status</span>
        </div>
        <div className={styles.iconWrapper} onClick={() => setActivePanel("channel")}>
          <TbMessageChatbot className={styles.icon} />
          <span className={styles.tooltip}>Channels</span>
        </div>
        <div className={styles.iconWrapper} onClick={() => setActivePanel("community")}>
          <MdOutlineGroups className={styles.icon} />
          <span className={styles.tooltip}>Communities</span>
        </div>
        <div className={styles.iconWrapper} onClick={() => setActivePanel("meta-ai")}>
          <FaMeta className={styles.icon} />
          <span className={styles.tooltip}>Meta AI</span>
        </div>
      </div>
      <div className={styles.bottomIcons}>
        <div className={styles.iconWrapper} onClick={() => setActivePanel("setting")}>
          <BsGear className={styles.icon} />
          <span className={styles.tooltip}>Settings</span>
        </div>
        <div className={styles.iconWrapper} onClick={() => setActivePanel("profile")}>
          <FaRegUserCircle className={styles.icon} />
          <span className={styles.tooltip}>Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
