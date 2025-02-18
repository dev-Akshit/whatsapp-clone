import React from "react";
import styles from "./Sidebar.module.css";
import { BsGear } from "react-icons/bs";
import { PiChatTextFill } from "react-icons/pi";
import { FaRegDotCircle, FaRegUserCircle } from "react-icons/fa";
import { TbMessageChatbot } from "react-icons/tb";
import { MdOutlineGroups } from "react-icons/md";
import { FaMeta } from "react-icons/fa6";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.topIcons}>
        <div className={styles.iconWrapper}>
          <PiChatTextFill className={styles.icon} />
          <span className={styles.tooltip}>Chats</span>
        </div>
        <div className={styles.iconWrapper}>
          <FaRegDotCircle className={styles.icon} />
          <span className={styles.tooltip}>Status</span>
        </div>
        <div className={styles.iconWrapper}>
          <TbMessageChatbot className={styles.icon} />
          <span className={styles.tooltip}>Channels</span>
        </div>
        <div className={styles.iconWrapper}>
          <MdOutlineGroups className={styles.icon} />
          <span className={styles.tooltip}>Communities</span>
        </div>
        <div className={styles.iconWrapper}>
          <FaMeta className={styles.icon} />
          <span className={styles.tooltip}>Meta Ai</span>
        </div>
      </div>
      <div className={styles.bottomIcons}>
        <div className={styles.iconWrapper}>
          <BsGear className={styles.icon} />
          <span className={styles.tooltip}>Settings</span>
        </div>
        <div className={styles.iconWrapper}>
          <FaRegUserCircle className={styles.icon} />
          <span className={styles.tooltip}>Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
