import { useEffect, useState, useRef } from "react";
import styles from "./ChatArea.module.css";
import ChatInput from "../ChatAreaFooter/ChatAreaFooter";
import { FiCheck } from "react-icons/fi";

const ChatArea = ({ selectedChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Join room and fetch chat history
  useEffect(() => {
    if (!socket || !selectedChat || !currentUser) return;

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

    socket.emit('markAsSeen', {
      senderId: selectedChat._id,
      receiverId: currentUser._id
    });
  }, [socket, selectedChat, currentUser]);

  // Send text message
  const sendMessage = (messageText) => {
    if (!messageText.trim() || !socket || !currentUser || !selectedChat) return;

    const messageData = {
      senderId: currentUser._id,
      receiverId: selectedChat._id,
      text: messageText,
      status: 'sent', // Initial status
      timestamp: new Date().toISOString()
    };

    // Add locally for sender
    setMessages((prev) => [...prev, messageData]);

    // Emit to server
    socket.emit('sendMessage', messageData);
  };
  
  // Receive messages
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (newMessage) => {
      console.log("New message received:", newMessage);

      if (newMessage.senderId === selectedChat?._id) {
        socket.emit('markAsSeen', {
          senderId: newMessage.senderId,
          receiverId: currentUser._id,
          messageId: newMessage._id
        });
      }

      setMessages((prev) => [...prev, newMessage]);
    };

    const handleMessageSeen = ({ messageIds, senderId, receiverId }) => {
      // Update seen status for messages
      if (senderId === currentUser._id ) {
        setMessages(prev =>
          prev.map(msg =>
            messageIds.includes(msg._id) ||
              (msg.senderId === senderId && msg.receiverId === receiverId && msg.status !== 'seen')
              ? { ...msg, status: 'seen' }
              : msg
          )
        );
      }
    };

    socket.off('receiveMessage');
    socket.on('receiveMessage', handleReceiveMessage);

    socket.off('messageSeen');
    socket.on('messageSeen', handleMessageSeen);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
      socket.off('messageSeen', handleMessageSeen);
    };
  }, [socket, currentUser, selectedChat]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView(
        {
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
    }
  }, [messages])

  // Send image message
  const sendImage = async (imageFile) => {
    if (!imageFile || !socket || !currentUser || !selectedChat) return;

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("senderId", currentUser._id);
    formData.append("receiverId", selectedChat._id);
    formData.append("status", "sent");

    try {
      const response = await fetch("http://localhost:5000/api/message/image", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        const newImageMessage = await response.json();

        setMessages((prev) => [...prev, newImageMessage]);
        socket.emit("sendImage", {...newImageMessage, alreadySaved: true});
      } else {
        console.error("Image upload failed");
      }
    } catch (err) {
      console.error("Error sending image:", err);
    }
  };

  // Render message status 
  const renderMessageStatus = (message) => {
    if (message.senderId !== currentUser._id) return null;

    if (message.status === 'seen') {
      return (
        <span className={`${styles.status} ${styles.seen}`}>
          <FiCheck className={styles.tick} />
          <FiCheck className={styles.tick} />
        </span>
      );
    } else {
      return (
        <span className={styles.status}>
          <FiCheck className={styles.tickOne} />
        </span>
      );
    }
  };

  if (!selectedChat || !currentUser) return <p>Loading chats...</p>;

  return (
    <div className={styles.chatArea}>
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.senderId === currentUser._id
                ? styles.myMessage
                : styles.otherMessage
            }
          >
            <div className={styles.messageContent}>
              {msg.text && <>{msg.text}</>}
              {msg.image && (
                <img
                  src={`http://localhost:5000${msg.image}`}
                  alt="Sent Image"
                  className={styles.chatImage}
                />
              )}
            </div>

            {renderMessageStatus(msg)}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={sendMessage} onSendImage={sendImage} />
    </div>
  );
};

export default ChatArea;