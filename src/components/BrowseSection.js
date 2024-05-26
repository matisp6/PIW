import React from 'react';
import { Link } from 'react-router-dom';
import HotelCard from './HotelCard';

function BrowseSection({ hotels }) {
  return (
    <section id="browse" className="browse-section">
      <p className="title-middle">Explore the hotels</p>
      <input className="searchbar" placeholder="Search by hotel name, place, description etc." />
      <div className="grid hotel-cards">
        {hotels.map((hotel) => (
          <Link key={hotel.id} to={`/hotel/${hotel.id}`}>
            <HotelCard
              id={hotel.id}
              image={hotel.image}
              location={hotel.location}
              name={hotel.name}
              description={hotel.description}
              price={hotel.price}
              rating={hotel.rating}
              isFavorited={hotel.isFavorited}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default BrowseSection;
