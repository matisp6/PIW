import React from 'react';
import { Link } from 'react-router-dom';
import HotelCard from './HotelCard';

function BrowseSection({ hotels, toggleFavorite, favorites }) {
  return (
    <section id="browse" className="browse-section">
      <p className="title-middle">Explore the hotels</p>
      <input className="searchbar" placeholder="Search by hotel name, place, description etc." />
      <div className="grid hotel-cards">
        {hotels.map((hotel) => (
          <div key={hotel.id}>
            <Link to={`/hotel/${hotel.id}`}>
              <HotelCard
                hotel={hotel}
                isFavorite={favorites.some(fav => fav.id === hotel.id)}
                toggleFavorite={toggleFavorite}
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BrowseSection;
