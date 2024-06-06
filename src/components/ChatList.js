// ChatList.js
import React from 'react';
import '../style2.css'; // Upewnij się, że ścieżka jest poprawna

const ChatList = ({ chats, onSelectChat, currentUserEmail }) => {
  return (
    <ul className="chat-list">
      {chats.map(chat => (
        <li
          key={chat.id}
          onClick={() => onSelectChat(chat.id)}
          className={chat.participants.includes(currentUserEmail) ? 'selected' : ''}
        >
          {chat.participants && chat.participants.length > 1
            ? chat.participants.filter(email => email !== currentUserEmail).join(', ')
            : 'Unknown participants'}
        </li>
      ))}
    </ul>
  );
};

export default ChatList;
