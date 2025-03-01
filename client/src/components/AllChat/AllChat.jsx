import React, {useState, useEffect} from "react";
import styles from "./AllChat.module.css";
import Header from '../AllChatHeader/AllChatHeader'

let index = 0;
const AllChat = ({setSelectedChat}) => {

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        const data = await response.json();
        setUsers(data);
      } catch (err){
        console.error('Failed to fetch chats', err);
      }
    }
    fetchChats();
  }, []);

  const filteredChats = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className={styles.chatContainer}>

      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className={styles.chatList}>
        {filteredChats.length > 0 ? (
          filteredChats.map(user => (
            <div
              key={index++}
              className={styles.chatItem}
              onClick={() => setSelectedChat(user)}
            >
              <div className={styles.avatar}></div>
              <div className={styles.chatInfo}>
                <div className={styles.chatHeader}>
                  <span className={styles.chatName}>{user.username}</span>
                  {/* <span className={styles.chatTime}>{user.time}</span> */}
                </div>
                {/* <p className={styles.chatMessage}>{user.message}</p> */}
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
