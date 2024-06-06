// src/data/chatService.js
import { firestore, auth } from './init';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';

export const createChat = async (currentUserEmail, otherUserEmail) => {
  try {
    const newChat = {
      participants: [currentUserEmail, otherUserEmail],
      messages: [],
    };
    const chatRef = await addDoc(collection(firestore, 'chats'), newChat);
    return { id: chatRef.id, ...newChat };
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};

export const getChats = async (userEmail) => {
  try {
    const q = query(collection(firestore, 'chats'), where('participants', 'array-contains', userEmail));
    const querySnapshot = await getDocs(q);
    const chats = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return chats;
  } catch (error) {
    console.error("Error fetching chats:", error);
    throw error;
  }
};

export const getMessages = async (chatId) => {
  const q = query(collection(firestore, `chats/${chatId}/messages`), orderBy('createdAt', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const sendMessage = async (chatId, message) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const messageData = {
    sender: user.email,
    message,
    createdAt: new Date()
  };

  await addDoc(collection(firestore, `chats/${chatId}/messages`), messageData);
};
