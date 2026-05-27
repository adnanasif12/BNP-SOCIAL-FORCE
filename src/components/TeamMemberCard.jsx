import '../styles/TeamMemberCard.css';

export default function TeamMemberCard({ member }) {
  return (
    <div className="team-card">
      {/* Avatar Circle */}
      <div
        className="team-avatar"
        style={{ backgroundColor: member.avatarColor }}
      >
        {member.image ? (
          <img 
            src={member.image}
            alt={member.name}
            className="team-avatar-image"
          />
        ) : (
          <span className="team-avatar-letter">{member.avatarLetter}</span>
        )}
      </div>

      {/* Name */}
      <h3 className="team-name">{member.name}</h3>

      {/* Designation */}
      <p className="team-designation">{member.designation}</p>

      {/* Department Badge */}
      <span className="team-dept-badge">{member.department}</span>
    </div>
  );
}
