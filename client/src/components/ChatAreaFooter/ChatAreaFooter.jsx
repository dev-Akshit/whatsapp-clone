import React, { useState } from "react";
import styles from "./ChatAreaFooter.module.css";
import { LuSticker } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { MdKeyboardVoice } from "react-icons/md";
import { PiPaperPlaneTiltBold } from "react-icons/pi";

const ChatAreaFooter = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage( message );
      setMessage(""); 
      // console.log( "input msg:",message);
    }
  };

  // Handle Enter key for sending messages
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.inputArea}>
      <label htmlFor="fileInput" className={styles.iconButton}>
        <FiPlus size="28" title="Attach" />
      </label>

      {/* Message Input */}
      <div className={styles.inputWrapper}>
        <LuSticker size="24" className={styles.stickerIcon} />
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Send Button */}
      <button type="submit" className={styles.iconButton} >
        {message.trim() ? (
          <PiPaperPlaneTiltBold
            size="26"
            title="Send"
            className={styles.sendButton}
            onClick={handleSendMessage}
          />
        ) : (
          <MdKeyboardVoice size="26" title="Voice" />
        )}
      </button>
    </div>
  );
};

export default ChatAreaFooter;
