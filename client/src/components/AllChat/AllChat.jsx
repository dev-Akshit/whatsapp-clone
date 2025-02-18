import React, {useState} from "react";
import styles from "./AllChat.module.css";
import Header from '../AllChatHeader/AllChatHeader'

const chats = [
  { id: 1, name: "John Doe", message: "Hey, how are you?", time: "10:30 AM" },
  { id: 2, name: "Alice", message: "Let's meet tomorrow!", time: "9:15 AM" },
  { id: 3, name: "Michael", message: "Check this out!", time: "8:45 AM" },
  { id: 4, name: "Emily", message: "I'm available!", time: "7:30 AM" },
  { id: 5, name: "David", message: "Hi, what's up?", time: "6:15 AM" },
  { id: 6, name: "Sarah", message: "See you later!", time: "5:45 AM" },
  { id: 7, name: "Jessica", message: "I'm available too!", time: "4:30 AM" },
  { id: 8, name: "Olivia", message: "Nice to meet you!", time: "3:15 AM" },
  { id: 9, name: "Chloe", message: "How are you doing?", time: "2:45 AM" },
];

const AllChat = ({setSelectedChat}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className={styles.chatContainer}>

      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className={styles.chatList}>
        {filteredChats.length > 0 ? (
          filteredChats.map(chat => (
            <div
              key={chat.id}
              className={styles.chatItem}
              onClick={() => setSelectedChat(chat)}
            >
              <div className={styles.avatar}></div>
              <div className={styles.chatInfo}>
                <div className={styles.chatHeader}>
                  <span className={styles.chatName}>{chat.name}</span>
                  <span className={styles.chatTime}>{chat.time}</span>
                </div>
                <p className={styles.chatMessage}>{chat.message}</p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noChats}>No chats found</p>
        )}
      </div>
    </div>
  );
};

export default AllChat;
