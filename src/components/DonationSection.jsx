import React, { useState } from "react";
import "../styles/DonationSection.css";


const AMOUNTS = ["৳৫০০", "৳১,০০০", "৳৫,০০০", "অন্য পরিমাণ"];

export default function DonationSection() {
  const [selected, setSelected] = useState(1); // default ৳১,০০০

  return (
    <section className="donation-section">
      <div className="donation-inner">
        <div className="donation-top">
          <h2 className="donation-title">
            <span className="donation-heart">💚</span> আমাদের কাজে সহায়তা করুন
          </h2>
          <p className="donation-subtitle">
            আপনার ডোনেশন দেশের মানুষের জন্য আরও ভালো কাজ করার সুযোগ দেয়।
          </p>
          <div className="donation-amounts">
            {AMOUNTS.map((amt, idx) => (
              <button
                key={idx}
                className={`donation-btn${selected === idx ? " active" : ""}`}
                onClick={() => setSelected(idx)}
              >
                {amt}
              </button>
            ))}
          </div>
        </div>
        <button className="donation-submit-btn">এখনই ডোনেশন করুন →</button>
      </div>
    </section>
  );
}
