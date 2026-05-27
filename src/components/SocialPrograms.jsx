import React from "react";
import "../styles/SocialPrograms.css";

const programs = [
  {
    id: 1,
    icon: "🏥",
    iconBg: "icon-bg-green",
    title: "বিনামূল্যে স্বাস্থ্য সেবা ক্যাম্প",
    date: "২৫ মে, ২০২৬",
    description: "ঢাকা, চট্টগ্রাম, রাজশাহীতে একযোগে অনুষ্ঠিত হবে",
    borderColor: "border-green",
  },
  {
    id: 2,
    icon: "🎓",
    iconBg: "icon-bg-yellow",
    title: "শিক্ষা বৃত্তি প্রদান অনুষ্ঠান",
    date: "২০ মে, ২০২৬",
    description: "মেধাবী শিক্ষার্থীদের জন্য বার্ষিক বৃত্তি প্রদান",
    borderColor: "border-yellow",
  },
  {
    id: 3,
    icon: "🌿",
    iconBg: "icon-bg-red",
    title: "বৃক্ষরোপণ অভিযান",
    date: "২৫ মে, ২০২৬",
    description: "সারাদেশে একযোগে ১০,০০০ গাছ লাগানোর কার্যক্রম",
    borderColor: "border-red",
  },
];

const SocialPrograms = () => {
  return (
    <section className="social-programs-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-bar"></span>
          সামাজিক কার্যক্রম
        </h2>
        <a href="#" className="see-all-link">
          সব দেখুন →
        </a>
      </div>

      <div className="programs-list">
        {programs.map((program) => (
          <div className={`program-item ${program.borderColor}`} key={program.id}>
            <div className={`program-icon ${program.iconBg}`}>
              <span>{program.icon}</span>
            </div>
            <div className="program-info">
              <h4 className="program-title">{program.title}</h4>
              <p className="program-meta">
                {program.date} — {program.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SocialPrograms;
