import React, { useState, useRef, useEffect } from 'react';
import './MembershipPage.css';
import { membersApi } from '../../utils/api';
import { downloadExcel } from '../../backend/utils/excelExport';

const MembershipPage = () => {
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
  const [apiMembers, setApiMembers] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const ITEMS_PER_PAGE = 10;

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
    
    // Load members from API
    loadMembersFromAPI();
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bnp_members', JSON.stringify(members));
  }, [members]);

  // Load members from API
  const loadMembersFromAPI = async () => {
    try {
      const response = await membersApi.getAll();
      if (response && response.data) {
        const apiData = response.data.map(m => ({
          id: m.id,
          fullName: m.fullName || '',
          email: m.email || '',
          phone: m.phone || '',
          district: m.district || '',
          thana: m.thana || '',
          membershipType: m.membershipType || 'সাধারণ সদস্য',
          dateJoined: new Date(m.dateJoined).toISOString().split('T')[0],
          source: 'API',
        }));
        setApiMembers(apiData);
      }
    } catch (error) {
      console.error('Error loading members from API:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'নাম প্রয়োজন';
    if (!formData.email.trim()) newErrors.email = 'ইমেইল প্রয়োজন';
    if (!formData.phone.trim()) newErrors.phone = 'ফোন নম্বর প্রয়োজন';
    if (formData.phone.length < 11) newErrors.phone = 'সঠিক ফোন নম্বর দিন';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
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
        alert('সদস্য সফলভাবে যুক্ত করা হয়েছে! 🎉');
      }

      // Try to save to API
      try {
        if (!editingId) {
          await membersApi.create(formData);
        }
      } catch (apiError) {
        console.warn('API save failed, but localStorage saved:', apiError);
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
    } catch (error) {
      console.error('Error adding member:', error);
      setErrors({ submit: 'সদস্য যুক্ত করতে ত্রুটি হয়েছে' });
    } finally {
      setLoading(false);
    }
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
    setErrors({});
  };

  const filteredMembers = [...members, ...apiMembers].filter(member => {
    const matchesSearch = 
      member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm);
    
    const matchesFilter = filterType === 'all' || member.membershipType === filterType;
    
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedMembers = filteredMembers.slice(startIndex, endIndex);

  // Reset to page 1 if search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType]);

  return (
    <div className="membership-page">
      {/* Hero Section */}
      <div className="membership-hero">
        <div className="membership-hero-bg" />
        <div className="membership-hero-content">
          <h1 className="membership-title">👥 সদস্যপদ</h1>
          <p className="membership-subtitle">
            আমাদের সাথে যুক্ত হন এবং একটি শক্তিশালী আন্দোলনের অংশ হয়ে উঠুন
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="membership-container">
        {/* Form Section */}
        <form className="membership-form" ref={formRef} onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>{editingId ? '✏️ সদস্য আপডেট করুন' : '➕ নতুন সদস্য যুক্ত করুন'}</h2>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>পূর্ণ নাম *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="আপনার সম্পূর্ণ নাম"
                className={errors.fullName ? 'input-error' : ''}
              />
              {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
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
                placeholder="ইমেইল ঠিকানা"
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>
            <div className="form-group half-width">
              <label>ফোন নম্বর *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="01XXXXXXXXX"
                className={errors.phone ? 'input-error' : ''}
              />
              {errors.phone && <span className="error-msg">{errors.phone}</span>}
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
                placeholder="জেলার নাম"
              />
            </div>
            <div className="form-group half-width">
              <label>থানা</label>
              <input
                type="text"
                name="thana"
                value={formData.thana}
                onChange={handleInputChange}
                placeholder="থানার নাম"
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
                <option>জীবনকাল সদস্য</option>
                <option>প্রতিষ্ঠানী সদস্য</option>
                <option>পৃষ্ঠপোষক সদস্য</option>
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

          {errors.submit && (
            <div className="error-alert">⚠️ {errors.submit}</div>
          )}

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading}
            >
              {loading ? '⏳ যোগ করছে...' : '👥 সদস্যপদ যুক্ত করুন'}
            </button>
            {editingId && (
              <button 
                type="button" 
                className="btn-cancel" 
                onClick={handleClearForm}
              >
                ✕ বাতিল করুন
              </button>
            )}
            <button 
              type="button" 
              className="btn-toggle-table" 
              onClick={() => setShowTable(!showTable)}
            >
              {showTable ? '📋 ফর্ম দেখান' : '📋 সদস্য তালিকা'}
            </button>
            {members.length > 0 && (
              <button 
                type="button" 
                className="btn-download" 
                onClick={handleDownloadExcel}
              >
                📥 এক্সেল ({filteredMembers.length})
              </button>
            )}
          </div>
        </form>

        {/* Table Section */}
        {showTable && (
          <div className="members-table-container">
            <div className="table-header">
              <h3>সদস্যপঞ্জি ({filteredMembers.length})</h3>
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
                  <option value="all">সব ধরনের সদস্য</option>
                  <option value="সাধারণ সদস্য">সাধারণ সদস্য</option>
                  <option value="জীবনকাল সদস্য">জীবনকাল সদস্য</option>
                  <option value="প্রতিষ্ঠানী সদস্য">প্রতিষ্ঠানী সদস্য</option>
                  <option value="পৃষ্ঠপোষক সদস্য">পৃষ্ঠপোষক সদস্য</option>
                </select>
              </div>
            </div>

            {filteredMembers.length > 0 ? (
              <>
                <div className="table-responsive">
                  <table className="members-table">
                    <thead>
                      <tr>
                        <th>ক্রম</th>
                        <th>সদস্যের নাম</th>
                        <th>ফোন</th>
                        <th>ইমেইল</th>
                        <th>জেলা</th>
                        <th>সদস্যপদ</th>
                        <th>অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedMembers.map((member, index) => (
                        <tr key={member.id} className={editingId === member.id ? 'editing' : ''}>
                          <td>{startIndex + index + 1}</td>
                          <td><strong>{member.fullName}</strong></td>
                          <td>{member.phone}</td>
                          <td>{member.email}</td>
                          <td>{member.district}</td>
                          <td><span className="badge-type">{member.membershipType}</span></td>
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

                {totalPages > 1 && (
                  <div className="pagination-container">
                    <button 
                      className="btn-pagination"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      ⬅️ আগে
                    </button>
                    
                    <div className="pagination-info">
                      পৃষ্ঠা {currentPage} of {totalPages}
                    </div>
                    
                    <button 
                      className="btn-pagination"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      পরবর্তী ➡️
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="no-data">কোন সদস্য পাওয়া যায়নি</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipPage;
