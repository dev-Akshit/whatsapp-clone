import React, { useState, useEffect } from "react";
import styles from "./setting.module.css";
import { FaUser, FaLock, FaCommentDots, FaBell, FaKeyboard, FaQuestionCircle, FaSignOutAlt, FaSearch } from "react-icons/fa";

const Settings = () => {
  const [user, setUser] = useState({
    username: "",
    about: "",
    profilePic: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/check", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const userData = await response.json();
          setUser({
            username: userData.username,
            about: userData.about || "Hey there! I am using WhatsApp.",
            profilePic: userData.profilePic
              ? `http://localhost:5000/${userData.profilePic}`
              : "./defaultPfp.png",
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const settingsOptions = [
    { id: 1, name: "Account", icon: <FaUser /> },
    { id: 2, name: "Privacy", icon: <FaLock /> },
    { id: 3, name: "Chats", icon: <FaCommentDots /> },
    { id: 4, name: "Notifications", icon: <FaBell /> },
    { id: 5, name: "Keyboard shortcuts", icon: <FaKeyboard /> },
    { id: 6, name: "Help", icon: <FaQuestionCircle /> },
  ];

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <h2 className={styles.title}>Settings</h2>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search settings"
          className={styles.searchInput}
        />
      </div>

      {/* Profile Section */}
      <div className={styles.profileSection}>
        <img
          src={user.profilePic}
          alt="Profile"
          className={styles.profileImage}
        />
        <div className={styles.profileText}>
          <p className={styles.profileName}>{user.username}</p>
          <p className={styles.profileStatus}>{user.about}</p>
        </div>
      </div>

      {/* Settings Options */}
      <div className={styles.optionsList}>
        {settingsOptions.map((option) => (
          <div key={option.id} className={styles.optionItem}>
            <span className={styles.optionIcon}>{option.icon}</span>
            <span className={styles.optionText}>{option.name}</span>
          </div>
        ))}
      </div>

      {/* Logout Section */}
      <div className={styles.logout}>
        <FaSignOutAlt className={styles.logoutIcon} />
        <span className={styles.logoutText} onClick={handleLogout}>
          Log out
        </span>
      </div>
    </div>
  );
};

export default Settings;
