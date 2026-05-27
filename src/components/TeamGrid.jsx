import React from 'react';
import '../styles/TeamGrid.css';
import TeamMemberCard from './TeamMemberCard';

export default function TeamGrid({ members = [] }) {
  return (
    <div className="team-grid">
      {members.map((member, index) => (
        <TeamMemberCard key={index} member={member} />
      ))}
    </div>
  );
}
