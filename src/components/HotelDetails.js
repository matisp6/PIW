import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHotelById } from '../data/userService';
import editIcon from '../assets/edit.svg';
import removeIcon from '../assets/remove.svg';

function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const fetchedHotel = await getHotelById(id);
        setHotel(fetchedHotel);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    fetchHotel();
  }, [id]);

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  return (
    <section id="desc" className="desc-section">
      <p className="title-large" style={{ marginBottom: '35px' }}>{hotel.name}</p>
      <div className="desc-grid">
        <div className="desc-image-container" style={{ backgroundImage: `url(${hotel.image})` }}></div>
        <article className="desc-details">
          <p className="text-mini"><span className="bold-text">Location:</span> {hotel.location}</p>
          <p className="text-mini"><span className="bold-text">Local category:</span> {hotel.rating}</p>
          <p className="text-mini"><span className="bold-text">Price:</span> {hotel.price}/room/night </p>
          <p className="text-mini"><span className="bold-text">Description:</span> {hotel.desc_long}</p>
          <div className="desc-buttons">
            <button className="button primary limit-width edit">Edit <img src={editIcon} alt="Edit"/></button>
            <button className="button primary limit-width">Remove <img src={removeIcon} alt="Remove"/></button>
          </div>
          <div className="hero-cards">
            <div className="card-image-desc" style={{ backgroundImage: `url(${hotel.additionalImage1})` }}></div>
            <div className="card-image-desc" style={{ backgroundImage: `url(${hotel.additionalImage2})` }}></div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default HotelDetails;
