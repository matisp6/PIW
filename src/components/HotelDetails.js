import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHotelById } from '../data/userService';
import editIcon from '../assets/edit.svg';
import removeIcon from '../assets/remove.svg';
import contactIcon from '../assets/contact.svg';
import { useSnackbar } from 'notistack';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useUser } from '../data/userService';

function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const user = useUser();
  const navigate = useNavigate();


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

  const handleMessageChange = (e) => setMessage(e.target.value);
  const handleSendEmail = () => {
    enqueueSnackbar('MESSAGE SENT', { variant: 'success' });
    setMessage('');
    setOpen(false);
  };

  const handleOpen = () => {
    if (user) {
      setOpen(true);
    } else {
      enqueueSnackbar('YOU MUST LOG IN FIRST', { variant: 'warning' });
      navigate('/login');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            <button className="button primary limit-width contact" onClick={handleOpen}>Contact<img src={contactIcon} alt="Contact"/></button>
          </div>
          <div className="hero-cards">
            <div className="card-image-desc" style={{ backgroundImage: `url(${hotel.additionalImage1})` }}></div>
            <div className="card-image-desc" style={{ backgroundImage: `url(${hotel.additionalImage2})` }}></div>
          </div>
        </article>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Contact the Owner</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="email"
            label="Your email"
            type="email"
            fullWidth
            variant="standard"
            value={user?.email}
            disabled
          />
          <TextField
            margin="dense"
            id="message"
            label="Your message"
            type="text"
            fullWidth
            variant="standard"
            value={message}
            onChange={handleMessageChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSendEmail}>Send</Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}

export default HotelDetails;
