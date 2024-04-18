import React, { useState } from 'react';
import Header from './Header';
import Profile from './Profile';
import Operations from './Operations';
import Inventory from './inventory';
import Food from './food'; // Import Food component
import Login from './Login'; // Import Login component
import Register from './Register'; // Import Register component
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login'); // Set initial page to 'login'
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set initial state to not logged in

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('profile');
  };

  const handleRegister = () => {
    setCurrentPage('register');
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setCurrentPage('profile');
    } else {
      setCurrentPage('login');
    }
  };

  const handleOperationsClick = () => {
    if (isLoggedIn) {
      setCurrentPage('operations');
    } else {
      setCurrentPage('login');
    }
  };

  const handleInventoryClick = () => {
    if (isLoggedIn) {
      setCurrentPage('inventory');
    } else {
      setCurrentPage('login');
    }
  };

  const handleFoodClick = () => {
    if (isLoggedIn) {
      setCurrentPage('food');
    } else {
      setCurrentPage('login');
    }
  };

  return (
    <div>
      <Header profile={handleProfileClick} operations={handleOperationsClick} inventory={handleInventoryClick} food={handleFoodClick} />
      <div className="container">
        {currentPage === 'login' && <Login onLogin={handleLogin} onRegister={handleRegister} />}
        {currentPage === 'register' && <Register onLogin={handleLogin} />}
        {currentPage === 'profile' && <Profile />}
        {currentPage === 'operations' && <Operations />}
        {currentPage === 'inventory' && <Inventory />}
        {currentPage === 'food' && <Food />}
      </div>
    </div>
  );
};

export default App;
