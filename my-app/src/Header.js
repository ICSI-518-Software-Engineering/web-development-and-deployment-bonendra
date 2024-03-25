import React from 'react';
import logo from './KBR.png'; // Import the logo image file

const Header = (props) => {
  const logoStyle = {
    width: '50px',  // Adjust the width as needed
    height: '50px', // Adjust the height as needed
    marginRight: '10px', // Add margin for spacing if necessary
  };

  const handleProfileClick = () => {
    props.profile();
  };

  const handleOperationsClick = () => {
    props.operations();
  };

  const handleInventoryClick = () => {
    props.inventory();
  };

  const handleFoodClick = () => {
    props.food();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="KBR Logo" style={logoStyle} /> {/* Use the imported logo */}
          </a>
        </div>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="nav-link" onClick={handleProfileClick}>PROFILE</div>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={handleOperationsClick}>OPERATIONS</div>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={handleInventoryClick}>INVENTORY</div>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={handleFoodClick}>FOOD</div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
