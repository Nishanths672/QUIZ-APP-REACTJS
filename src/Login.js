// src/Login.js
import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [view, setView] = useState('login'); // 'login' or 'register'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [users, setUsers] = useState([]); // For storing registered users

  const handleRegister = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      window.alert('Passwords do not match');
      return;
    }
    if (users.some(user => user.username === username)) {
      window.alert('Username already exists');
      return;
    }
    setUsers([...users, { username, password }]);
    setView('login');
    window.alert('Registration successful! You can now log in.');
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      onLogin();
    } else {
      window.alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2>{view === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={view === 'login' ? handleLogin : handleRegister}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {view === 'register' && (
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}
        <button type="submit">{view === 'login' ? 'Login' : 'Register'}</button>
        <button
          type="button"
          onClick={() => setView(view === 'login' ? 'register' : 'login')}
        >
          {view === 'login' ? 'Register' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
