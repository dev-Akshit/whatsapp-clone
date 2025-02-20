import React from "react";
import { FaPen } from "react-icons/fa";
import styles from "./profile.module.css";

const Profile = () => {
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
          <span className={styles.userName}>Akshit Deshwal</span>
          <FaPen className={styles.editIcon} />
        </div>
        <p className={styles.description}>
          This is not your username or PIN. This name will be visible to your WhatsApp contacts.
        </p>
      </div>

      {/* About Section */}
      <div className={styles.infoSection}>
        <p className={styles.label}>About</p>
        <div className={styles.infoRow}>
          <span className={styles.userAbout}>.</span>
          <FaPen className={styles.editIcon} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
