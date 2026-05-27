import React from 'react';
import '../styles/TeamHeader.css';

export default function TeamHeader() {
  return (
    <div className="TeamHeader-section">
      <div className="TeamHeader-badge-wrapper">
        <span className="TeamHeader-badge">আমাদের নেতৃত্ব</span>
      </div>
      <h1 className="TeamHeader-title">প্রতিষ্ঠাতা ও টিম</h1>
      <p className="TeamHeader-subtitle">
        যাদের অক্লান্ত পরিশ্রম ও নিষ্ঠায় BNP Social Force আজ গড়ে উঠেছে
      </p>
      <div className="TeamHeader-divider"></div>
    </div>
  );
}
