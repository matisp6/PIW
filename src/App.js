import React, { useState, useEffect, useReducer } from 'react';

import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import HotelCard from './components/HotelCard';
import DescriptionSection from './components/DescriptionSection';
import BrowseSection from './components/BrowseSection';
import HotelDetails from './components/HotelDetails';
import AddHotelForm from './components/AddHotelForm';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './style2.css'; 
import Login from './Pages/Login'; 
import Register from './Pages/Register'; 
import cards1 from './assets/cards1.jpg';
import cards2 from './assets/cards2.jpg';
import cards3 from './assets/cards3.jpg';
import cards4 from './assets/cards4.jpg';
import { getHotels } from './data/userService';
import { SnackbarProvider } from 'notistack';
import favoritesReducer from './reducers/favoritesReducer';
import Favorites from './Pages/Favorites'; 
import Chat from './Pages/Chat';

function App() {
  const [hotels, setHotels] = useState([
    // {
    //   id: 1,
    //   image: cards1,
    //   additionalImage1: cards1,
    //   additionalImage2: cards1, 
    //   location: "Florence",
    //   name: "Harmony Hideaway Hotel",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec.",
    //   desc_long: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec leo ligula. Etiam fermentum est in euismod egestas. Curabitur at condimentum ligula. Phasellus nunc velit, facilisis fermentum congue ac, cursus at leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam nec sapien vitae neque scelerisque tempus. Vestibulum hendrerit tellus ut pulvinar feugiat. Nullam iaculis vitae justo sit amet tempus. Nam nunc nunc, porttitor sed turpis quis, feugiat egestas leo. Phasellus consequat magna ante, ac aliquam felis convallis sit amet. Sed massa lorem, iaculis ac vestibulum ac, tempus a tortor. Ut posuere ipsum nec condimentum vehicula. Curabitur orci velit, aliquam vel arcu quis, semper congue ligula.",
    //   price: "100€",
    //   rating: "★★★★★",
    //   isFavorited: true
    // },
    // {
    //   id: 2,
    //   image: cards2,
    //   additionalImage1: cards2,
    //   additionalImage2: cards2, 
    //   location: "Madrid",
    //   name: "Serene Retreat",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec.",
    //   desc_long: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec leo ligula. Etiam fermentum est in euismod egestas. Curabitur at condimentum ligula. Phasellus nunc velit, facilisis fermentum congue ac, cursus at leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam nec sapien vitae neque scelerisque tempus. Vestibulum hendrerit tellus ut pulvinar feugiat. Nullam iaculis vitae justo sit amet tempus. Nam nunc nunc, porttitor sed turpis quis, feugiat egestas leo. Phasellus consequat magna ante, ac aliquam felis convallis sit amet. Sed massa lorem, iaculis ac vestibulum ac, tempus a tortor. Ut posuere ipsum nec condimentum vehicula. Curabitur orci velit, aliquam vel arcu quis, semper congue ligula.",
    //   price: "70€",
    //   rating: "★★★★☆",
    //   isFavorited: false
    // },
    // {
    //   id: 3,
    //   image: cards3,
    //   additionalImage1: cards3,
    //   additionalImage2: cards3, 
    //   location: "Sintra",
    //   name: "Palm Springs",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec.",
    //   desc_long: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec leo ligula. Etiam fermentum est in euismod egestas. Curabitur at condimentum ligula. Phasellus nunc velit, facilisis fermentum congue ac, cursus at leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam nec sapien vitae neque scelerisque tempus. Vestibulum hendrerit tellus ut pulvinar feugiat. Nullam iaculis vitae justo sit amet tempus. Nam nunc nunc, porttitor sed turpis quis, feugiat egestas leo. Phasellus consequat magna ante, ac aliquam felis convallis sit amet. Sed massa lorem, iaculis ac vestibulum ac, tempus a tortor. Ut posuere ipsum nec condimentum vehicula. Curabitur orci velit, aliquam vel arcu quis, semper congue ligula.",
    //   price: "65€",
    //   rating: "★★★★☆",
    //   isFavorited: false
    // },
    // {
    //   id: 4,
    //   image: cards4,
    //   additionalImage1: cards4,
    //   additionalImage2: cards4, 
    //   location: "Sienna",
    //   name: "Oasis Resort",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec.",
    //   desc_long: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec leo ligula. Etiam fermentum est in euismod egestas. Curabitur at condimentum ligula. Phasellus nunc velit, facilisis fermentum congue ac, cursus at leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam nec sapien vitae neque scelerisque tempus. Vestibulum hendrerit tellus ut pulvinar feugiat. Nullam iaculis vitae justo sit amet tempus. Nam nunc nunc, porttitor sed turpis quis, feugiat egestas leo. Phasellus consequat magna ante, ac aliquam felis convallis sit amet. Sed massa lorem, iaculis ac vestibulum ac, tempus a tortor. Ut posuere ipsum nec condimentum vehicula. Curabitur orci velit, aliquam vel arcu quis, semper congue ligula.",
    //   price: "115€",
    //   rating: "★★★★★",
    //   isFavorited: true
    // }
  ]);
  const [favorites, dispatch] = useReducer(favoritesReducer, JSON.parse(localStorage.getItem('favorites')) || []);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelsList = await getHotels();
        setHotels(hotelsList);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);


  const addHotel = (newHotel) => {
    setHotels(prevHotels => [
      ...prevHotels,
      { ...newHotel, id: prevHotels.length + 1 } 
    ]);
  };

  const toggleFavorite = (hotel) => {
    const isFavorite = favorites.some(fav => fav.id === hotel.id);
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FAVORITE', payload: hotel });
    } else {
      dispatch({ type: 'ADD_FAVORITE', payload: hotel });
    }
  };

  const handleChatCreate = (newChatId) => {
    setChats(prevChats => [
      ...prevChats,
      { id: newChatId, users: [/* add users here */] }
    ]);
  };

    return (
      <SnackbarProvider maxSnack={3}>
        <Router>
          <div>
            <NavBar />
            <Routes>
              <Route path="/" element={
                <>
                  <HeroSection />
                  <BrowseSection hotels={hotels} toggleFavorite={toggleFavorite} favorites={favorites} />
                </>
              } />
              <Route path="/hotel/:id" element={<HotelDetails hotels={hotels} />} />
              <Route path="/add-new-offers" element={<AddHotelForm addHotel={addHotel} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/favorites" element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </div>
        </Router>
      </SnackbarProvider>
    );
  }


export default App;
