import '../styles/founderCard.css';

export default function FounderCard({ founder }) {
  return (
    <div className="founder-card">
      <div className="founder-card-inner">
        {/* Founder Image */}
        <div className="founder-avatar">
          <img 
            src="/images/team/Founder.jpg" 
            alt="Founder"
            className="founder-image"
          />
        </div>

        {/* Info */}
        <div className="founder-info">
          {/* Badge */}
          <div className="founder-badge-wrapper">
            <span className="founder-role-badge">★ প্রতিষ্ঠাতা</span>
          </div>
          <h2 className="founder-name">{founder.name}</h2>
          <p className="founder-designation">{founder.designation}</p>
          <p className="founder-bio">{founder.bio}</p>

          {/* Social Icons */}
          <div className="founder-social-links">
            <a href={founder.facebook || '#'} className="social-icon-btn" title="Facebook">
              <span>f</span>
            </a>
            <a href={founder.twitter || '#'} className="social-icon-btn" title="Twitter">
              <span>t</span>
            </a>
            <a href={`mailto:${founder.email || ''}`} className="social-icon-btn" title="Email">
              <span>@</span>
            </a>
            <a href={`tel:${founder.phone || ''}`} className="social-icon-btn social-icon-phone" title="Phone">
              <span>📞</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
