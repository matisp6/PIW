import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg'; 
import { useUser, logout } from '../data/userService';

function NavBar() {
  const user = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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
        <li><Link className="nav-link" to="/favorites">Favorites</Link></li>
        <li><Link className="nav-link" to="/chat">Chat</Link></li>
        {user ? (
          <div className="user-info">
            <span className="user-info-email">{user.email}</span>
            <button className="button primary nav-button logout" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
            <li><Link className="nav-link" to="/login"><button className="button primary nav-button">Login</button></Link></li>
            <li><Link className="nav-link" to="/register"><button className="button tertiary nav-button">Register</button></Link></li>
          </>
        )}
      </ul>
      <button className="button primary hidden">Menu</button>
    </nav>
  );
}

export default NavBar;
