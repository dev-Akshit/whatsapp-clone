import React, { useState } from "react";
import styles from "./ChatAreaFooter.module.css";
import { LuSticker } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { MdKeyboardVoice } from "react-icons/md";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { IoCloseCircle } from "react-icons/io5";

const ChatAreaFooter = ({ onSendMessage, onSendImage }) => {
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleSendMessage = () => {
    if (!message.trim() && !imageFile) return;
    
    if (imageFile) {
      onSendImage(imageFile);
      setImageFile(null);
      setImagePreview(null);
    }
    
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (message.trim() || imageFile)) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className={styles.container}>
      {imagePreview && (
        <div className={styles.imagePreviewContainer}>
          <div className={styles.imagePreview}>
            <img src={imagePreview} alt="Preview" />
            <button 
              className={styles.removeImageBtn} 
              onClick={handleRemoveImage}
              aria-label="Remove image"
            >
              <IoCloseCircle size="24" />
            </button>
          </div>
        </div>
      )}
      
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
          onClick={(message.trim() || imageFile) ? handleSendMessage : null}
        >
          {message.trim() || imageFile ? (
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
    </div>
  );
};

export default ChatAreaFooter;