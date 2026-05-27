import React, { useState } from "react";
import "./SamajikKarjokrom.css";

const programs = [
  {
    id: 1,
    icon: "🍱",
    category: "খাদ্য সহায়তা",
    title: "বিনামূল্যে খাদ্য বিতরণ",
    description:
      "দুর্যোগ, দারিদ্র্য ও রমজান মাসে অসহায় পরিবারের মাঝে খাদ্য সহায়তা প্রদান করা হয়।",
    beneficiaries: "২ লক্ষ+",
    frequency: "মাসিক",
    color: "#e67e22",
  },
  {
    id: 2,
    icon: "📚",
    category: "শিক্ষা কার্যক্রম",
    title: "বৃত্তি ও শিক্ষা উপকরণ",
    description:
      "মেধাবী কিন্তু অসচ্ছল শিক্ষার্থীদের বৃত্তি ও বই-খাতা সরবরাহ করা হচ্ছে।",
    beneficiaries: "৫০ হাজার+",
    frequency: "বার্ষিক",
    color: "#2980b9",
  },
  {
    id: 3,
    icon: "🏥",
    category: "স্বাস্থ্যসেবা",
    title: "বিনামূল্যে চিকিৎসা ক্যাম্প",
    description:
      "প্রত্যন্ত অঞ্চলে বিনামূল্যে ডাক্তারি পরামর্শ, ওষুধ ও রক্তের গ্রুপ পরীক্ষা।",
    beneficiaries: "৮০ হাজার+",
    frequency: "ত্রৈমাসিক",
    color: "#e74c3c",
  },
  {
    id: 4,
    icon: "🩸",
    category: "রক্তদান",
    title: "স্বেচ্ছা রক্তদান কর্মসূচি",
    description:
      "সারা দেশে রক্তদান ক্যাম্প আয়োজন করা হয়। জরুরি রক্তের প্রয়োজনেও সাড়া দেওয়া হয়।",
    beneficiaries: "১৫ হাজার+",
    frequency: "দ্বি-মাসিক",
    color: "#c0392b",
  },
  {
    id: 5,
    icon: "💧",
    category: "দুর্যোগ ব্যবস্থাপনা",
    title: "বন্যা ও দুর্যোগ ত্রাণ",
    description:
      "প্রাকৃতিক দুর্যোগে ক্ষতিগ্রস্তদের পাশে দাঁড়িয়ে ত্রাণ ও পুনর্বাসনে সহায়তা।",
    beneficiaries: "৩ লক্ষ+",
    frequency: "প্রয়োজন অনুযায়ী",
    color: "#1a6fa8",
  },
  {
    id: 6,
    icon: "👩‍💼",
    category: "নারী উন্নয়ন",
    title: "নারীর ক্ষমতায়ন প্রশিক্ষণ",
    description:
      "গ্রামীণ নারীদের আত্মকর্মসংস্থান, সেলাই, কারুশিল্প ও উদ্যোক্তা প্রশিক্ষণ দেওয়া হয়।",
    beneficiaries: "২৫ হাজার+",
    frequency: "ধারাবাহিক",
    color: "#8e44ad",
  },
];

const timeline = [
  { year: "২০১৬", title: "যাত্রা শুরু", desc: "৫টি জেলায় প্রাথমিক সামাজিক কার্যক্রম শুরু।" },
  { year: "২০১৮", title: "বিস্তৃতি", desc: "৩২ জেলায় নিয়মিত স্বাস্থ্যসেবা ও খাদ্য বিতরণ।" },
  { year: "২০২০", title: "কোভিড সাড়া", desc: "মহামারিতে ১ লক্ষ পরিবারকে খাদ্য সহায়তা প্রদান।" },
  { year: "২০২২", title: "জাতীয় বিস্তার", desc: "৬৪ জেলায় সম্পূর্ণ কার্যক্রম পরিচালনা শুরু।" },
  { year: "২০২৪", title: "রেকর্ড সেবা", desc: "৫ লক্ষ মানুষকে সরাসরি সেবা প্রদান নিশ্চিত।" },
];

const volunteers = [
  { name: "রাহেলা বেগম", role: "স্বাস্থ্য স্বেচ্ছাসেবী", district: "ঢাকা", emoji: "👩" },
  { name: "মো. আরিফ হোসেন", role: "শিক্ষা সমন্বয়ক", district: "চট্টগ্রাম", emoji: "👨" },
  { name: "সুমাইয়া আক্তার", role: "ত্রাণ বিতরণকারী", district: "সিলেট", emoji: "👩" },
  { name: "মো. রবিউল ইসলাম", role: "খাদ্য সহায়তা", district: "রাজশাহী", emoji: "👨" },
];

