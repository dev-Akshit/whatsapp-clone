import { useEffect, useState, useRef } from "react";
import styles from "./ChatArea.module.css";
import ChatInput from "../ChatAreaFooter/ChatAreaFooter";

const ChatArea = ({ selectedChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Join room and fetch chat history
  useEffect(() => {
    if (!socket || !selectedChat || !currentUser) return;

    const roomId = [currentUser._id, selectedChat._id].sort().join("-");
    socket.emit("joinRoom", { roomId });
    console.log("Joined room:", roomId);

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
        console.error(" Failed to fetch messages:", err);
      }
    };

    fetchMessages();

    return () => {
      socket.off("joinRoom");
    };
  }, [socket, selectedChat, currentUser]);

  // Send text message
  const sendMessage = (messageText) => {
    if (!messageText.trim() || !socket || !currentUser || !selectedChat) return;

    const messageData = {
      senderId: currentUser._id,
      receiverId: selectedChat._id,
      text: messageText,
    };

    // Add locally only for sender
    setMessages((prev) => [...prev, messageData]);

    // Emit to server
    socket.emit('sendMessage', messageData);
  };

  // Receive messages
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (newMessage) => {
      console.log("New message received:", newMessage);
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.off('receiveMessage');
    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, [socket]);

  useEffect(() => { 
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages])

  // Send image message
  const sendImage = async (imageFile) => {
    if (!imageFile || !socket || !currentUser || !selectedChat) return;

    const imagePreview = URL.createObjectURL(imageFile);
    const tempMessage = {
      senderId: currentUser._id,
      receiverId: selectedChat._id,
      image: imagePreview,
    };
    setMessages((prev) => [...prev, tempMessage]);

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("senderId", currentUser._id);
    formData.append("receiverId", selectedChat._id);

    try {
      const response = await fetch("http://localhost:5000/api/message/image", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        const newImageMessage = await response.json();
        socket.emit("sendImage", newImageMessage);
      } else {
        console.error("Image upload failed");
      }
    } catch (err) {
      console.error("Error sending image:", err);
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
            {msg.text && <>{msg.text}</>}
            {msg.image && (
              <img
                src={`http://localhost:5000${msg.image}`}
                alt="Sent Image"
                className={styles.chatImage}
              />
            )}

            {/* {msg.senderId === currentUser._id && (
              <span className={styles.status}>✔✔</span>
            )} */}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={sendMessage} onSendImage={sendImage} />
    </div>
  );
};

export default ChatArea;
