import React from "react";
import styles from "./defaultPage.module.css";
import whatsappLogo from "../../assets/whatsapplogo.jpg";

const DefaultPage = () => {
  return (
    <div className={styles.defaultContainer}>
      <div className={styles.content}>
        <img
          src={whatsappLogo}
          alt="WhatsApp Logo"
          className={styles.whatsappLogo}
        />
        <h2>Download WhatsApp for Windows</h2>
        <p>
          Make calls, share your screen and get a faster experience when you
          download the Windows app.
        </p>
        <button className={styles.downloadButton}>Download</button>
        <p className={styles.encryptionNote}>
          🔒 Your personal messages are end-to-end encrypted
        </p>
      </div>
    </div>
  );
};

export default DefaultPage;