export default function SamajikKarjokrom() {
  const [activeProgram, setActiveProgram] = useState(null);

  return (
    <div className="samajik-page">
      {/* Hero */}
      <section className="samajik-hero">
        <div className="samajik-hero-overlay" />
        <div className="samajik-hero-grid">
          <div className="samajik-hero-left">
            <span className="samajik-badge">🌍 সামাজিক কার্যক্রম</span>
            <h1 className="samajik-hero-title">
              সমাজের প্রতিটি মানুষের
              <br />
              <span className="samajik-hero-em">পাশে আছি আমরা</span>
            </h1>
            <p className="samajik-hero-text">
              বিএনপি সামাজিক শক্তির সামাজিক কার্যক্রম কেবল সহায়তা নয় — এটি
              একটি সামাজিক আন্দোলন যেখানে প্রতিটি মানুষ মর্যাদার সাথে বাঁচার
              অধিকার রাখে।
            </p>
            <div className="samajik-hero-btns">
              <button className="s-btn-primary">কার্যক্রম দেখুন</button>
              <button className="s-btn-ghost">স্বেচ্ছাসেবী হন →</button>
            </div>
          </div>
          <div className="samajik-hero-right">
            <div className="floating-stats-group">
              <div className="fs-card green">
                <span className="fs-num">৫ লক্ষ+</span>
                <span className="fs-lbl">উপকারভোগী</span>
              </div>
              <div className="fs-card orange">
                <span className="fs-num">৫০০+</span>
                <span className="fs-lbl">স্বেচ্ছাসেবী দল</span>
              </div>
              <div className="fs-card blue">
                <span className="fs-num">৬৪</span>
                <span className="fs-lbl">জেলায় সক্রিয়</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f4f5f7" />
          </svg>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="samajik-programs">
        <div className="sec-hd">
          <div className="sec-hd-tag">আমাদের কার্যক্রম</div>
          <h2>সামাজিক সেবার ক্ষেত্রসমূহ</h2>
          <p>দেশের সুবিধাবঞ্চিত মানুষের জন্য আমাদের বিভিন্নমুখী সেবা কার্যক্রম</p>
        </div>
        <div className="programs-grid">
          {programs.map((prog) => (
            <div
              className={`prog-card ${activeProgram === prog.id ? "expanded" : ""}`}
              key={prog.id}
              onClick={() => setActiveProgram(activeProgram === prog.id ? null : prog.id)}
              style={{ "--card-color": prog.color }}
            >
              <div className="prog-card-head">
                <div className="prog-icon-wrap" style={{ background: prog.color + "18" }}>
                  <span className="prog-icon">{prog.icon}</span>
                </div>
                <div>
                  <span className="prog-category" style={{ color: prog.color }}>{prog.category}</span>
                  <h3 className="prog-title">{prog.title}</h3>
                </div>
                <span className="prog-toggle">{activeProgram === prog.id ? "−" : "+"}</span>
              </div>

              <div className="prog-body">
                <p className="prog-desc">{prog.description}</p>
                <div className="prog-meta">
                  <div className="prog-meta-item">
                    <span className="pm-label">উপকারভোগী</span>
                    <strong style={{ color: prog.color }}>{prog.beneficiaries}</strong>
                  </div>
                  <div className="prog-meta-item">
                    <span className="pm-label">কার্যক্রম</span>
                    <strong style={{ color: prog.color }}>{prog.frequency}</strong>
                  </div>
                </div>
                <button
                  className="prog-btn"
                  style={{ background: prog.color }}
                  onClick={(e) => e.stopPropagation()}
                >
                  বিস্তারিত জানুন
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="samajik-timeline">
        <div className="timeline-inner">
          <div className="sec-hd white">
            <div className="sec-hd-tag light">আমাদের যাত্রা</div>
            <h2>সামাজিক কার্যক্রমের ইতিহাস</h2>
          </div>
          <div className="timeline-track">
            {timeline.map((item, i) => (
              <div className={`tl-item ${i % 2 === 0 ? "left" : "right"}`} key={i}>
                <div className="tl-dot" />
                <div className="tl-card">
                  <span className="tl-year">{item.year}</span>
                  <strong className="tl-title">{item.title}</strong>
                  <p className="tl-desc">{item.desc}</p>
                </div>
              </div>
            ))}
            <div className="tl-line" />
          </div>
        </div>
      </section>

      {/* Volunteer Spotlight */}
      <section className="samajik-volunteers">
        <div className="sec-hd">
          <div className="sec-hd-tag">মাঠ পর্যায়ে</div>
          <h2>আমাদের স্বেচ্ছাসেবীরা</h2>
          <p>প্রতিটি কার্যক্রমের পেছনে আছেন নিবেদিত স্বেচ্ছাসেবীরা</p>
        </div>
        <div className="volunteer-grid">
          {volunteers.map((v, i) => (
            <div className="vol-card" key={i}>
              <div className="vol-avatar">{v.emoji}</div>
              <div className="vol-info">
                <strong className="vol-name">{v.name}</strong>
                <span className="vol-role">{v.role}</span>
                <span className="vol-dist">📍 {v.district}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="vol-join-cta">
          <p>আপনিও কি সমাজের জন্য কিছু করতে চান?</p>
          <button className="vol-join-btn">স্বেচ্ছাসেবী হিসেবে নিবন্ধন করুন 🙋</button>
        </div>
      </section>

      {/* Contact/Donate Strip */}
      <section className="samajik-footer-cta">
        <div className="fcta-content">
          <div>
            <h2>সহায়তা করুন, পরিবর্তন আনুন</h2>
            <p>আপনার ছোট অবদান হাজারো মানুষের মুখে হাসি ফোটাতে পারে।</p>
          </div>
          <div className="fcta-actions">
            <button className="fcta-donate">💚 ডোনেশন করুন</button>
            <button className="fcta-contact">📞 যোগাযোগ করুন</button>
          </div>
        </div>
      </section>
    </div>
  );
}
