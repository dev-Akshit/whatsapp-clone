import React, { useState } from "react";
import styles from "./ChatAreaFooter.module.css";
import { LuSticker } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { MdKeyboardVoice } from "react-icons/md";
import { PiPaperPlaneTiltBold } from "react-icons/pi";

const ChatAreaFooter = ({ onSendMessage, onSendImage }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!message.trim()) return;
    onSendMessage(message.trim());
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && message.trim()) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) onSendImage(file);
  };

  return (
    <div className={styles.inputArea}>
      <label htmlFor="fileInput" className={styles.iconButton}>
        <FiPlus size="28" title="Attach" />
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </label>

      <div className={styles.inputWrapper}>
        <LuSticker size="24" className={styles.stickerIcon} title="Stickers" />
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <button
        type="submit"
        className={styles.iconButton}
        onClick={message.trim() ? handleSendMessage : null}
      >
        {message.trim() ? (
          <PiPaperPlaneTiltBold
            size="26"
            title="Send"
            className={styles.sendButton}
          />
        ) : (
          <MdKeyboardVoice size="26" title="Voice" />
        )}
      </button>
    </div>
  );
};

export default ChatAreaFooter;
