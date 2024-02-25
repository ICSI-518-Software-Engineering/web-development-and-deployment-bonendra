import React from 'react';
import KBRLogo from './KBR.png'; // Adjust the path accordingly

const Header = (props) => {
    const profileClick = () => {
        props.profile();
    };

    const operationsClick = () => {
        props.operations();
    };

    const logoStyle = {
        width: '50px',  // Adjust the width as needed
        height: '50px', // Adjust the height as needed
        marginRight: '10px', // Add margin for spacing if necessary
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">
                        <img src={KBRLogo} alt="KBR Logo" style={logoStyle} />
                    </a>
                </div>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <div className="nav-link" onClick={profileClick}>PROFILE</div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link" onClick={operationsClick}>OPERATIONS</div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
