import React from 'react';
import { Link } from 'react-router-dom';
import heartFilledIcon from '../assets/heart-filled.svg';
import heartIcon from '../assets/heart.svg';
import arrowIcon from '../assets/Arrow.svg';

// Import obrazów
import cards1 from '../assets/cards1.jpg';
import cards2 from '../assets/cards2.jpg';
import cards3 from '../assets/cards3.jpg';
import cards4 from '../assets/cards4.jpg';

const styleMap = {
  1: {
    backgroundImage: `url(${cards1})`
  },
  2: {
    backgroundImage: `url(${cards2})`,
    backgroundSize: '145%',
    backgroundPosition: 'calc(50% + 40px) center'
  },
  3: {
    backgroundImage: `url(${cards3})`,
    backgroundSize: '125%',
    backgroundPosition: 'center calc(50% + 45px)'
  },
  4: {
    backgroundImage: `url(${cards4})`,
    backgroundSize: '147%',
    backgroundPosition: 'right calc(50% + 15px)'
  }
};

function HotelCard({ hotel, isFavorite, toggleFavorite }) {
  const cardStyle = styleMap[hotel.id] || {};
  
  return (
    <article className="hotel-card">
      <div className="card-image" style={{ ...cardStyle, backgroundImage: `url(${hotel.image})` }}>
        <p className="chip">{hotel.location}</p>
        <p className="chip-fav" onClick={(e) => { e.preventDefault(); toggleFavorite(hotel); }}>
          <img src={isFavorite ? heartFilledIcon : heartIcon} style={{ scale: '0.8' }} alt="Favorite" />
        </p>
      </div>
      <p className="text-middle">{hotel.name}</p>
      <p className="text-small">{hotel.description}</p>
      <div className="hotel-card-footer">
        <p className="star">{hotel.rating}</p>
        <p className="text-middle">{hotel.price}/room</p>
      </div>
      <div className="hotel-card-footer-button">
        <Link to={`/hotel/${hotel.id}`} className="button primary">
          View offer <img src={arrowIcon} alt="Arrow"/>
        </Link>
      </div>
    </article>
  );
}

export default HotelCard;
