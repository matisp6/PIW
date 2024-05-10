import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'; 

function NavBar() {
  return (
    <nav className="fixed-navigation">
      <Link to="/">
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      <ul className="nav-links">
        <li><Link className="nav-link" to="/">Home</Link></li>
        <li><Link className="nav-link" to="/find-offers">Find offers</Link></li>
        <li><Link className="nav-link" to="/add-new-offers">Add new offers</Link></li>
        <li><Link className="nav-link" to="#">My offers</Link></li>
        <li><Link className="nav-link" to="#">Favorites</Link></li>
        <button className="button primary">Log out</button>
      </ul>
      <button className="button primary hidden">Menu</button>
    </nav>
  );
}

export default NavBar;
