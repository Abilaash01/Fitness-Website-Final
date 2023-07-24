import React from 'react';
import logo from '../images/logo.jpg'
import { NavLink } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <nav>
        <div className="logo-container">
          <a href='/'><img className="logo" src={logo} alt='img'/></a>
          <h1 className="company-name">FitLife</h1>
        </div>
        <ul className="nav-items">
          <li><NavLink href="/">Home</NavLink></li>
          <li><NavLink href="/Memberships">Memberships</NavLink></li>
          <li><NavLink href="/Planner">Workout Planner</NavLink></li>
          <li><NavLink href="/Finder">Find A Gym</NavLink></li>
          <li><NavLink href="/Contact">Contact Us</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
