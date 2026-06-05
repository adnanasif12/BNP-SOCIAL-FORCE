import React from 'react';
import '../styles/navbar.css';

const navItems = [
  { id: 1, label: 'হোম',          icon: '🏠', iconClass: 'icon-home',     href: '#', active: true },
  { id: 2, label: 'জাতীয় রাজনীতি', icon: '🏳️', iconClass: 'icon-politics', href: '#', active: false },
  { id: 3, label: 'মানবিক সহায়তা',  icon: '💛', iconClass: 'icon-help',     href: '#', active: false },
  { id: 4, label: 'উন্নয়ন',        icon: '📋', iconClass: 'icon-progress',  href: '#', active: false },
  { id: 5, label: 'সামাজিক কার্যক্রম', icon: '🌐', iconClass: 'icon-social',   href: '#', active: false },
  { id: 6, label: 'আমাদের টিম',    icon: '👥', iconClass: 'icon-team',     href: '#', active: false },
  { id: 7, label: 'গ্যালারি',      icon: '🖼️', iconClass: 'icon-gallery',  href: '#', active: false },
  { id: 8, label: 'ডোনেশন',       icon: '🔥', iconClass: 'icon-donation',  href: '#', active: false },
  { id: 9, label: 'সদস্যপদ',      icon: '📝', iconClass: 'icon-membership', href: '#', active: false },
];

const Navbar = ({ activeSection, setActiveSection }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {navItems.map((item) => (
          <li key={item.id} className="navbar-item">
            <a
              href={item.href}
              className={`navbar-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection(item.id);
              }}
            >
              <span className={`navbar-icon ${item.iconClass}`}>
                {item.icon}
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
