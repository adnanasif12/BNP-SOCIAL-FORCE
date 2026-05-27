import React, { useState } from "react";
import "./Rajniti.css";

const newsData = [
  {
    id: 1,
    category: "দলীয় সংবাদ",
    date: "১৫ জানুয়ারি, ২০২৫",
    title: "বিএনপি সামাজিক শক্তির জাতীয় সম্মেলন অনুষ্ঠিত",
    excerpt:
      "ঢাকায় অনুষ্ঠিত জাতীয় সম্মেলনে সারা দেশ থেকে হাজারো নেতাকর্মী অংশগ্রহণ করেন। সম্মেলনে আগামী দিনের কর্মপরিকল্পনা নির্ধারণ করা হয়।",
    image:
      "/images/BNP3.jpg",
    tag: "গুরুত্বপূর্ণ",
  },
  {
    id: 2,
    category: "রাজনৈতিক বিশ্লেষণ",
    date: "১২ জানুয়ারি, ২০২৫",
    title: "গণতন্ত্র পুনরুদ্ধারে বিএনপির রোডম্যাপ ঘোষণা",
    excerpt:
      "বাংলাদেশে গণতন্ত্র পুনরুদ্ধারে বিএনপি একটি বিশদ রোডম্যাপ প্রকাশ করেছে। এতে নির্বাচনী সংস্কার ও সাংবিধানিক পরিবর্তনের দাবি তুলে ধরা হয়েছে।",
    image:
      "/images/BNP2.jpg",
    tag: "বিশ্লেষণ",
  },
  {
    id: 3,
    category: "জনমত",
    date: "১০ জানুয়ারি, ২০২৫",
    title: "তারুণ্যের রাজনৈতিক সচেতনতা বৃদ্ধিতে নতুন উদ্যোগ",
    excerpt:
      "দেশের তরুণ প্রজন্মকে রাজনৈতিকভাবে সচেতন করতে বিএনপি সামাজিক শক্তি বিশেষ কর্মসূচি গ্রহণ করেছে। এই উদ্যোগে সারা দেশের বিশ্ববিদ্যালয়গুলোতে কর্মশালা আয়োজন করা হবে।",
    image:
      "/images/BNP4.jpg",
    tag: "তরুণ",
  },
];

const agenda = [
  {
    icon: "🗳️",
    title: "অবাধ ও নিরপেক্ষ নির্বাচন",
    desc: "স্বাধীন নির্বাচন কমিশন গঠন ও তত্ত্বাবধায়ক সরকার পুনঃপ্রতিষ্ঠার দাবি।",
  },
  {
    icon: "⚖️",
    title: "আইনের শাসন প্রতিষ্ঠা",
    desc: "বিচার বিভাগের স্বাধীনতা নিশ্চিত করে ন্যায়ভিত্তিক সমাজ গড়ার প্রতিশ্রুতি।",
  },
  {
    icon: "🕊️",
    title: "মত প্রকাশের স্বাধীনতা",
    desc: "মিডিয়া ও নাগরিকদের মত প্রকাশের অধিকার সুরক্ষায় আইনি কাঠামো।",
  },
  {
    icon: "🏛️",
    title: "সাংবিধানিক সংস্কার",
    desc: "সংবিধানের গণতান্ত্রিক মূল্যবোধ পুনরুদ্ধারে বিশেষ কমিশন গঠন।",
  },
  {
    icon: "🤝",
    title: "জাতীয় ঐক্য",
    desc: "সকল দলের অংশগ্রহণে জাতীয় ঐক্যমত গঠনের উদ্যোগ গ্রহণ।",
  },
  {
    icon: "📜",
    title: "মানবাধিকার সংরক্ষণ",
    desc: "নাগরিকদের মৌলিক অধিকার রক্ষায় আন্তর্জাতিক মানদণ্ড অনুসরণ।",
  },
];

const leaders = [
  {
    name: "শহীদ প্রেসিডেন্ট জিয়াউর রহমান",
    role: "প্রতিষ্ঠাতা",
    image: "/images/Zia.png",
    quote: "ব্যক্তির চেয়ে দল বড়, দলের চেয়ে দেশ।",
    initial: "জ",
    color: "#1a5c2a",
  },
  {
    name: "মরহুমা বেগম খালেদা জিয়া",
    role: "চেয়ারপার্সন",
    image: "/images/Madam.png",
    quote: "গণতন্ত্র হলো জনগণের শক্তি।",
    initial: "খ",
    color: "#c8961e",
  },
  {
    name: "তারেক রহমান",
    role: "চেয়ারম্যান",
    image: "/images/PM.jpg",
    quote: "দিল্লি নয়, পিন্ডি নয়, নয় অন্য কোনো দেশ… সবার আগে বাংলাদেশ।",
    initial: "ত",
    color: "#1a5c2a",
  },
];

