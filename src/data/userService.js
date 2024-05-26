import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, firestore } from "./init";
import { collection, getDocs, query, where } from "firebase/firestore";

const imageMap = {
  cards1: require('../assets/cards1.jpg'),
  cards2: require('../assets/cards2.jpg'),
  cards3: require('../assets/cards3.jpg'),
  cards4: require('../assets/cards4.jpg')
};

export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in with Google:", error);
    throw error;
  }
};

export const logout = async () => {
  await signOut(auth);
};

export const useUser = () => {
  const [user, setUser] = useState(auth?.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  return user;
};

export const getHotels = async () => {
  const hotelsCollection = collection(firestore, "hotels");
  const hotelsSnapshot = await getDocs(hotelsCollection);
  const hotelsList = hotelsSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      image: imageMap[data.image] || data.image,
      additionalImage1: imageMap[data.additionalImage1] || data.additionalImage1,
      additionalImage2: imageMap[data.additionalImage2] || data.additionalImage2
    };
  });
  return hotelsList;
};

export const getHotelById = async (id) => {
  const hotelsCollection = collection(firestore, "hotels");
  const hotelQuery = query(hotelsCollection, where("__name__", "==", id));
  const hotelSnapshot = await getDocs(hotelQuery);
  if (!hotelSnapshot.empty) {
    const data = hotelSnapshot.docs[0].data();
    return {
      id: hotelSnapshot.docs[0].id,
      ...data,
      image: imageMap[data.image] || data.image,
      additionalImage1: imageMap[data.additionalImage1] || data.additionalImage1,
      additionalImage2: imageMap[data.additionalImage2] || data.additionalImage2
    };
  } else {
    throw new Error("Hotel not found");
  }
};
