import React, { useState } from 'react';
import '../styles/topbar.css';

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="top-bar">
      <span className="top-bar-left">
        ৪০ বাংলাদেশ জাতীয়তাবাদী মূল সামাজিক শাখা
      </span>
      <button 
        className="hamburger-btn" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`top-bar-right ${isMenuOpen ? 'open' : ''}`}>
        <a href="#">যোগাযোগ</a>
        <a href="#">লগইন</a>
        <a href="#">বাংলা</a>
      </div>
    </div>
  );
};

export default TopBar;
