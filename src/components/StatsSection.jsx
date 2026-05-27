import React from 'react';
import '../styles/stats.css';

const statsData = [
  { number: '৪৫+', label: 'বছরের ইতিহাস' },
  { number: '৬৪',  label: 'জেলায় সক্রিয়' },
  { number: '১২০০+', label: 'স্বেচ্ছাসেবক' },
  { number: '৫০০+', label: 'প্রকল্প সম্পন্ন' },
];

const StatsSection = () => {
  return (
    <section className="stats-section">
      {statsData.map((stat, index) => (
        <div key={index} className="stats-item">
          <span className="stats-number">{stat.number}</span>
          <span className="stats-label">{stat.label}</span>
        </div>
      ))}
    </section>
  );
};

export default StatsSection;
