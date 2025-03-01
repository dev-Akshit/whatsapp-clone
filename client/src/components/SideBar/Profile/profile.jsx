import React, { useState } from "react";
import { FaPen, FaCheck } from "react-icons/fa";
import styles from "./profile.module.css";

const Profile = () => {
  const [userName, setUserName] = useState("Akshit Deshwal");
  const [userAbout, setUserAbout] = useState(".");

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);

  const handleNameChange = (e) => setUserName(e.target.value);
  const handleAboutChange = (e) => setUserAbout(e.target.value);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profilePicSection}>
        <div className={styles.profilePic}>
          <img src="./defaultPfp.jpg" alt="Profile" className={styles.profileImage} />
          <p className={styles.addPhotoText}>ADD PROFILE PHOTO</p>
        </div>
      </div>
      
      <div className={styles.infoSection}>
        <p className={styles.label}>Your name</p>
        <div className={styles.infoRow}>
          {isEditingName ? (
            <input
              type="text"
              value={userName}
              onChange={handleNameChange}
              className={styles.editInput}
              autoFocus
            />
          ) : (
            <span className={styles.userName}>{userName}</span>
          )}
          {isEditingName ? (
            <FaCheck
              className={styles.editIcon}
              onClick={() => setIsEditingName(false)}
            />
          ) : (
            <FaPen
              className={styles.editIcon}
              onClick={() => setIsEditingName(true)}
            />
          )}
        </div>
        <p className={styles.description}>
          This is not your username or PIN. This name will be visible to your WhatsApp contacts.
        </p>
      </div>

      <div className={styles.infoSection}>
        <p className={styles.label}>About</p>
        <div className={styles.infoRow}>
          {isEditingAbout ? (
            <input
              type="text"
              value={userAbout}
              onChange={handleAboutChange}
              className={styles.editInput}
              autoFocus
            />
          ) : (
            <span className={styles.userAbout}>{userAbout}</span>
          )}
          {isEditingAbout ? (
            <FaCheck
              className={styles.editIcon}
              onClick={() => setIsEditingAbout(false)}
            />
          ) : (
            <FaPen
              className={styles.editIcon}
              onClick={() => setIsEditingAbout(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
