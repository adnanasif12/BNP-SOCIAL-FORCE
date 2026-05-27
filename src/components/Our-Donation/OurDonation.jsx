import React, { useState } from "react";
import "./OurDonation.css";

const programs = [
  {
    id: 1,
    icon: "🍚",
    title: "খাদ্য সহায়তা",
    desc: "দুর্যোগকালীন ও নিত্যদিনের খাদ্য সংকটে পড়া পরিবারের পাশে দাঁড়ানো।",
    count: "৫০,০০০+",
    unit: "পরিবার উপকৃত",
    color: "#e67e22",
    bg: "#fef3e2",
  },
  {
    id: 2,
    icon: "🏥",
    title: "স্বাস্থ্যসেবা",
    desc: "বিনামূল্যে চিকিৎসা শিবির, ওষুধ বিতরণ ও স্বাস্থ্য পরামর্শ সেবা।",
    count: "১.২ লাখ+",
    unit: "রোগী সেবা পেয়েছেন",
    color: "#e74c3c",
    bg: "#fef0f0",
  },
  {
    id: 3,
    icon: "📚",
    title: "শিক্ষা সহায়তা",
    desc: "সুবিধাবঞ্চিত শিশুদের বৃত্তি, বই ও শিক্ষা উপকরণ সরবরাহ।",
    count: "১৫,০০০+",
    unit: "শিক্ষার্থী উপকৃত",
    color: "#2980b9",
    bg: "#e8f4fd",
  },
  {
    id: 4,
    icon: "🏠",
    title: "আশ্রয় পুনর্নির্মাণ",
    desc: "ঘূর্ণিঝড় ও বন্যায় ক্ষতিগ্রস্তদের গৃহ নির্মাণে আর্থিক সহায়তা।",
    count: "৩,৫০০+",
    unit: "পরিবার পুনর্বাসিত",
    color: "#27ae60",
    bg: "#e8f8ec",
  },
  {
    id: 5,
    icon: "💧",
    title: "বিশুদ্ধ পানি",
    desc: "দুর্গম এলাকায় টিউবওয়েল স্থাপন ও বিশুদ্ধ পানির ব্যবস্থা করা।",
    count: "৮০০+",
    unit: "টিউবওয়েল স্থাপিত",
    color: "#1abc9c",
    bg: "#e0faf5",
  },
  {
    id: 6,
    icon: "👩‍💼",
    title: "নারী ক্ষমতায়ন",
    desc: "দুস্থ নারীদের দক্ষতা উন্নয়ন প্রশিক্ষণ ও ক্ষুদ্রঋণ সহায়তা।",
    count: "১২,০০০+",
    unit: "নারী প্রশিক্ষিত",
    color: "#9b59b6",
    bg: "#f5eafd",
  },
];

const recentActivities = [
  {
    date: "১৮ জানুয়ারি, ২০২৫",
    title: "সিলেটে বন্যাদুর্গতদের মাঝে ত্রাণ বিতরণ",
    location: "সিলেট, সুনামগঞ্জ",
    volunteers: "১৫০ জন স্বেচ্ছাসেবী",
    beneficiaries: "২,৫০০ পরিবার",
    image: "https://images.pexels.com/photos/30668435/pexels-photo-30668435.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
    status: "সম্পন্ন",
  },
  {
    date: "১০ জানুয়ারি, ২০২৫",
    title: "রাজশাহীতে বিনামূল্যে চিকিৎসা সেবা",
    location: "রাজশাহী, নওগাঁ",
    volunteers: "৮০ জন চিকিৎসক ও সেবক",
    beneficiaries: "৩,০০০ রোগী",
    image: "https://images.pexels.com/photos/6647115/pexels-photo-6647115.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
    status: "সম্পন্ন",
  },
  {
    date: "৫ জানুয়ারি, ২০২৫",
    title: "শীতবস্ত্র বিতরণ কর্মসূচি — উত্তরবঙ্গ",
    location: "রংপুর, দিনাজপুর, গাইবান্ধা",
    volunteers: "২০০ জন স্বেচ্ছাসেবী",
    beneficiaries: "৫,০০০ পরিবার",
    image: "https://images.pexels.com/photos/6646869/pexels-photo-6646869.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600",
    status: "সম্পন্ন",
  },
];

