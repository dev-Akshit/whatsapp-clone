import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import styles from './ChatArea.module.css';
import ChatInput from '../ChatAreaFooter/ChatAreaFooter';

const ChatArea = ({ selectedChat, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      withCredentials: true,
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !selectedChat || !currentUser) return;

    const roomId = [currentUser._id, selectedChat._id].sort().join("-");
    socket.emit('joinRoom', { roomId });

    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/message/${currentUser._id}/${selectedChat._id}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();
  }, [socket, selectedChat, currentUser]);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (newMessage) => {
      console.log("Received message:", newMessage);
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, [socket]);

  //Send a new message
  const sendMessage = (messageText) => {
    if (!messageText.trim() || !socket || !currentUser || !selectedChat) return;

    const messageData = {
      senderId: currentUser._id,
      receiverId: selectedChat._id,
      text: messageText,
    };

    socket.emit('sendMessage', messageData);

    // setMessages((prev) => [...prev, messageData]);
  };

  if (!selectedChat || !currentUser) return <p>Loading chats...</p>;

  return (
    <div className={styles.chatArea}>
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.senderId === currentUser._id ? styles.myMessage : styles.otherMessage}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatArea;
