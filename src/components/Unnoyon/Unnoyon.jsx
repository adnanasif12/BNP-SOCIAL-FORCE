import React, { useEffect, useRef, useState } from "react";
import "./Unnoyon.css";

const projects = [
  {
    id: 1,
    icon: "🏗️",
    title: "অবকাঠামো উন্নয়ন",
    description:
      "রাস্তা, সেতু ও সরকারি স্থাপনার উন্নয়নে সক্রিয় ভূমিকা পালন করছে বিএনপি সামাজিক শক্তি।",
    progress: 78,
    tag: "চলমান",
    color: "#e8a020",
  },
  {
    id: 2,
    icon: "🏫",
    title: "শিক্ষা উন্নয়ন",
    description:
      "বিদ্যালয় নির্মাণ, বৃত্তি প্রদান ও শিক্ষার মান উন্নয়নে আমরা প্রতিশ্রুতিবদ্ধ।",
    progress: 85,
    tag: "সক্রিয়",
    color: "#2e8b57",
  },
  {
    id: 3,
    icon: "🏥",
    title: "স্বাস্থ্যসেবা উন্নয়ন",
    description:
      "গ্রামীণ স্বাস্থ্যসেবা কেন্দ্র স্থাপন ও বিনামূল্যে চিকিৎসা সেবা প্রদানে আমরা অগ্রণী।",
    progress: 65,
    tag: "পরিকল্পিত",
    color: "#c0392b",
  },
  {
    id: 4,
    icon: "💡",
    title: "বিদ্যুৎ ও জ্বালানি",
    description:
      "সৌরশক্তি ও নবায়নযোগ্য জ্বালানি ব্যবহারে সচেতনতা ও বাস্তবায়নে কাজ করছি।",
    progress: 50,
    tag: "চলমান",
    color: "#8e44ad",
  },
  {
    id: 5,
    icon: "🌾",
    title: "কৃষি উন্নয়ন",
    description:
      "কৃষকদের আধুনিক প্রযুক্তি ও সার সহায়তা প্রদানের মাধ্যমে কৃষি খাতকে এগিয়ে নিচ্ছি।",
    progress: 72,
    tag: "সক্রিয়",
    color: "#27ae60",
  },
  {
    id: 6,
    icon: "🌊",
    title: "পানি ও পয়ঃনিষ্কাশন",
    description:
      "বিশুদ্ধ পানি সরবরাহ ও স্বাস্থ্যকর পয়ঃনিষ্কাশন ব্যবস্থার উন্নয়নে অবদান রাখছি।",
    progress: 60,
    tag: "চলমান",
    color: "#2980b9",
  },
];

const stats = [
  { value: "৩৫০+", label: "উন্নয়ন প্রকল্প", icon: "📋" },
  { value: "৬৪", label: "জেলায় কার্যক্রম", icon: "🗺️" },
  { value: "৪৮৫+", label: "কোটি টাকা বিনিয়োগ", icon: "💰" },
  { value: "১২+", label: "বছরের অভিজ্ঞতা", icon: "🏆" },
];

function AnimatedCounter({ target, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const numericTarget = parseInt(target.replace(/[^0-9]/g, ""), 10);
          const start = Date.now();
          const step = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(progress * numericTarget));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  const suffix = target.replace(/[0-9]/g, "");
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Unnoyon() {
  const [activeFilter, setActiveFilter] = useState("সব");
  const filters = ["সব", "চলমান", "সক্রিয়", "পরিকল্পিত"];

  const filtered =
    activeFilter === "সব"
      ? projects
      : projects.filter((p) => p.tag === activeFilter);

  return (
    <div className="unnoyon-page">
      {/* Hero */}
      <section className="unnoyon-hero">
        <div className="hero-bg-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
        </div>
        <div className="hero-content">
          <span className="hero-badge">🏗️ উন্নয়ন কার্যক্রম</span>
          <h1 className="hero-title">
            উন্নয়নের পথে <br />
            <span className="hero-highlight">একসাথে এগিয়ে যাই</span>
          </h1>
          <p className="hero-subtitle">
            বিএনপি সামাজিক শক্তি দেশের প্রতিটি কোণে উন্নয়নের আলো পৌঁছে দিতে
            অক্লান্ত পরিশ্রম করে যাচ্ছে। অবকাঠামো থেকে শিক্ষা, স্বাস্থ্য
            থেকে কৃষি — সর্বত্র আমাদের উপস্থিতি।
          </p>
          <div className="hero-actions">
            <button className="btn-primary">প্রকল্প দেখুন ↓</button>
            <button className="btn-secondary">স্বেচ্ছাসেবক হন</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-card">
            <div className="visual-icon">🇧🇩</div>
            <div className="visual-text">
              <strong>বাংলাদেশ</strong>
              <span>উন্নয়নের পথে</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="unnoyon-stats">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat-card" key={i}>
              <span className="stat-icon">{s.icon}</span>
              <strong className="stat-value">
                <AnimatedCounter target={s.value} />
              </strong>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="unnoyon-projects">
        <div className="section-header">
          <h2 className="section-title">আমাদের উন্নয়ন প্রকল্পসমূহ</h2>
          <p className="section-subtitle">
            দেশের সামগ্রিক উন্নয়নে আমরা বিভিন্ন খাতে কাজ করে যাচ্ছি
          </p>
        </div>

        <div className="filter-tabs">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((project) => (
            <div className="project-card" key={project.id}>
              <div
                className="project-card-top"
                style={{ background: project.color + "18", borderColor: project.color + "40" }}
              >
                <span className="project-icon">{project.icon}</span>
                <span
                  className="project-tag"
                  style={{ background: project.color + "22", color: project.color }}
                >
                  {project.tag}
                </span>
              </div>
              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="progress-wrap">
                  <div className="progress-label">
                    <span>অগ্রগতি</span>
                    <span style={{ color: project.color }}>{project.progress}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${project.progress}%`,
                        background: project.color,
                      }}
                    />
                  </div>
                </div>
                <button
                  className="project-cta"
                  style={{ color: project.color, borderColor: project.color + "60" }}
                >
                  বিস্তারিত জানুন →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="unnoyon-cta">
        <div className="cta-content">
          <h2>উন্নয়নের অংশীদার হন</h2>
          <p>আপনার অবদান দেশের ভবিষ্যৎ গড়ে তুলবে। আজই যোগ দিন।</p>
          <div className="cta-buttons">
            <button className="cta-btn-main">ডোনেশন করুন 💚</button>
            <button className="cta-btn-outline">স্বেচ্ছাসেবক হিসেবে যোগ দিন</button>
          </div>
        </div>
        <div className="cta-deco">🏗️</div>
      </section>
    </div>
  );
}