const upcomingEvents = [
  { date: "২০", month: "জানু", title: "জাতীয় কর্মী সমাবেশ", location: "ঢাকা, সোহরাওয়ার্দী উদ্যান", time: "সকাল ১০টা" },
  { date: "২৫", month: "জানু", title: "বিভাগীয় সম্মেলন", location: "চট্টগ্রাম, পলো গ্রাউন্ড", time: "সকাল ১১টা" },
  { date: "০২", month: "ফেব্রু", title: "যুব নেতৃত্ব কর্মশালা", location: "রাজশাহী বিশ্ববিদ্যালয়", time: "দুপুর ২টা" },
  { date: "১০", month: "ফেব্রু", title: "রাজনৈতিক আলোচনা সভা", location: "সিলেট, রিকাবিবাজার", time: "বিকাল ৪টা" },
];

export default function Rajniti() {
  const [activeTab, setActiveTab] = useState("সংবাদ");
  const tabs = ["সংবাদ", "এজেন্ডা", "নেতৃত্ব", "আসন্ন অনুষ্ঠান"];

  return (
    <div className="rajniti-root">
      {/* Hero Section */}
      <section className="raj-hero">
        <div className="raj-hero-overlay" />
        <div className="raj-hero-content">
          <div className="raj-hero-badge">
            <span className="raj-flag-icon">🚩</span>
            <span>জাতীয় রাজনীতি</span>
          </div>
          <h1 className="raj-hero-title">
            গণতন্ত্রের পথে,<br />
            <span className="raj-hero-title-highlight">জনগণের কণ্ঠস্বর</span>
          </h1>
          <p className="raj-hero-subtitle">
            বাংলাদেশ জাতীয়তাবাদী মূল সামাজিক শাখার রাজনৈতিক কার্যক্রম, সংবাদ ও বিশ্লেষণ
          </p>
          <div className="raj-hero-stats">
            <div className="raj-stat">
              <span className="raj-stat-num">৪০+</span>
              <span className="raj-stat-label">বছরের ইতিহাস</span>
            </div>
            <div className="raj-stat-divider" />
            <div className="raj-stat">
              <span className="raj-stat-num">৬৪</span>
              <span className="raj-stat-label">জেলায় শাখা</span>
            </div>
            <div className="raj-stat-divider" />
            <div className="raj-stat">
              <span className="raj-stat-num">১কোটি+</span>
              <span className="raj-stat-label">সদস্য</span>
            </div>
          </div>
        </div>
        <div className="raj-hero-stars">
          <span className="raj-star s1">★</span>
          <span className="raj-star s2">★</span>
          <span className="raj-star s3">★</span>
          <span className="raj-star s4">★</span>
        </div>
      </section>

      {/* Tabs */}
      <section className="raj-tabs-wrapper">
        <div className="raj-container">
          <div className="raj-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`raj-tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="raj-container raj-main-content">
        {/* NEWS TAB */}
        {activeTab === "সংবাদ" && (
          <div className="raj-news-section">
            <div className="raj-section-header">
              <h2 className="raj-section-title">সর্বশেষ রাজনৈতিক সংবাদ</h2>
              <p className="raj-section-sub">দেশের রাজনৈতিক অঙ্গনের সর্বশেষ আপডেট</p>
            </div>
            <div className="raj-news-grid">
              {newsData.map((item, idx) => (
                <div className={`raj-news-card ${idx === 0 ? "featured" : ""}`} key={item.id}>
                  <div className="raj-news-img-wrap">
                    <img src={item.image} alt={item.title} className="raj-news-img" />
                    <span className={`raj-news-tag ${item.tag === "গুরুত্বপূর্ণ" ? "important" : item.tag === "বিশ্লেষণ" ? "analysis" : "youth"}`}>
                      {item.tag}
                    </span>
                  </div>
                  <div className="raj-news-body">
                    <div className="raj-news-meta">
                      <span className="raj-news-cat">{item.category}</span>
                      <span className="raj-news-date">📅 {item.date}</span>
                    </div>
                    <h3 className="raj-news-title">{item.title}</h3>
                    <p className="raj-news-excerpt">{item.excerpt}</p>
                    <button className="raj-read-more">বিস্তারিত পড়ুন →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AGENDA TAB */}
        {activeTab === "এজেন্ডা" && (
          <div className="raj-agenda-section">
            <div className="raj-section-header">
              <h2 className="raj-section-title">রাজনৈতিক এজেন্ডা</h2>
              <p className="raj-section-sub">আমাদের মূল দাবি ও লক্ষ্যমাত্রা</p>
            </div>
            <div className="raj-agenda-grid">
              {agenda.map((item, idx) => (
                <div className="raj-agenda-card" key={idx}>
                  <div className="raj-agenda-icon">{item.icon}</div>
                  <h3 className="raj-agenda-title">{item.title}</h3>
                  <p className="raj-agenda-desc">{item.desc}</p>
                  <div className="raj-agenda-num">০{idx + 1}</div>
                </div>
              ))}
            </div>
            <div className="raj-manifesto-banner">
              <div className="raj-manifesto-text">
                <h3>আমাদের রাজনৈতিক ইশতেহার</h3>
                <p>একটি গণতান্ত্রিক, সমৃদ্ধ ও ন্যায়ভিত্তিক বাংলাদেশ গড়ার অঙ্গীকার নিয়ে আমরা কাজ করে যাচ্ছি।</p>
              </div>
              <button className="raj-manifesto-btn">ইশতেহার ডাউনলোড করুন ↓</button>
            </div>
          </div>
        )}

        {/* LEADERS TAB */}
        {activeTab === "নেতৃত্ব" && (
          <div className="raj-leaders-section">
            <div className="raj-section-header">
              <h2 className="raj-section-title">নেতৃত্ব</h2>
              <p className="raj-section-sub">আমাদের অনুপ্রেরণার উৎস</p>
            </div>
            <div className="raj-leaders-grid">
              {leaders.map((leader, idx) => (
                <div className="raj-leader-card" key={idx}>
                  <img src={leader.image} alt={leader.name} className="raj-leader-avatar-img" />
                  <div className="raj-leader-info">
                    <h3 className="raj-leader-name">{leader.name}</h3>
                    <span className="raj-leader-role">{leader.role}</span>
                    <blockquote className="raj-leader-quote">"{leader.quote}"</blockquote>
                  </div>
                </div>
              ))}
            </div>
            <div className="raj-party-info">
              <div className="raj-party-info-inner">
                <h3>বিএনপি সামাজিক শক্তি সম্পর্কে</h3>
                <p>
                  বাংলাদেশ জাতীয়তাবাদী দলের সামাজিক শাখা হিসেবে বিএনপি সামাজিক শক্তি দেশের সকল স্তরের মানুষের কাছে গণতান্ত্রিক মূল্যবোধ ও জাতীয়তাবাদী চেতনা পৌঁছে দিতে কাজ করে আসছে।
                </p>
                <div className="raj-party-features">
                  <div className="raj-party-feature">✓ জনগণের রাজনীতি</div>
                  <div className="raj-party-feature">✓ গণতান্ত্রিক মূল্যবোধ</div>
                  <div className="raj-party-feature">✓ জাতীয় স্বার্থ সংরক্ষণ</div>
                  <div className="raj-party-feature">✓ দুর্নীতিমুক্ত রাজনীতি</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === "আসন্ন অনুষ্ঠান" && (
          <div className="raj-events-section">
            <div className="raj-section-header">
              <h2 className="raj-section-title">আসন্ন রাজনৈতিক অনুষ্ঠান</h2>
              <p className="raj-section-sub">আমাদের সাথে যোগ দিন</p>
            </div>
            <div className="raj-events-list">
              {upcomingEvents.map((event, idx) => (
                <div className="raj-event-card" key={idx}>
                  <div className="raj-event-date-box">
                    <span className="raj-event-day">{event.date}</span>
                    <span className="raj-event-month">{event.month}</span>
                  </div>
                  <div className="raj-event-info">
                    <h3 className="raj-event-title">{event.title}</h3>
                    <div className="raj-event-details">
                      <span>📍 {event.location}</span>
                      <span>⏰ {event.time}</span>
                    </div>
                  </div>
                  <button className="raj-event-btn">নিবন্ধন</button>
                </div>
              ))}
            </div>
            <div className="raj-join-cta">
              <div className="raj-join-cta-inner">
                <h3>🚩 দলে যোগ দিন</h3>
                <p>গণতন্ত্রের এই আন্দোলনে আপনিও অংশীদার হোন। আজই সদস্য হোন এবং পরিবর্তনের অংশ হোন।</p>
                <div className="raj-join-btns">
                  <button className="raj-join-primary">সদস্যপদ আবেদন করুন</button>
                  <button className="raj-join-secondary">আরও জানুন</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Ticker */}
      <div className="raj-ticker">
        <span className="raj-ticker-label">সর্বশেষ</span>
        <div className="raj-ticker-text">
          <span>
            বিএনপি সামাজিক শক্তির জাতীয় সম্মেলন সফলভাবে সম্পন্ন &nbsp;|&nbsp; গণতন্ত্র পুনরুদ্ধারে নতুন কর্মপরিকল্পনা ঘোষণা &nbsp;|&nbsp; সারা দেশে বিভাগীয় সম্মেলন শুরু হচ্ছে &nbsp;|&nbsp; তারুণ্যের অংশগ্রহণে নতুন রাজনৈতিক উদ্যোগ &nbsp;|&nbsp;
          </span>
        </div>
      </div>
    </div>
  );
}
