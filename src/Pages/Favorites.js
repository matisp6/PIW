import React from 'react';
import { Link } from 'react-router-dom';
import heartFilledIcon from '../assets/heart-filled.svg';
import heartIcon from '../assets/heart.svg';

function Favorites({ favorites, toggleFavorite }) {
  return (
    <section id="favorites" className="favorites-section">
      <p className="title-middle">Your Favorite Hotels</p>
      <div className="favorites-list">
        {favorites.length > 0 ? (
          favorites.map((hotel) => (
            <div key={hotel.id} className="favorite-item">
              <Link to={`/hotel/${hotel.id}`} className="favorite-link">
                <div className="favorite-image" style={{ backgroundImage: `url(${hotel.image})` }}></div>
                <div className="favorite-details">
                  <h3>{hotel.name}</h3>
                  <p>{hotel.location}</p>
                  <p>{hotel.price}/room</p>
                  <p>{hotel.rating}</p> {/* Dodano wyświetlanie ocen */}
                </div>
              </Link>
              <button 
                onClick={() => toggleFavorite(hotel)} 
                className="favorite-toggle"
              >
                <img src={heartFilledIcon} alt="Remove from favorites" />
              </button>
            </div>
          ))
        ) : (
          <p className="empty">You have no favorite hotels.</p>
        )}
      </div>
    </section>
  );
}

export default Favorites;
