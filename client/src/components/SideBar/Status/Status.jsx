import React from "react";
import styles from "./status.module.css";
import { FaPlusCircle } from "react-icons/fa";

const Status = () => {
  const recentStatuses = [
    { name: "John Doe", time: "10 min ago", img: "johndoe.png" },
    { name: "Jane Smith", time: "30 min ago", img: "janesmith.png" },
    { name: "Alice Brown", time: "1 hr ago", img: "alicebrown.png" },
    { name: "Michael Scott", time: "2 hrs ago", img: "michaelscott.png" },
    { name: "Pam Beesly", time: "3 hrs ago", img: "pambeesly.png" },
    { name: "Jim Halpert", time: "4 hrs ago", img: "jimhalpert.png" },
    { name: "Smith", time: "Today at 9:59 PM", img: "Smith.png" },
    { name: "Mark", time: "Today at 9:20 AM", img: "Mark.png" }
  ];

  return (
    <div className={styles.statusContainer}>
      {/* Header */}
      <div className={styles.header}>Status</div>

      {/* My Status */}
      <div className={styles.myStatus}>
        <div className={styles.profilePic}></div>
        <div className={styles.statusInfo}>
          <strong>My Status</strong>
          <p>Click to add status update</p>
        </div>
        <FaPlusCircle className={styles.addIcon} />
      </div>

      {/* Recent Statuses */}
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

      {/* Muted Section */}
      <div className={styles.sectionTitleMuted}>
        Muted <span className={styles.showMuted}>Show</span>
      </div>

      {/* Footer Encryption Message */}
      <div className={styles.encryptionMessage}>
        🔒 Your status updates are <span className={styles.encryptionHighlight}>end-to-end encrypted</span>
      </div>
    </div>
  );
};

export default Status;
