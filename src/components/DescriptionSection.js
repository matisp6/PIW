import React from 'react';
import editIcon from '../assets/edit.svg';
import removeIcon from '../assets/remove.svg';

function DescriptionSection() {
  return (
    <section id="desc" className="desc-section">
      <p className="title-large" style={{ marginBottom: '35px' }}>Serene Retreat</p>
      <div className="desc-grid">
        <div className="desc-image-container"></div> 
        <article className="desc-details">
          <p className="text-mini"><span className="bold-text">Location:</span> Madrid </p>
          <p className="text-mini"><span className="bold-text">Local category:</span> <span style={{ fontSize: '13px' }}>★★★★☆</span> </p>
          <p className="text-mini"><span className="bold-text">Price:</span> 70€/room/night </p>
          <p className="text-mini"><span className="bold-text">Description:</span></p>
          <p className="text-mini">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec leo ligula. Etiam fermentum est in euismod egestas. Curabitur at condimentum ligula. Phasellus nunc velit, facilisis fermentum congue ac, cursus at leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam nec sapien vitae neque scelerisque tempus. Vestibulum hendrerit tellus ut pulvinar feugiat. Nullam iaculis vitae justo sit amet tempus. Nam nunc nunc, porttitor sed turpis quis, feugiat egestas leo. Phasellus consequat magna ante, ac aliquam felis convallis sit amet. Sed massa lorem, iaculis ac vestibulum ac, tempus a tortor. Ut posuere ipsum nec condimentum vehicula. Curabitur orci velit, aliquam vel arcu quis, semper congue ligula.</p>
          <div className="desc-buttons">
            <button className="button primary limit-width edit">Edit <img src={editIcon} alt="Edit"/></button>
            <button className="button primary limit-width">Remove <img src={removeIcon} alt="Remove"/></button>
          </div>
          <div className="hero-cards">
            <div className="card-image-desc"></div>
            <div className="card-image-desc"></div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default DescriptionSection;
