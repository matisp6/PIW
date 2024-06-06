// Chat.js
import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, addDoc, orderBy } from "firebase/firestore";
import { firestore } from "../data/init";
import { useUser } from "../data/userService";
import "../style2.css";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const user = useUser();

  useEffect(() => {
    if (user) {
      const q = query(collection(firestore, "chats"), where("participants", "array-contains", user.email));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedChats = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setChats(fetchedChats);
      });
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (selectedChat) {
      const q = query(collection(firestore, "chats", selectedChat.id, "messages"), orderBy("timestamp"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => doc.data());
        setMessages(fetchedMessages);
      });
      return () => unsubscribe();
    }
  }, [selectedChat]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !selectedChat) return;
    await addDoc(collection(firestore, "chats", selectedChat.id, "messages"), {
      text: newMessage,
      sender: user.email,
      timestamp: new Date(),
    });
    setNewMessage("");
  };

  const handleStartChat = async (email) => {
    if (!email || email === user.email) return;
    const chatExists = chats.find((chat) => chat.participants.includes(email));
    if (!chatExists) {
      await addDoc(collection(firestore, "chats"), {
        participants: [user.email, email],
      });
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-list">
        <input
          type="text"
          placeholder="Enter user email to chat"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={() => handleStartChat(newMessage)}>Start Chat</button>
        <div className="chat-items">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${selectedChat && selectedChat.id === chat.id ? "selected" : ""}`}
              onClick={() => setSelectedChat(chat)}
            >
              {chat.participants.filter((participant) => participant !== user.email).join(", ")}
            </div>
          ))}
        </div>
      </div>
      <div className="chat-messages">
        {selectedChat ? (
          <>
            <div className="messages-list">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender === user.email ? "sent" : "received"}`}>
                  <span className="message-sender">{msg.sender}</span>
                  <span className="message-text">{msg.text}</span>
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Chat;
