import React from 'react';
import { Link } from 'react-router-dom';
import heartFilledIcon from '../assets/heart-filled.svg';
import heartIcon from '../assets/heart.svg';
import arrowIcon from '../assets/Arrow.svg';

function HotelCard({ id, image, location, name, description, price, rating, isFavorited }) {
  return (
    <article className="hotel-card">
      <div className="card-image" style={{ backgroundImage: `url(${image})` }}>
        <p className="chip">{location}</p>
        <p className="chip-fav">
          <img src={isFavorited ? heartFilledIcon : heartIcon} style={{ scale: '0.8' }} alt="Favorite" />
        </p>
      </div>
      <p className="text-middle">{name}</p>
      <p className="text-small">{description}</p>
      <div className="hotel-card-footer">
        <p className="star">{rating}</p>
        <p className="text-middle">{price}/room</p>
      </div>
      <div className="hotel-card-footer-button">
      <Link to={`/hotel/${id}`} className="button primary">
        View offer <img src={arrowIcon} alt="Arrow"/>
      </Link>
      </div>
    </article>
  );
}

export default HotelCard;