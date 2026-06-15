import './styles/global.css';
// useEffect
import { useState, useEffect } from 'react';
// @ts-ignore
import TopBar from './components/TopBar';
// @ts-ignore
import Header from './components/Header';
// @ts-ignore
import Navbar from './components/Navbar';
// @ts-ignore
import HeroSection from './components/HeroSection';
// @ts-ignore
import StatsSection from './components/StatsSection';
// @ts-ignore
import TeamHeader from './components/TeamHeader';
// @ts-ignore
import TeamGrid from './components/TeamGrid';
// @ts-ignore
import TeamMemberCard from './components/TeamMemberCard';
// @ts-ignore
import FounderCard from './components/FounderCard';
// @ts-ignore
import LatestNews from './components/LatestNews';
// @ts-ignore
import SocialPrograms from './components/SocialPrograms'; 
// @ts-ignore
import Footer from './components/Footer';
// @ts-ignore
 import DonationSection from './components/DonationSection';
// @ts-ignore
import ImageGallery from './components/ImageGallery';
//@ts-ignore
import Rajniti from './components/Rajniti/Rajniti';
// @ts-ignore
import OurMission from './components/Our-Donation/OurDonation';
// @ts-ignore
import Unnoyon from './components/Unnoyon/Unnoyon';
// @ts-ignore
import SamajikKarjokrom from './components/SamajikKarjokrom/SamajikKarjokrom';
//@ts-ignore
import TeamPage from './components/Team/TeamPage';
// @ts-ignore
import DonationPage from './components/Donation/DonationPage';
// @ts-ignore
import MembershipPage from './components/Membership/MembershipPage';
// @ts-ignore
import AdminPanel from './backend/components/AdminPanel';


function App() {
  const [activeSection, setActiveSection] = useState(1);

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(2); // Remove '#/' prefix
      const sectionMap: { [key: string]: number } = {
        '': 1,
        'home': 1,
        'politics': 2,
        'help': 3,
        'development': 4,
        'social': 5,
        'team': 6,
        'gallery': 7,
        'donation': 8,
        'membership': 9,
      };
      
      const section = sectionMap[hash] || 1;
      setActiveSection(section);
    };

    // Set initial section from URL
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const founderData = {
    avatarLetter: 'প',
    avatarColor: '#1a4d1a',
    name: '|তৌফিকুর রহমান|',
    designation: 'প্রতিষ্ঠাতা — BNP Social Force',
    //  ও সভাপতি
    bio: 'দেশ ও মানুষের সেবায় নিবেদিত একজন তরুণ রাজনৈতিক ও সমাজসেবক।',
    facebook: '#',
    twitter: '#',
    email: 'info@example.com',
    // phone: '+8801700000000',
  };


  // |তৌফিকুর রহমান| মাসুম বিল্লাহ  [আশিকুর রহমান]  [আরিফ হোসেন]  [নাম]  [রিফাত রহমান]  [আদনান আসিফ]

  const teamMembers = [
    {
      image: '/images/team/team1.jpg',
      avatarLetter: 'সা',
      avatarColor: '#1a4d1a',
      name: '[মাসুম বিল্লাহ]',
      // designation: 'সাধারণ সম্পাদক',
      department: 'Admin',
    },
    {
      image: '/images/team/team2.jpg',
      avatarLetter: 'অ',
      avatarColor: '#b8860b',
      name: '[আশিকুর রহমান]',
      // designation: 'অর্থ সম্পাদক',
      department: 'Admin',
    },
    
    {
      image: '/images/team/team3.jpg',
      avatarLetter: 'প্র',
      avatarColor: '#c0392b',
      name: '[আরিফ হোসেন]',
      // designation: 'প্রচার সম্পাদক',
      department: 'Admin',
    },
    {
      image: '/images/team/team4.jpg',
      avatarLetter: 'সো',
      avatarColor: '#2471a3',
      name: '[নাম]',
      // designation: 'সোশ্যাল মিডিয়া ম্যানেজার',
      department: 'Admin',
    },
    {
      image: '/images/team/team5.jpg',
      avatarLetter: 'মা',
      avatarColor: '#1a4d1a',
      name: '[রিফাত রহমান]',
      designation: 'মানবিক সহায়তা সমন্বয়ক',
      department: 'Admin',
    },
    {
      image: '/images/team/team6.jpg',
      avatarLetter: 'ত',
      avatarColor: '#6c3483',
      name: '[আদনান আসিফ]',
      // designation: 'তরুণ শাখা প্রধান',
      department: 'Admin',
    },
  ];

  return (
    <div className="page-wrapper">
      <AdminPanel />
      <TopBar />
      <Header setActiveSection={setActiveSection} />
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      {activeSection === 1 && (
        <>
          <HeroSection />
          <StatsSection />
          <TeamHeader/>
          <FounderCard founder={founderData} />
          <TeamGrid members={teamMembers} />
          <LatestNews />
          <SocialPrograms />
          <ImageGallery />
          <DonationSection />
          <Footer />
        </>
      )}
      {activeSection === 2 && <Rajniti />}
      {activeSection === 3 && <OurMission />}
      {activeSection === 4 && <Unnoyon />}
      {activeSection === 5 && <SamajikKarjokrom />}
      {activeSection === 6 && <TeamPage />}
      {activeSection === 7 && <ImageGallery />}
      {activeSection === 8 && <DonationPage />}
      {activeSection === 9 && <MembershipPage />}
    </div>
  );
}

export default App;
