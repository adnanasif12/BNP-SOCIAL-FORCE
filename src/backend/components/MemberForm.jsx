import React, { useState, useRef, useEffect } from 'react';
import '../styles/MemberForm.css';
import { downloadExcel } from '../utils/excelExport';

const MemberForm = ({ onMemberAdded }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    district: '',
    thana: '',
    membershipType: 'সাধারণ সদস্য',
    dateJoined: new Date().toISOString().split('T')[0],
  });

  const [members, setMembers] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const formRef = useRef(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedMembers = localStorage.getItem('bnp_members');
    if (savedMembers) {
      try {
        setMembers(JSON.parse(savedMembers));
      } catch (e) {
        console.error('Error loading members:', e);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bnp_members', JSON.stringify(members));
  }, [members]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('অনুগ্রহ করে সকল বাধ্যতামূলক ক্ষেত্র পূরণ করুন');
      return;
    }

    if (editingId) {
      // Update existing member
      setMembers(members.map(m => 
        m.id === editingId ? { ...formData, id: editingId } : m
      ));
      setEditingId(null);
      alert('সদস্য আপডেট হয়েছে!');
    } else {
      // Add new member
      const newMember = {
        ...formData,
        id: Date.now(),
      };
      setMembers([...members, newMember]);
      if (onMemberAdded) onMemberAdded(newMember);
      alert('সদস্য সফলভাবে যুক্ত করা হয়েছে!');
    }
    
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      district: '',
      thana: '',
      membershipType: 'সাধারণ সদস্য',
      dateJoined: new Date().toISOString().split('T')[0],
    });
  };

  const handleDownloadExcel = () => {
    if (filteredMembers.length === 0) {
      alert('ডাউনলোড করার জন্য কমপক্ষে একটি সদস্য যুক্ত করুন');
      return;
    }

    const dataToExport = filteredMembers.map(member => ({
      'পূর্ণ নাম': member.fullName,
      'ইমেইল': member.email,
      'ফোন': member.phone,
      'জেলা': member.district,
      'থানা': member.thana,
      'সদস্যপদ প্রকার': member.membershipType,
      'যোগদানের তারিখ': member.dateJoined,
    }));

    downloadExcel(dataToExport, 'BNP_সদস্যপঞ্জি');
  };

  const handleDeleteMember = (id) => {
    if (confirm('এই সদস্যটি মুছে ফেলতে নিশ্চিত?')) {
      setMembers(members.filter(m => m.id !== id));
      alert('সদস্য মুছে ফেলা হয়েছে');
    }
  };

  const handleEditMember = (member) => {
    setFormData(member);
    setEditingId(member.id);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClearForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      district: '',
      thana: '',
      membershipType: 'সাধারণ সদস্য',
      dateJoined: new Date().toISOString().split('T')[0],
    });
    setEditingId(null);
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm);
    
    const matchesFilter = filterType === 'all' || member.membershipType === filterType;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="member-form-container">
      <div className="member-form-header">
        <div>
          <h2>👥 সদস্যপদ ব্যবস্থাপনা</h2>
          <p>নতুন সদস্য যুক্ত করুন এবং তথ্য পরিচালনা করুন</p>
        </div>
        <div className="member-stats">
          <div className="stat-badge">মোট: {members.length}</div>
        </div>
      </div>

      <form className="member-form" ref={formRef} onSubmit={handleSubmit}>
        <div className="form-title">{editingId ? '✏️ সদস্য আপডেট করুন' : '➕ নতুন সদস্য যোগ করুন'}</div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>পূর্ণ নাম *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="আপনার সম্পূর্ণ নাম"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label>ইমেইল *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="আপনার ইমেইল"
              required
            />
          </div>
          <div className="form-group half-width">
            <label>ফোন নম্বর *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+880 সহ"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label>জেলা</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              placeholder="আপনার জেলা"
            />
          </div>
          <div className="form-group half-width">
            <label>থানা</label>
            <input
              type="text"
              name="thana"
              value={formData.thana}
              onChange={handleInputChange}
              placeholder="আপনার থানা"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label>সদস্যপদ প্রকার</label>
            <select
              name="membershipType"
              value={formData.membershipType}
              onChange={handleInputChange}
            >
              <option>সাধারণ সদস্য</option>
              <option>প্রাণী সদস্য</option>
              <option>বার্ষিক সদস্য</option>
              <option>আজীবন সদস্য</option>
            </select>
          </div>
          <div className="form-group half-width">
            <label>যোগদানের তারিখ</label>
            <input
              type="date"
              name="dateJoined"
              value={formData.dateJoined}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {editingId ? '✏️ আপডেট করুন' : '➕ সদস্য যুক্ত করুন'}
          </button>
          {editingId && (
            <button type="button" className="btn-cancel" onClick={handleClearForm}>
              ✕ বাতিল করুন
            </button>
          )}
          <button type="button" className="btn-toggle-table" onClick={() => setShowTable(!showTable)}>
            {showTable ? '📋 ফর্ম লুকান' : '📋 সদস্য তালিকা'}
          </button>
          {members.length > 0 && (
            <button type="button" className="btn-download" onClick={handleDownloadExcel}>
              📥 এক্সেল ({filteredMembers.length})
            </button>
          )}
        </div>
      </form>

      {showTable && (
        <div className="members-table-container">
          <div className="table-header">
            <h3>সদস্য তালিকা ({filteredMembers.length})</h3>
            <div className="table-controls">
              <input
                type="text"
                className="search-input"
                placeholder="🔍 খোঁজ করুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select 
                className="filter-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">সব ধরনের</option>
                <option value="সাধারণ সদস্য">সাধারণ সদস্য</option>
                <option value="প্রাণী সদস্য">প্রাণী সদস্য</option>
                <option value="বার্ষিক সদস্য">বার্ষিক সদস্য</option>
                <option value="আজীবন সদস্য">আজীবন সদস্য</option>
              </select>
            </div>
          </div>

          {filteredMembers.length > 0 ? (
            <div className="table-responsive">
              <table className="members-table">
                <thead>
                  <tr>
                    <th>ক্রম</th>
                    <th>পূর্ণ নাম</th>
                    <th>ইমেইল</th>
                    <th>ফোন</th>
                    <th>সদস্যপদ</th>
                    <th>তারিখ</th>
                    <th>অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member, index) => (
                    <tr key={member.id} className={editingId === member.id ? 'editing' : ''}>
                      <td>{index + 1}</td>
                      <td><strong>{member.fullName}</strong></td>
                      <td className="email-cell">{member.email}</td>
                      <td>{member.phone}</td>
                      <td><span className="badge">{member.membershipType}</span></td>
                      <td>{member.dateJoined}</td>
                      <td className="action-cell">
                        <button 
                          className="btn-edit"
                          onClick={() => handleEditMember(member)}
                          title="সম্পাদন করুন"
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn-delete"
                          onClick={() => handleDeleteMember(member.id)}
                          title="মুছে ফেলুন"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-data">কোন সদস্য পাওয়া যায়নি</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MemberForm;
