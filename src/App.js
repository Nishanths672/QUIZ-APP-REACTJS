// src/App.js
import React, { useState } from 'react';
import QuizApp from './QuizApp';
import Login from './Login';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? <QuizApp /> : <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;
