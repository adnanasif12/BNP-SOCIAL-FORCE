import React from 'react';
import '../styles/header.css';

const Header = ({ setActiveSection }) => {
  const handleDonateClick = (e) => {
    e.preventDefault();
    setActiveSection(8);
  };

  return (
    <header className="header">
      {/* Logo + Brand */}
      <div className="header-logo-section">
        <img
          src="/images/logo.png"
          alt="BNP Social Force Logo"
          className="header-logo-img"
        />
        <div className="header-logo-text">
          <h1>BNP Social Force</h1>
          <p>সামাজিক শক্তির পথে, দেশের কল্যাণে</p>
        </div>
      </div>

      {/* Donate Button */}
      <a href="#" className="header-donate-btn" onClick={handleDonateClick}>
        <span className="donate-icon">💚</span>
        ডোনেশন করুন
      </a>
    </header>
  );
};

export default Header;
