import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import styles from './ChatArea.module.css';
import ChatInput from '../ChatAreaFooter/ChatAreaFooter';

const socket = io('http://localhost:5000/');

const ChatArea = ({ chatId, currentUserId }) => {
  const [messages, setMessages] = useState([]);

  // Join the chat room on mount
  useEffect(() => {
    if(chatId){
      socket.emit('joinChat', {chatId});
    }

    // Listen for incoming messages
    socket.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [chatId]);

  // Send message
  const sendMessage = (newMessage) => {
    if (!newMessage.trim()) return;

    // Emit message to server
    socket.emit('sendMessage', {
      chatId,
      senderId: currentUserId,
      content: newMessage,
    });
  };

  return (
    <div className={styles.chatArea}>
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === currentUserId ? styles.myMessage : styles.otherMessage}>
            {msg.content}
          </div>
        ))}
      </div>

      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatArea;
