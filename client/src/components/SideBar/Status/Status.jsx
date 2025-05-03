import React from "react";
import styles from "./status.module.css";
import { FaPlusCircle } from "react-icons/fa";

const Status = () => {
  const recentStatuses = [
    { name: "John Doe", time: "10 min ago", img: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "Jane Smith", time: "30 min ago", img: "https://randomuser.me/api/portraits/women/2.jpg" },
    { name: "Alice Brown", time: "1 hr ago", img: "https://randomuser.me/api/portraits/women/3.jpg" },
    { name: "Michael Scott", time: "2 hrs ago", img: "https://randomuser.me/api/portraits/men/4.jpg" },
    { name: "Pam Beesly", time: "3 hrs ago", img: "https://randomuser.me/api/portraits/women/5.jpg" },
    { name: "Jim Halpert", time: "4 hrs ago", img: "https://randomuser.me/api/portraits/men/6.jpg" },
    { name: "Smith", time: "Today at 9:59 PM", img: "https://randomuser.me/api/portraits/men/7.jpg" },
    { name: "Mark", time: "Today at 9:20 AM", img: "https://randomuser.me/api/portraits/men/8.jpg" }
  ];

  return (
    <div className={styles.statusContainer}>
      <h2 className={styles.header}>Status</h2>

      <div className={styles.myStatus}>
        <div className={styles.profilePic}></div>
        <div className={styles.statusInfo}>
          <strong>My Status</strong>
          <p>Click to add status update</p>
        </div>
        <FaPlusCircle className={styles.addIcon} />
      </div>

      <div className={styles.sectionTitle}>Recent</div>
      <div className={styles.recentStatuses}>
        {recentStatuses.map((status, index) => (
          <div key={index} className={styles.statusItem}>
            <img src={status.img} alt={status.name} className={styles.statusImg} />
            <div>
              <strong>{status.name}</strong>
              <p>{status.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.sectionTitleMuted}>
        Muted <span className={styles.showMuted}>Show</span>
      </div>

      <div className={styles.encryptionMessage}>
        🔒 Your status updates are <span className={styles.encryptionHighlight}>end-to-end encrypted</span>
      </div>
    </div>
  );
};

export default Status;
