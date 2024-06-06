// ChatWindow.js
import React, { useState, useEffect } from 'react';
import { getMessages, sendMessage } from '../data/chatService';

const ChatWindow = ({ chatId, currentUserEmail }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const chatMessages = await getMessages(chatId);
        setMessages(chatMessages);
      } catch (error) {
        console.error("Error fetching messages: ", error);
      }
    };

    fetchMessages();
  }, [chatId]);

  const handleSendMessage = async () => {
    try {
      await sendMessage(chatId, currentUserEmail, messageInput);
      setMessages([...messages, { sender: currentUserEmail, text: messageInput }]);
      setMessageInput('');
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const chatParticipant = messages.length > 0 && messages[0].participants ? messages[0].participants.filter(email => email !== currentUserEmail).join(', ') : "Loading...";

  return (
    <div className="chat-window">
      <div className="chat-header">
        {chatParticipant}
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender === currentUserEmail ? 'outgoing' : 'incoming'}`}>
            <strong>{message.sender === currentUserEmail ? 'You' : message.sender}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input 
          type="text" 
          placeholder="Type a message" 
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={handleSendMessage} className="button primary">Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
