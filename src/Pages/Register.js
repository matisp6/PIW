import React, { useState } from 'react';
import { register, loginWithGoogle } from '../data/userService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(email, password);
      navigate('/');
    } catch (error) {
      setError('Error registering. Please try again.');
      console.error("Error registering:", error);
    }
  };

  const handleGoogleRegister = async () => {
    setError('');
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      setError('Error registering with Google. Please try again.');
      console.error("Error registering with Google:", error);
    }
  };

  return (
    <main className="main-center">
      <div className="form-container">
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="form-button">Register</button>
          {error && <div className="error-message">{error}</div>}
        </form>
        <button onClick={handleGoogleRegister} className="form-button google-button">Register with Google</button>
      </div>
    </main>
  );
};

export default Register;
