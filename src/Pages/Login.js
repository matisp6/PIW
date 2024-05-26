import React, { useState } from 'react';
import { login, loginWithGoogle } from '../data/userService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError('Invalid login credentials. Please try again.');
      console.error("Error logging in:", error);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      setError('Error logging in with Google. Please try again.');
      console.error("Error logging in with Google:", error);
    }
  };

  return (
    <main className="main-center">
      <div className="form-container">
        <h2>Log into your account</h2>
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
          <button type="submit" className="form-button">Login</button>
          {error && <div className="error-message">{error}</div>}
        </form>
        <button onClick={handleGoogleLogin} className="form-button google-button">Login with Google</button>
      </div>
    </main>
  );
};

export default Login;
