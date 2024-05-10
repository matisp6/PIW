import React, { useState } from 'react';

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
import cards1 from './assets/cards1.jpg';
import cards2 from './assets/cards2.jpg';
import cards3 from './assets/cards3.jpg';
import cards4 from './assets/cards4.jpg';

function App() {
  const [hotels, setHotels] = useState([
    {
      id: 1,
      image: cards1,
      additionalImage1: cards1,
      additionalImage2: cards1, 
      location: "Florence",
      name: "Harmony Hideaway Hotel",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec.",
      desc_long: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec leo ligula. Etiam fermentum est in euismod egestas. Curabitur at condimentum ligula. Phasellus nunc velit, facilisis fermentum congue ac, cursus at leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam nec sapien vitae neque scelerisque tempus. Vestibulum hendrerit tellus ut pulvinar feugiat. Nullam iaculis vitae justo sit amet tempus. Nam nunc nunc, porttitor sed turpis quis, feugiat egestas leo. Phasellus consequat magna ante, ac aliquam felis convallis sit amet. Sed massa lorem, iaculis ac vestibulum ac, tempus a tortor. Ut posuere ipsum nec condimentum vehicula. Curabitur orci velit, aliquam vel arcu quis, semper congue ligula.",
      price: "100€",
      rating: "★★★★★",
      isFavorited: true
    },
    {
      id: 2,
      image: cards2,
      additionalImage1: cards2,
      additionalImage2: cards2, 
      location: "Madrid",
      name: "Serene Retreat",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec.",
      desc_long: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec leo ligula. Etiam fermentum est in euismod egestas. Curabitur at condimentum ligula. Phasellus nunc velit, facilisis fermentum congue ac, cursus at leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam nec sapien vitae neque scelerisque tempus. Vestibulum hendrerit tellus ut pulvinar feugiat. Nullam iaculis vitae justo sit amet tempus. Nam nunc nunc, porttitor sed turpis quis, feugiat egestas leo. Phasellus consequat magna ante, ac aliquam felis convallis sit amet. Sed massa lorem, iaculis ac vestibulum ac, tempus a tortor. Ut posuere ipsum nec condimentum vehicula. Curabitur orci velit, aliquam vel arcu quis, semper congue ligula.",
      price: "70€",
      rating: "★★★★☆",
      isFavorited: false
    },
    {
      id: 3,
      image: cards3,
      additionalImage1: cards3,
      additionalImage2: cards3, 
      location: "Sintra",
      name: "Palm Springs",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec.",
      desc_long: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec leo ligula. Etiam fermentum est in euismod egestas. Curabitur at condimentum ligula. Phasellus nunc velit, facilisis fermentum congue ac, cursus at leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam nec sapien vitae neque scelerisque tempus. Vestibulum hendrerit tellus ut pulvinar feugiat. Nullam iaculis vitae justo sit amet tempus. Nam nunc nunc, porttitor sed turpis quis, feugiat egestas leo. Phasellus consequat magna ante, ac aliquam felis convallis sit amet. Sed massa lorem, iaculis ac vestibulum ac, tempus a tortor. Ut posuere ipsum nec condimentum vehicula. Curabitur orci velit, aliquam vel arcu quis, semper congue ligula.",
      price: "65€",
      rating: "★★★★☆",
      isFavorited: false
    },
    {
      id: 4,
      image: cards4,
      additionalImage1: cards4,
      additionalImage2: cards4, 
      location: "Sienna",
      name: "Oasis Resort",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus quis felis a venenatis. Suspendisse accumsan aliquam lorem, sit amet ultricies justo tristique nec.",
      desc_long: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec leo ligula. Etiam fermentum est in euismod egestas. Curabitur at condimentum ligula. Phasellus nunc velit, facilisis fermentum congue ac, cursus at leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam nec sapien vitae neque scelerisque tempus. Vestibulum hendrerit tellus ut pulvinar feugiat. Nullam iaculis vitae justo sit amet tempus. Nam nunc nunc, porttitor sed turpis quis, feugiat egestas leo. Phasellus consequat magna ante, ac aliquam felis convallis sit amet. Sed massa lorem, iaculis ac vestibulum ac, tempus a tortor. Ut posuere ipsum nec condimentum vehicula. Curabitur orci velit, aliquam vel arcu quis, semper congue ligula.",
      price: "115€",
      rating: "★★★★★",
      isFavorited: true
    }
  ]);

  const addHotel = (newHotel) => {
    setHotels(prevHotels => [
      ...prevHotels,
      { ...newHotel, id: prevHotels.length + 1 } 
    ]);
  };

    return (
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <BrowseSection hotels={hotels} />
              </>
            } />
            <Route path="/hotel/:id" element={<HotelDetails hotels={hotels} />} />
            <Route path="/add-new-offers" element={<AddHotelForm addHotel={addHotel}/>} />
          </Routes>
        </div>
      </Router>
    );
  }


export default App;
