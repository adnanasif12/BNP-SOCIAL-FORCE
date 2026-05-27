import React from "react";
import "../styles/Footer.css";


const quickLinks = [
  "জাতীয় রাজনীতি",
  "মানবিক সহায়তা",
  "সরকারি উন্নয়ন",
  "সামাজিক কার্যক্রম",
  "আমাদের টিম",
  "ছবি / ভিডিও গ্যালারি",
  "ডোনেশন করুন",
];

export default function Footer() {
  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        {/* Left: Logo & Description */}
        <div className="footer-brand">
          <div className="footer-logo-row">
            <div className="footer-logo-circle">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="22" fill="#2d6a4f" />
                <circle cx="22" cy="22" r="18" stroke="#c8a000" strokeWidth="2" fill="none" />
                <text x="22" y="27" textAnchor="middle" fontSize="13" fill="#c8a000" fontWeight="bold">BNP</text>
              </svg>
            </div>
            <div>
              <div className="footer-org-name">BNP Social Force</div>
              <div className="footer-org-sub">BANGLADESH</div>
            </div>
          </div>
          <p className="footer-desc">
            দেশ, মানুষ ও গণতন্ত্রের জন্য নিবেদিত একটি সামাজিক সংগঠন।
          </p>
          <div className="footer-socials">
            <a href="#" className="footer-social-btn" title="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="footer-social-btn" title="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </a>
            <a href="#" className="footer-social-btn" title="X (Twitter)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="footer-social-btn" title="Chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </a>
          </div>
        </div>

        {/* Middle: Quick Links */}
        <div className="footer-links-col">
          <h3 className="footer-col-title">দ্রুত লিংক</h3>
          <ul className="footer-links-list">
            {quickLinks.map((link, i) => (
              <li key={i}>
                <a href="#" className="footer-link">
                  <span className="footer-link-arrow">›</span> {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Contact */}
        <div className="footer-contact-col">
          <h3 className="footer-col-title">যোগাযোগ করুন</h3>
          <div className="footer-contact-list">
            <div className="footer-contact-item">
              <span className="footer-contact-icon location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              </span>
              <div>
                <div className="footer-contact-label">ঠিকানা</div>
                <div className="footer-contact-val">[সংগঠনের ঠিকানা], ঢাকা, বাংলাদেশ</div>
              </div>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon phone">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              </span>
              <div>
                <div className="footer-contact-label">ফোন</div>
                <div className="footer-contact-val">+880 1X-XXXX-XXXX</div>
                <div className="footer-contact-val">+880 1X-XXXX-XXXX</div>
              </div>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon email">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </span>
              <div>
                <div className="footer-contact-label">ইমেইল</div>
                <div className="footer-contact-val">info@bnpsocialforce.org</div>
                <div className="footer-contact-val">support@bnpsocialforce.org</div>
              </div>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon whatsapp">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </span>
              <div>
                <div className="footer-contact-label">WHATSAPP</div>
                <div className="footer-contact-val">+880 1X-XXXX-XXXX</div>
              </div>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon clock">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 5v5.25l4.5 2.67-.75 1.23L11 13V7h1.5z"/></svg>
              </span>
              <div>
                <div className="footer-contact-label">অফিস সময়</div>
                <div className="footer-contact-val">শনি - বৃহস্পতি: সকাল ৯টা - বিকাল ৬টা</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider Quote */}
      <div className="footer-divider-quote">
        <span>৯০ সামাজিক শক্তির পথে, দেশের কল্যাণে — BNP Social Force Bangladesh</span>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <span>© ২০২৬ BNP Social Force — সকল স্বত্ব সংরক্ষিত</span>
      </div>

      {/* Bottom Red Line */}
      <div className="footer-red-line"></div>
    </footer>
  );
}
