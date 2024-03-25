import React, { useState } from 'react';
import Header from './Header';
import Profile from './Profile';
import Operations from './Operations';
import Inventory from './inventory';
import Food from './food'; // Import Food component
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('profile');

  const handleProfileClick = () => {
    setCurrentPage('profile');
  };

  const handleOperationsClick = () => {
    setCurrentPage('operations');
  };

  const handleInventoryClick = () => {
    setCurrentPage('inventory');
  };

  const handleFoodClick = () => {
    setCurrentPage('food');
  };

  return (
    <div>
      <Header profile={handleProfileClick} operations={handleOperationsClick} inventory={handleInventoryClick} food={handleFoodClick} />
      <div className="container">
        {currentPage === 'profile' && <Profile />}
        {currentPage === 'operations' && <Operations />}
        {currentPage === 'inventory' && <Inventory />}
        {currentPage === 'food' && <Food />}
      </div>
    </div>
  );
};

export default App;