const upcomingHelp = [
  { icon: "🌊", title: "উপকূলীয় মৎস্যজীবী সহায়তা", date: "২৫ জানুয়ারি", target: "কক্সবাজার, বরগুনা" },
  { icon: "🌾", title: "কৃষক পুনর্বাসন কার্যক্রম", date: "০১ ফেব্রু", target: "নরসিংদী, কিশোরগঞ্জ" },
  { icon: "🎒", title: "শিক্ষা উপকরণ বিতরণ", date: "০৫ ফেব্রু", target: "খুলনা, বাগেরহাট" },
  { icon: "💊", title: "বিনামূল্যে ওষুধ বিতরণ", date: "১২ ফেব্রু", target: "ময়মনসিংহ, নেত্রকোনা" },
];

const impactStats = [
  { num: "৫ লাখ+", label: "মানুষ সহায়তা পেয়েছেন", icon: "👥" },
  { num: "৬৪", label: "জেলায় কার্যক্রম", icon: "🗺️" },
  { num: "৫০০+", label: "স্বেচ্ছাসেবী দল", icon: "🤝" },
  { num: "৮ বছর", label: "সেবার অভিজ্ঞতা", icon: "🏆" },
];

export default function Sohayota() {
  const [activeTab, setActiveTab] = useState("কার্যক্রম");
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const tabs = ["কার্যক্রম", "সাম্প্রতিক সহায়তা", "আসন্ন কার্যক্রম", "ডোনেশন করুন"];
  const presetAmounts = ["৫০০", "১,০০০", "২,০০০", "৫,০০০"];

  return (
    <div className="sohayota-root">
      {/* Hero Section */}
      <section className="soh-hero">
        <div className="soh-hero-overlay" />
        <div className="soh-hero-content">
          <div className="soh-hero-badge">
            <span>🧡</span>
            <span>মানবিক সহায়তা</span>
          </div>
          <h1 className="soh-hero-title">
            মানুষের পাশে থাকাই<br />
            <span className="soh-hero-title-highlight">আমাদের অঙ্গীকার</span>
          </h1>
          <p className="soh-hero-subtitle">
            দুর্যোগ, দারিদ্র্য ও সংকটে বিএনপি সামাজিক শক্তি সর্বদা মানুষের পাশে — খাদ্য, স্বাস্থ্য, শিক্ষা ও আশ্রয়ে সহায়তা নিয়ে।
          </p>
          <div className="soh-hero-impact">
            {impactStats.map((stat, idx) => (
              <div className="soh-impact-item" key={idx}>
                <span className="soh-impact-icon">{stat.icon}</span>
                <span className="soh-impact-num">{stat.num}</span>
                <span className="soh-impact-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="soh-hero-wave">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f5f5f0"/>
          </svg>
        </div>
      </section>

      {/* Tabs */}
      <section className="soh-tabs-wrapper">
        <div className="soh-container">
          <div className="soh-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`soh-tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "ডোনেশন করুন" && <span className="soh-tab-heart">🧡</span>}
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="soh-container soh-main-content">
        {/* PROGRAMS TAB */}
        {activeTab === "কার্যক্রম" && (
          <div className="soh-programs-section">
            <div className="soh-section-header">
              <h2 className="soh-section-title">আমাদের সহায়তা কার্যক্রম</h2>
              <p className="soh-section-sub">বিভিন্ন ক্ষেত্রে আমাদের মানবিক সেবার বিস্তার</p>
            </div>
            <div className="soh-programs-grid">
              {programs.map((prog) => (
                <div className="soh-program-card" key={prog.id} style={{ "--prog-color": prog.color, "--prog-bg": prog.bg }}>
                  <div className="soh-prog-icon-wrap" style={{ background: prog.bg }}>
                    <span className="soh-prog-icon">{prog.icon}</span>
                  </div>
                  <div className="soh-prog-body">
                    <h3 className="soh-prog-title" style={{ color: prog.color }}>{prog.title}</h3>
                    <p className="soh-prog-desc">{prog.desc}</p>
                    <div className="soh-prog-stat" style={{ background: prog.bg, borderColor: prog.color }}>
                      <span className="soh-prog-count" style={{ color: prog.color }}>{prog.count}</span>
                      <span className="soh-prog-unit">{prog.unit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="soh-volunteer-cta">
              <div className="soh-volunteer-inner">
                <div className="soh-volunteer-text">
                  <h3>🤝 স্বেচ্ছাসেবী হোন</h3>
                  <p>আমাদের মানবিক সহায়তা কার্যক্রমে যোগ দিন এবং মানুষের জীবন পরিবর্তনে ভূমিকা রাখুন।</p>
                </div>
                <div className="soh-volunteer-btns">
                  <button className="soh-vol-btn-primary">স্বেচ্ছাসেবী হিসেবে নিবন্ধন করুন</button>
                  <button className="soh-vol-btn-secondary">আরও জানুন</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RECENT ACTIVITIES */}
        {activeTab === "সাম্প্রতিক সহায়তা" && (
          <div className="soh-recent-section">
            <div className="soh-section-header">
              <h2 className="soh-section-title">সাম্প্রতিক সহায়তা কার্যক্রম</h2>
              <p className="soh-section-sub">মাঠ পর্যায়ে আমাদের কার্যক্রমের প্রতিচ্ছবি</p>
            </div>
            <div className="soh-recent-list">
              {recentActivities.map((act, idx) => (
                <div className="soh-recent-card" key={idx}>
                  <div className="soh-recent-img-wrap">
                    <img src={act.image} alt={act.title} className="soh-recent-img" />
                    <span className="soh-recent-status">{act.status}</span>
                  </div>
                  <div className="soh-recent-body">
                    <div className="soh-recent-date">📅 {act.date}</div>
                    <h3 className="soh-recent-title">{act.title}</h3>
                    <div className="soh-recent-meta">
                      <div className="soh-recent-meta-item">
                        <span className="soh-meta-icon">📍</span>
                        <span>{act.location}</span>
                      </div>
                      <div className="soh-recent-meta-item">
                        <span className="soh-meta-icon">🤝</span>
                        <span>{act.volunteers}</span>
                      </div>
                      <div className="soh-recent-meta-item">
                        <span className="soh-meta-icon">👥</span>
                        <span>{act.beneficiaries}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="soh-gallery-note">
              <p>📸 সকল কার্যক্রমের বিস্তারিত ছবি ও ভিডিও আমাদের গ্যালারিতে দেখুন</p>
              <button className="soh-gallery-btn">গ্যালারি দেখুন →</button>
            </div>
          </div>
        )}

        {/* UPCOMING */}
        {activeTab === "আসন্ন কার্যক্রম" && (
          <div className="soh-upcoming-section">
            <div className="soh-section-header">
              <h2 className="soh-section-title">আসন্ন সহায়তা কার্যক্রম</h2>
              <p className="soh-section-sub">আগামীর পরিকল্পনায় আমাদের মানবিক উদ্যোগ</p>
            </div>
            <div className="soh-upcoming-grid">
              {upcomingHelp.map((item, idx) => (
                <div className="soh-upcoming-card" key={idx}>
                  <div className="soh-upcoming-icon">{item.icon}</div>
                  <div className="soh-upcoming-info">
                    <h3 className="soh-upcoming-title">{item.title}</h3>
                    <div className="soh-upcoming-meta">
                      <span>📅 {item.date}</span>
                      <span>📍 {item.target}</span>
                    </div>
                  </div>
                  <button className="soh-upcoming-join">অংশ নিন</button>
                </div>
              ))}
            </div>

            <div className="soh-need-help-banner">
              <div className="soh-need-help-inner">
                <h3>🆘 সহায়তা প্রয়োজন?</h3>
                <p>আপনি বা আপনার পরিবার কোনো সংকটে পড়েছেন? আমাদের সাথে যোগাযোগ করুন, আমরা সাহায্য করতে প্রস্তুত।</p>
                <div className="soh-need-contacts">
                  <div className="soh-contact-item">
                    <span className="soh-contact-icon">📞</span>
                    <div>
                      <div className="soh-contact-label">হেল্পলাইন</div>
                      <div className="soh-contact-val">০১৮০০-০০০-০০০</div>
                    </div>
                  </div>
                  <div className="soh-contact-item">
                    <span className="soh-contact-icon">✉️</span>
                    <div>
                      <div className="soh-contact-label">ইমেইল</div>
                      <div className="soh-contact-val">help@bnpsocialforce.org</div>
                    </div>
                  </div>
                  <div className="soh-contact-item">
                    <span className="soh-contact-icon">🌐</span>
                    <div>
                      <div className="soh-contact-label">ওয়েবসাইট</div>
                      <div className="soh-contact-val">www.bnpsocialforce.org</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DONATION TAB */}
        {activeTab === "ডোনেশন করুন" && (
          <div className="soh-donation-section">
            <div className="soh-section-header">
              <h2 className="soh-section-title">ডোনেশন করুন</h2>
              <p className="soh-section-sub">আপনার সহায়তায় একটি পরিবারের জীবন বদলে যেতে পারে</p>
            </div>
            <div className="soh-donation-layout">
              <div className="soh-donation-form-wrap">
                <div className="soh-donation-form">
                  <h3 className="soh-form-title">🧡 আপনার অনুদানের পরিমাণ নির্বাচন করুন</h3>
                  <div className="soh-preset-amounts">
                    {presetAmounts.map((amount) => (
                      <button
                        key={amount}
                        className={`soh-preset-btn ${selectedAmount === amount ? "active" : ""}`}
                        onClick={() => { setSelectedAmount(amount); setDonationAmount(amount); }}
                      >
                        ৳{amount}
                      </button>
                    ))}
                  </div>
                  <div className="soh-custom-amount">
                    <label>অথবা নিজে পরিমাণ লিখুন</label>
                    <div className="soh-amount-input-wrap">
                      <span className="soh-currency">৳</span>
                      <input
                        type="number"
                        placeholder="পরিমাণ লিখুন"
                        value={donationAmount}
                        onChange={(e) => { setDonationAmount(e.target.value); setSelectedAmount(null); }}
                        className="soh-amount-input"
                      />
                    </div>
                  </div>
                  <div className="soh-form-fields">
                    <div className="soh-field">
                      <label>আপনার নাম</label>
                      <input type="text" placeholder="পূর্ণ নাম লিখুন" className="soh-input" />
                    </div>
                    <div className="soh-field">
                      <label>মোবাইল নম্বর</label>
                      <input type="tel" placeholder="০১XXXXXXXXX" className="soh-input" />
                    </div>
                    <div className="soh-field soh-field-full">
                      <label>ইমেইল (ঐচ্ছিক)</label>
                      <input type="email" placeholder="your@email.com" className="soh-input" />
                    </div>
                    <div className="soh-field soh-field-full">
                      <label>ডোনেশন কোন খাতে?</label>
                      <select className="soh-input">
                        <option>সাধারণ সহায়তা তহবিল</option>
                        <option>খাদ্য সহায়তা</option>
                        <option>স্বাস্থ্যসেবা</option>
                        <option>শিক্ষা সহায়তা</option>
                        <option>দুর্যোগ ত্রাণ</option>
                      </select>
                    </div>
                  </div>
                  <div className="soh-payment-methods">
                    <h4>পেমেন্ট পদ্ধতি</h4>
                    <div className="soh-pay-options">
                      <div className="soh-pay-opt active">
                        <span>📱</span> বিকাশ
                      </div>
                      <div className="soh-pay-opt">
                        <span>📱</span> নগদ
                      </div>
                      <div className="soh-pay-opt">
                        <span>📱</span> রকেট
                      </div>
                      <div className="soh-pay-opt">
                        <span>💳</span> ব্যাংক ট্রান্সফার
                      </div>
                    </div>
                  </div>
                  <button className="soh-donate-btn">
                    🧡 এখনই ডোনেট করুন {donationAmount ? `৳${donationAmount}` : ""}
                  </button>
                  <p className="soh-secure-note">🔒 আপনার তথ্য সম্পূর্ণ নিরাপদ ও গোপনীয়</p>
                </div>
              </div>
              <div className="soh-donation-sidebar">
                <div className="soh-impact-card">
                  <h4>আপনার ডোনেশনের প্রভাব</h4>
                  <div className="soh-impact-items">
                    <div className="soh-impact-row">
                      <span className="soh-impact-amt">৳৫০০</span>
                      <span className="soh-impact-desc">একটি পরিবারের এক সপ্তাহের খাবার</span>
                    </div>
                    <div className="soh-impact-row">
                      <span className="soh-impact-amt">৳১,০০০</span>
                      <span className="soh-impact-desc">একজন শিশুর এক মাসের শিক্ষা উপকরণ</span>
                    </div>
                    <div className="soh-impact-row">
                      <span className="soh-impact-amt">৳২,০০০</span>
                      <span className="soh-impact-desc">একজন রোগীর চিকিৎসা ও ওষুধ</span>
                    </div>
                    <div className="soh-impact-row">
                      <span className="soh-impact-amt">৳৫,০০০</span>
                      <span className="soh-impact-desc">দুর্যোগে ক্ষতিগ্রস্ত পরিবারের পুনর্বাসন</span>
                    </div>
                  </div>
                </div>
                <div className="soh-transparency-card">
                  <h4>🔍 তহবিলের স্বচ্ছতা</h4>
                  <div className="soh-fund-bars">
                    <div className="soh-fund-row">
                      <span>খাদ্য সহায়তা</span>
                      <div className="soh-fund-bar"><div className="soh-fund-fill" style={{width:"35%", background:"#e67e22"}} /></div>
                      <span>৩৫%</span>
                    </div>
                    <div className="soh-fund-row">
                      <span>স্বাস্থ্যসেবা</span>
                      <div className="soh-fund-bar"><div className="soh-fund-fill" style={{width:"28%", background:"#e74c3c"}} /></div>
                      <span>২৮%</span>
                    </div>
                    <div className="soh-fund-row">
                      <span>শিক্ষা</span>
                      <div className="soh-fund-bar"><div className="soh-fund-fill" style={{width:"22%", background:"#2980b9"}} /></div>
                      <span>২২%</span>
                    </div>
                    <div className="soh-fund-row">
                      <span>আশ্রয়</span>
                      <div className="soh-fund-bar"><div className="soh-fund-fill" style={{width:"15%", background:"#27ae60"}} /></div>
                      <span>১৫%</span>
                    </div>
                  </div>
                </div>
                <div className="soh-testimonial-card">
                  <p className="soh-testimonial-text">
                    "বিএনপি সামাজিক শক্তির সহায়তায় আমার পরিবার সত্যিকারের কঠিন সময় পার করতে পেরেছে। আল্লাহ তাদের ভালো রাখুন।"
                  </p>
                  <div className="soh-testimonial-author">
                    <div className="soh-testimonial-avatar">র</div>
                    <div>
                      <div className="soh-testimonial-name">রহিমা বেগম</div>
                      <div className="soh-testimonial-place">সুনামগঞ্জ, সিলেট</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="soh-bottom-cta">
        <div className="soh-container">
          <div className="soh-bottom-inner">
            <span className="soh-bottom-icon">🧡</span>
            <span className="soh-bottom-text">মানবিক সহায়তা কার্যক্রমে অংশীদার হোন</span>
            <button className="soh-bottom-btn">ডোনেট করুন</button>
          </div>
        </div>
      </div>
    </div>
  );
}
