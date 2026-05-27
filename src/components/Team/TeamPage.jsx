import React, { useState } from "react";
import "./TeamPage.css";
// @ts-ignore
import FounderCard from "../FounderCard";

  // |তৌফিকুর রহমান| মাসুম বিল্লাহ  [আশিকুর রহমান]  [আরিফ হোসেন]  [নাম]  [রিফাত রহমান]  [আদনান আসিফ]


const teamMembers = [
  {
    id: 1,
    name: "মাসুম বিল্লাহ",
    department: "Admin",
    // role: "প্রধান নির্বাহী কর্মকর্তা",
    image: "/images/team/team1.jpg",
    // bio: "১০+ বছরের অভিজ্ঞতা সম্পন্ন একজন দক্ষ উদ্যোক্তা ও প্রযুক্তি নেতা।",
    social: {
      facebook: "#",
      linkedin: "#",
      twitter: "#",
    },
    // skills: ["নেতৃত্ব", "কৌশল", "উদ্ভাবন"],
  },
  {
    id: 2,
    name: "[আশিকুর রহমান]",
    // role: "প্রধান ডিজাইনার",
    department: "Admin",
    image: "/images/team/team2.jpg",
    // bio: "ব্যবহারকারীদের অভিজ্ঞতা উন্নত করতে সৃজনশীল ডিজাইন তৈরিতে বিশেষজ্ঞ।",
    social: {
      facebook: "#",
      linkedin: "#",
      twitter: "#",
    },
    // skills: ["UI/UX", "Figma", "Branding"],
  },
  {
    id: 3,
    name: "[আরিফ হোসেন]",
    // role: "সিনিয়র ডেভেলপার",
    department: "Admin",
    image: "/images/team/team3.jpg",
    // bio: "ফুলস্ট্যাক ডেভেলপমেন্টে দক্ষ, React ও Node.js এ বিশেষজ্ঞ।",
    social: {
      facebook: "#",
      linkedin: "#",
      twitter: "#",
    },
    // skills: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 4,
    name: "আসিফ হোসেন",
    // role: "প্রজেক্ট ম্যানেজার",
    department: "Admin",
    image: "/images/team/team4.jpg",
    // bio: "সময়মতো প্রজেক্ট ডেলিভারি নিশ্চিত করতে দক্ষ পরিকল্পনাকারী।",
    social: {
      facebook: "#",
      linkedin: "#",
      twitter: "#",
    },
    // skills: ["Agile", "Scrum", "পরিকল্পনা"],
  },
  {
    id: 5,
    name: "[রিফাত রহমান]",
    // role: "ব্যাকএন্ড ডেভেলপার",
    department: "Admin",
    image: "/images/team/team5.jpg",
    // bio: "সার্ভার সাইড আর্কিটেকচার ও API ডিজাইনে অভিজ্ঞ ডেভেলপার।",
    social: {
      facebook: "#",
      linkedin: "#",
      twitter: "#",
    },
    // skills: ["Python", "Django", "PostgreSQL"],
  },
  {
    id: 6,
    name: "[আদনান আসিফ]",
    // role: "মোবাইল ডেভেলপার",
    department: "Admin",
    image: "/images/team/team6.jpg",
    // bio: "iOS ও Android উভয় প্ল্যাটফর্মে অ্যাপ তৈরিতে পারদর্শী।",
    social: {
      facebook: "#",
      linkedin: "#",
      twitter: "#",
    },
    // skills: ["React Native", "Flutter", "Swift"],
  },
];

const founderData = {
  avatarLetter: 'প',
  avatarColor: '#1a4d1a',
  name: '|তৌফিকুর রহমান|',
  designation: 'প্রতিষ্ঠাতা ও সভাপতি — BNP Social Force',
  bio: 'দেশ ও মানুষের সেবায় নিবেদিত একজন তরুণ রাজনৈতিক ও সমাজসেবক।',
  image: '/images/team/Founder.jpg',
  facebook: '#',
  twitter: '#',
  email: 'info@example.com',
  // phone: '+8801700000000',
};

const departments = ["সবাই", "নেতৃত্ব", "ডিজাইন", "প্রযুক্তি", "ব্যবস্থাপনা"];

const TeamPage = () => {
  const [activeFilter, setActiveFilter] = useState("সবাই");
  const [hoveredId, setHoveredId] = useState(null);

  const filtered =
    activeFilter === "সবাই"
      ? teamMembers
      : teamMembers.filter((m) => m.department === activeFilter);

  return (
    <div className="team-page">
      

      {/* Hero Section */}
      <div className="team-hero">
        <div className="team-hero-bg" />
        <div className="team-hero-content">
          <div className="team-badge">👥 আমাদের পরিবার</div>
          <h1 className="team-hero-title">
            আমাদের <span className="highlight">অসাধারণ টিম</span>
          </h1>
          <p className="team-hero-subtitle">
            আমরা একদল উৎসাহী, প্রতিভাবান ও নিবেদিতপ্রাণ মানুষ যারা একসাথে
            কাজ করে সমাজকে আরও সুন্দর করে তুলছি।
          </p>
          

          {/* Stats */}
          <div className="team-stats">
            <div className="stat-item">
              <span className="stat-number">৬+</span>
              <span className="stat-label">দক্ষ সদস্য</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">৫০+</span>
              <span className="stat-label">সফল প্রজেক্ট</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">৩+</span>
              <span className="stat-label">বছরের অভিজ্ঞতা</span>
            </div>
            {/* Founder Section */}
      <div className="team-founder-section">
        <div className="team-founder-container">
          <FounderCard founder={founderData} />
        </div>
      </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="team-filter-section">
        <div className="team-filter-container">
          {departments.map((dept) => (
            <button
              key={dept}
              className={`filter-btn ${activeFilter === dept ? "active" : ""}`}
              onClick={() => setActiveFilter(dept)}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Team Grid */}
      <div className="team-grid-section">
        <div className="team-grid">
          {filtered.map((member) => (
            <div
              key={member.id}
              className={`team-card ${hoveredId === member.id ? "hovered" : ""}`}
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Card Glow */}
              <div className="card-glow" />

              {/* Image Section */}
              <div className="card-image-wrap">
                <div className="card-image-ring" />
                <img
                  src={member.image}
                  alt={member.name}
                  className="card-image"
                />
                <div className="card-dept-badge">{member.department}</div>
              </div>

              {/* Info */}
              <div className="card-info">
                <h3 className="card-name">{member.name}</h3>
                {member.role && <p className="card-role">{member.role}</p>}
                {member.bio && <p className="card-bio">{member.bio}</p>}

                {/* Skills */}
                {member.skills && member.skills.length > 0 && (
                  <div className="card-skills">
                    {member.skills.map((skill, i) => (
                      <span key={i} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Social Links */}
                <div className="card-social">
                  <a href={member.social.facebook} className="social-btn fb" title="Facebook">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href={member.social.linkedin} className="social-btn li" title="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href={member.social.twitter} className="social-btn tw" title="Twitter">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join Team CTA */}
      <div className="team-join-section">
        <div className="team-join-card">
          <div className="join-emoji">🚀</div>
          <h2 className="join-title">আমাদের টিমে যোগ দিন</h2>
          <p className="join-text">
            আপনিও কি একটি অর্থবহ পরিবর্তনের অংশ হতে চান? আমরা সবসময় প্রতিভাবান
            মানুষদের স্বাগত জানাই।
          </p>
          <button className="join-btn">আবেদন করুন →</button>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
