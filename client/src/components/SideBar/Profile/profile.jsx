import React, { useState, useEffect } from "react";
import { FaPen, FaCheck, FaCamera } from "react-icons/fa";
import styles from "./profile.module.css";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [userAbout, setUserAbout] = useState("Hey there! I am using WhatsApp.");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/check", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const currUser = await response.json();
          setUserName(currUser.username || "");
          setUserAbout(currUser.about || "Hey there! I am using WhatsApp.");
          setProfilePic(currUser.profilePic ? `http://localhost:5000/${currUser.profilePic}` : "./defaultPfp.png");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  // Handle name and about updates
  const handleNameChange = (e) => {
    setUserName(e.target.value);
    currUser.username = userName;
  }
  const handleAboutChange = (e) => {
    setUserAbout(e.target.value);
  }

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const response = await fetch("http://localhost:5000/api/auth/update-profile", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.msg);
        setProfilePic(`http://localhost:5000/${data.user.profilePic}`);
      } else {
        alert("Failed to upload profile picture.");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Error uploading profile picture.");
    }
  };

  return (
    <div className={styles.profileContainer}>
      {/* Profile Picture Section */}
      <div className={styles.profilePicSection}>
        <div className={styles.profilePic}>
          <img
            src={profilePic || "./defaultPfp.png"}
            alt="Profile"
            className={styles.profileImage}
          />
          <label htmlFor="fileInput" className={styles.addPhotoText}>
            <FaCamera /> ADD PROFILE PHOTO
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            style={{ display: "none" }}
          />
        </div>
      </div>

      {/* Name Section */}
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
          This is not your username or PIN. This name will be visible to your
          WhatsApp contacts.
        </p>
      </div>

      {/* About Section */}
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
