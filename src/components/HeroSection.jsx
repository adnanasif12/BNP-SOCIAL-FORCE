import React from 'react';
import '../styles/hero.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      {/* Banner Image */}
      <div className="hero-banner-wrapper">
        <img 
          src="/images/Tareque.png" 
          alt="Tareque Banner" 
          className="hero-banner-image"
        />
      </div>

      {/* Left Content */}
      <div className="hero-content">
        {/* Badge */}
        <span className="hero-badge">সর্বশেষ বার্তা</span>

        {/* Main Title */}
        <h2 className="hero-title">
          দেশ, মানুষ ও গণতন্ত্রের জন্য একসাথে এগিয়ে চলি
        </h2>

        {/* Subtitle */}
        <p className="hero-subtitle">
          BNP Social Force — জাতীয় উন্নয়ন, মানবিক সহায়তা ও সামাজিক ন্যায়বিচারের জন্য নিবেদিত একটি সংগঠন।
        </p>

        {/* Buttons */}
        <div className="hero-buttons">
          <a href="#" className="btn-primary">
            আমাদের সাথে যোগ দিন
          </a>
          <a href="#" className="btn-secondary">
            আরও জানুন
          </a>
        </div>
      </div>

      {/* Right Logo Aside */}
      <div className="hero-logo-aside">
        <img
          src="/images/bnp-logo.png"
          alt="BNP Social Force"
        />
        <span>BNP<br />SOCIAL FORCE</span>
      </div>
    </section>
  );
};

export default HeroSection;
