import React, { useState, useEffect } from 'react';
import '../styles/Backend.css';
import MemberForm from './MemberForm';
import DonationPayment from './DonationPayment';
import { donationsApi } from '../../utils/api';
import { downloadExcel } from '../utils/excelExport';

const Backend = () => {
  const [activeTab, setActiveTab] = useState('members');
  const [memberCount, setMemberCount] = useState(0);
  const [donationTotal, setDonationTotal] = useState(0);
  const [donationCount, setDonationCount] = useState(0);
  const [apiDonations, setApiDonations] = useState([]);
  const [localDonations, setLocalDonations] = useState([]);
  const [members, setMembers] = useState([]);

  // Load data on mount
  useEffect(() => {
    // Load localStorage donations
    const savedDonations = localStorage.getItem('bnp_donations');
    if (savedDonations) {
      try {
        const parsed = JSON.parse(savedDonations);
        setLocalDonations(parsed);
      } catch (e) {
        console.error('Error loading local donations:', e);
      }
    }

    // Load localStorage members
    const savedMembers = localStorage.getItem('bnp_members');
    if (savedMembers) {
      try {
        const parsed = JSON.parse(savedMembers);
        setMembers(parsed);
        setMemberCount(parsed.length);
      } catch (e) {
        console.error('Error loading members:', e);
      }
    }

    // Load API donations
    loadApiDonations();
  }, []);

  // Update stats when donations change
  useEffect(() => {
    calculateStats();
  }, [apiDonations, localDonations]);

  const loadApiDonations = async () => {
    try {
      const response = await donationsApi.getAll();
      if (response && response.data) {
        setApiDonations(response.data);
      }
    } catch (error) {
      console.error('Error loading API donations:', error);
    }
  };

  const calculateStats = () => {
    const allDonations = [...localDonations, ...apiDonations];
    const total = allDonations.reduce((sum, d) => sum + (d.amount || 0), 0);
    setDonationTotal(total);
    setDonationCount(allDonations.length);
  };

  const handleDonationAdded = (donation) => {
    // Update local donations state
    const updatedDonations = [...localDonations, donation];
    setLocalDonations(updatedDonations);
    calculateStats();
  };

  const handleMemberAdded = () => {
    setMemberCount(prev => prev + 1);
    // Reload members
    const savedMembers = localStorage.getItem('bnp_members');
    if (savedMembers) {
      try {
        const parsed = JSON.parse(savedMembers);
        setMembers(parsed);
      } catch (e) {
        console.error('Error loading members:', e);
      }
    }
  };

  const downloadMembersExcel = () => {
    if (members.length === 0) {
      alert('ডাউনলোড করার জন্য সদস্য ডেটা নেই');
      return;
    }

    const dataToExport = members.map(member => ({
      'পূর্ণ নাম': member.fullName || member.name || '',
      'ইমেইল': member.email || '',
      'ফোন': member.phone || '',
      'জেলা': member.district || '',
      'থানা': member.upazila || '',
      'সদস্যপদ প্রকার': member.membershipType || '',
      'যোগদানের তারিখ': member.joinedDate || '',
    }));

    downloadExcel(dataToExport, 'BNP_সদস্য_তালিকা');
  };

  const downloadDonationsExcel = () => {
    const allDonations = [...localDonations, ...apiDonations];
    if (allDonations.length === 0) {
      alert('ডাউনলোড করার জন্য দান ডেটা নেই');
      return;
    }

    const dataToExport = allDonations.map(donation => ({
      'দাতার নাম': donation.donorName || '',
      'ফোন': donation.donorPhone || donation.phone || '',
      'ইমেইল': donation.email || '',
      'দান পরিমাণ (টাকা)': donation.amount || 0,
      'পেমেন্ট পদ্ধতি': donation.paymentMethod || '',
      'লেনদেন আইডি': donation.transactionId || '',
      'দান উদ্দেশ্য': donation.causeName || donation.donationPurpose || '',
      'দান তারিখ': donation.donationDate || donation.date?.split('T')[0] || '',
      'মন্তব্য': donation.donorMessage || donation.notes || '',
    }));

    downloadExcel(dataToExport, 'BNP_দান_তালিকা');
  };

  const getAverageDonation = () => {
    return donationCount > 0 ? (donationTotal / donationCount).toFixed(0) : 0;
  };

  return (
    <div className="backend-container">
      <div className="backend-wrapper">
        {/* Premium Header */}
        <div className="backend-header-premium">
          <div className="header-premium-content">
            <div className="header-title-section">
              <div className="header-icon">⚙️</div>
              <div>
                <h1>ড্যাশবোর্ড</h1>
                <p>সদস্যপদ এবং দান ব্যবস্থাপনা</p>
              </div>
            </div>
            <div className="header-time">
              {new Date().toLocaleTimeString('bn-BD')}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-container">
          <div className="stat-card stat-card-1">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <p className="stat-label">সদস্য</p>
              <h2 className="stat-number">{memberCount}</h2>
              <span className="stat-change">নিবন্ধিত</span>
            </div>
          </div>

          <div className="stat-card stat-card-2">
            <div className="stat-icon">💝</div>
            <div className="stat-content">
              <p className="stat-label">মোট দান</p>
              <h2 className="stat-number">৳{donationTotal.toLocaleString('bn-BD')}</h2>
              <span className="stat-change">{donationCount} লেনদেন</span>
            </div>
          </div>

          <div className="stat-card stat-card-3">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <p className="stat-label">গড় দান</p>
              <h2 className="stat-number">৳{getAverageDonation()}</h2>
              <span className="stat-change">প্রতিটি দানে</span>
            </div>
          </div>

          <div className="stat-card stat-card-4">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <p className="stat-label">আজকের তারিখ</p>
              <h2 className="stat-date">{new Date().toLocaleDateString('bn-BD')}</h2>
              <span className="stat-change">সক্রিয়</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Premium */}
        <div className="backend-nav-premium">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', width: '100%' }}>
            <button
              className={`nav-tab-premium ${activeTab === 'members' ? 'active' : ''}`}
              onClick={() => setActiveTab('members')}
              style={{ flex: 1 }}
            >
              <span className="tab-icon-premium">👥</span>
              <span className="tab-label-premium">সদস্যপদ ব্যবস্থাপনা</span>
              <span className="tab-indicator"></span>
            </button>
            <button
              className={`nav-tab-premium ${activeTab === 'donations' ? 'active' : ''}`}
              onClick={() => setActiveTab('donations')}
              style={{ flex: 1 }}
            >
              <span className="tab-icon-premium">💝</span>
              <span className="tab-label-premium">দান ব্যবস্থাপনা</span>
              <span className="tab-indicator"></span>
            </button>
            {activeTab === 'members' && (
              <button
                onClick={downloadMembersExcel}
                style={{
                  padding: '10px 16px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                }}
                title="সদস্য তালিকা এক্সেল ডাউনলোড করুন"
              >
                📥 এক্সেল ({members.length})
              </button>
            )}
            {activeTab === 'donations' && (
              <button
                onClick={downloadDonationsExcel}
                style={{
                  padding: '10px 16px',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                }}
                title="দান তালিকা এক্সেল ডাউনলোড করুন"
              >
                📥 এক্সেল ({localDonations.length + apiDonations.length})
              </button>
            )}
          </div>
        </div>

        {/* Content Area - Premium */}
        <div className="backend-content-premium">
          {activeTab === 'members' && (
            <div className="tab-content-premium fade-in-premium">
              <MemberForm onMemberAdded={handleMemberAdded} />
            </div>
          )}
          {activeTab === 'donations' && (
            <div className="tab-content-premium fade-in-premium">
              <DonationPayment onDonationAdded={handleDonationAdded} />
            </div>
          )}
        </div>

        {/* Footer - Premium */}
        <div className="backend-footer-premium">
          <p>© 2026 BNP Social Force. সকল অধিকার সংরক্ষিত। | v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Backend;
