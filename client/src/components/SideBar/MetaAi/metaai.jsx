import React from "react";
import styles from "./metaai.module.css";

const MetaAI = () => {
  return (
    <div className={styles.metaContainer}>
      {/* Meta AI Section */}
      <div className={styles.metaSection}>
        <img src="./MetaHead.png" alt="Meta AI" className={styles.metaImage} />
        <div className={styles.metaText}>
          <p className={styles.metaName}>Meta AI</p>
          <p className={styles.metaDescription}>Chat with Meta AI</p>
        </div>
      </div>
    </div>
  );
};

export default MetaAI;
