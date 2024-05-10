import React, { useState } from 'react';

function AddHotelForm({ addHotel }) {
console.log("AddHotelForm is being rendered");
  const [hotelData, setHotelData] = useState({
    name: '',
    location: '',
    description: '',
    price: '',
    rating: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addHotel(hotelData);  
    console.log("Submitted data:", hotelData);
    setHotelData({
      name: '',
      location: '',
      description: '',
      price: '',
      rating: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label className="form-label">Hotel Name:</label>
        <input type="text" name="name" value={hotelData.name} onChange={handleChange} className="form-input" autoComplete="off" />
      </div>
      <div className="form-group">
        <label className="form-label">Location:</label>
        <input type="text" name="location" value={hotelData.location} onChange={handleChange} className="form-input" autoComplete="off" />
      </div>
      <div className="form-group">
        <label className="form-label">Description:</label>
        <textarea name="description" value={hotelData.description} onChange={handleChange} className="form-textarea" autoComplete="off" />
      </div>
      <div className="form-group">
        <label className="form-label">Price per room/night:</label>
        <input type="text" name="price" value={hotelData.price} onChange={handleChange} className="form-input" autoComplete="off" />
      </div>
      <div className="form-group">
        <label className="form-label">Rating:</label>
        <input type="text" name="rating" value={hotelData.rating} onChange={handleChange} className="form-input" autoComplete="off" />
      </div>
      <button type="submit" className="form-button">Add Hotel</button>
    </form>


  );
}

export default AddHotelForm;
