import React from "react";
import styles from "./ChatArea.module.css";

const messages = [
//   { id: 1, text: "Hello!", sender: "me" },
//   { id: 2, text: "Hey, how are you?", sender: "other" },
//   { id: 3, text: "I'm good! What about you?", sender: "me" },
];

const ChatArea = () => {
  return (
    <div className={styles.chatArea}>
      <div className={styles.messages}>
        {messages.map((msg) => (
          <div key={msg.id} className={msg.sender === "me" ? styles.myMessage : styles.otherMessage}>
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatArea;
