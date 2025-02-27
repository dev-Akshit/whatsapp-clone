import React from "react";
import styles from "./setting.module.css";
import { FaUser, FaLock, FaCommentDots, FaBell, FaKeyboard, FaQuestionCircle, FaSignOutAlt, FaSearch } from "react-icons/fa";

const Settings = () => {
  const settingsOptions = [
    { id: 1, name: "Account", icon: <FaUser /> },
    { id: 2, name: "Privacy", icon: <FaLock /> },
    { id: 3, name: "Chats", icon: <FaCommentDots /> },
    { id: 4, name: "Notifications", icon: <FaBell /> },
    { id: 5, name: "Keyboard shortcuts", icon: <FaKeyboard /> },
    { id: 6, name: "Help", icon: <FaQuestionCircle /> },
  ];

  return (
    <div className={styles.settingsContainer}>
      <h2 className={styles.title}>Settings</h2>

      <div className={styles.searchBar}>
        <FaSearch className={styles.searchIcon} />
        <input type="text" placeholder="Search settings" className={styles.searchInput} />
      </div>

      <div className={styles.profileSection}>
        <img src="./defaultPfp.jpg" alt="Profile" className={styles.profileImage} />
        <div className={styles.profileText}>
          <p className={styles.profileName}>Akshit Deshwal</p>
          <p className={styles.profileStatus}>.</p>
        </div>
      </div>

      <div className={styles.optionsList}>
        {settingsOptions.map((option) => (
          <div key={option.id} className={styles.optionItem}>
            <span className={styles.optionIcon}>{option.icon}</span>
            <span className={styles.optionText}>{option.name}</span>
          </div>
        ))}
      </div>

      <div className={styles.logout}>
        <FaSignOutAlt className={styles.logoutIcon} />
        <span 
        className={styles.logoutText} 
        onClick={localStorage.removeItem('token')} >Log out</span>
      </div>
    </div>
  );
};

export default Settings;
