import { useState } from 'react';
import './NavBar.css';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
          <span>COVID-19 DataViz</span>
        </div>

        <nav className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li className="active"><a href="/">Global Dashboard</a></li>
            <li><a href="/countries">Countries</a></li>
            <li><a href="/trends">Trends</a></li>
            <li><a href="/map">Map</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>

        <button className="mobile-menu-button" onClick={toggleMenu}>
          <span className={isMenuOpen ? 'close' : 'menu'}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </header>
  );
}

export default NavBar;