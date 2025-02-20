import React from "react";
import styles from "./community.module.css";

const Communities = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Communities</h2>

      <div className={styles.imageContainer}>
        <img src="./communityPic.png" alt="Community Icon" className={styles.mainIcon} />
      </div>

      <h3 className={styles.heading}>Stay connected with a community</h3>
      <p className={styles.description}>
        Communities bring members together in topic-based groups, and make it easy to get
        admin announcements. Any community you're added to will appear here.
      </p>

      <p className={styles.exampleLink}>See example communities ➜</p>

      <button className={styles.startButton}>Start your community</button>
    </div>
  );
};

export default Communities;
