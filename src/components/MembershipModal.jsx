import React, { useState, useEffect } from 'react';
import './MembershipModal.css';
import { membersApi } from '../utils/api';

const MembershipModal = ({ isOpen, onClose, onMemberAdded }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    district: '',
    thana: '',
    membershipType: 'সাধারণ সদস্য',
    dateJoined: new Date().toISOString().split('T')[0],
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field
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
      // Save to localStorage
      const savedMembers = JSON.parse(localStorage.getItem('bnp_members') || '[]');
      const newMember = {
        ...formData,
        id: Date.now(),
      };
      savedMembers.push(newMember);
      localStorage.setItem('bnp_members', JSON.stringify(savedMembers));

      // Try to save to API
      try {
        await membersApi.create(formData);
      } catch (apiError) {
        console.warn('API save failed, but localStorage saved:', apiError);
      }

      if (onMemberAdded) onMemberAdded(newMember);
      alert('সদস্যপদ সফলভাবে যুক্ত করা হয়েছে! 🎉');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        district: '',
        thana: '',
        membershipType: 'সাধারণ সদস্য',
        dateJoined: new Date().toISOString().split('T')[0],
      });
      onClose();
    } catch (error) {
      console.error('Error adding member:', error);
      setErrors({ submit: 'সদস্য যুক্ত করতে ত্রুটি হয়েছে' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="membership-modal-overlay" onClick={onClose}>
      <div className="membership-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>👥 সদস্যপদ ফর্ম</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form className="membership-form" onSubmit={handleSubmit}>
          <div className="form-group">
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

          <div className="form-group">
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

          <div className="form-group">
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

          <div className="form-row">
            <div className="form-group">
              <label>জেলা</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                placeholder="জেলার নাম"
              />
            </div>

            <div className="form-group">
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
            <div className="form-group">
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

            <div className="form-group">
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
              type="button" 
              className="btn-cancel" 
              onClick={onClose}
              disabled={loading}
            >
              বাতিল করুন
            </button>
            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading}
            >
              {loading ? '⏳ যোগ করছে...' : '👥 সদস্যপদ যুক্ত করুন'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MembershipModal;
