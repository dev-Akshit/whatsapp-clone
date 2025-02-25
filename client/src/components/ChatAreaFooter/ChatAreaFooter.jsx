import React, { useState } from "react";
import styles from "./ChatAreaFooter.module.css";
import { LuSticker } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { MdKeyboardVoice } from "react-icons/md";
import { PiPaperPlaneTiltBold } from "react-icons/pi";


const ChatAreaFooter = () => {
  const [message, setMessage] = useState("");

  return (
    <div className={styles.inputArea}>
      <button className={styles.iconButton}>
        <FiPlus size="28" title="Attach" />
      </button>
      <div className={styles.inputWrapper}>
        <LuSticker size="24" className={styles.stickerIcon} />
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button className={styles.iconButton}>
        {message.trim() ? (
          <PiPaperPlaneTiltBold size="26" title="Send" className={styles.sendButton} />
        ) : (
          <MdKeyboardVoice size="26" title="Voice" />
        )}
      </button>
    </div>
  );
};

export default ChatAreaFooter;
