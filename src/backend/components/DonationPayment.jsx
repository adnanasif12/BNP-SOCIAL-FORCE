import React, { useState, useRef, useEffect } from 'react';
import '../styles/DonationPayment.css';
import { downloadExcel } from '../utils/excelExport';
import { donationsApi } from '../../utils/api';

const DonationPayment = ({ onDonationAdded }) => {
  const [formData, setFormData] = useState({
    donorName: '',
    email: '',
    phone: '',
    amount: '',
    paymentMethod: 'bKash',
    transactionId: '',
    donationPurpose: 'সাধারণ দাতব্য',
    donationDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const [donations, setDonations] = useState([]);
  const [apiDonations, setApiDonations] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [filterMethod, setFilterMethod] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const formRef = useRef(null);
  const ITEMS_PER_PAGE = 10;

  // Load data from localStorage on mount
  useEffect(() => {
    const savedDonations = localStorage.getItem('bnp_donations');
    if (savedDonations) {
      try {
        setDonations(JSON.parse(savedDonations));
      } catch (e) {
        console.error('Error loading donations:', e);
      }
    }
    
    // Load donations from API
    loadDonationsFromAPI();
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bnp_donations', JSON.stringify(donations));
  }, [donations]);

  // Load donations from API
  const loadDonationsFromAPI = async () => {
    try {
      const response = await donationsApi.getAll();
      if (response && response.data) {
        const apiData = response.data.map(d => ({
          id: d.id,
          donorName: d.donorName || '',
          email: d.email || '',
          phone: d.donorPhone || '',
          amount: d.amount || 0,
          paymentMethod: d.paymentMethod || 'অজানা',
          transactionId: d.transactionId || '',
          donationPurpose: d.causeName || 'সাধারণ দাতব্য',
          donationDate: new Date(d.date).toISOString().split('T')[0],
          notes: d.donorMessage || '',
          source: 'API',
        }));
        setApiDonations(apiData);
      }
    } catch (error) {
      console.error('Error loading donations from API:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.donorName || !formData.email || !formData.phone || !formData.amount) {
      alert('অনুগ্রহ করে সকল বাধ্যতামূলক ক্ষেত্র পূরণ করুন');
      return;
    }

    if (editingId) {
      // Update existing donation
      setDonations(donations.map(d => 
        d.id === editingId 
          ? { ...formData, id: editingId, amount: parseFloat(formData.amount) } 
          : d
      ));
      setEditingId(null);
      alert('দান রেকর্ড আপডেট হয়েছে!');
    } else {
      // Add new donation
      const newDonation = {
        ...formData,
        id: Date.now(),
        amount: parseFloat(formData.amount),
      };
      setDonations([...donations, newDonation]);
      if (onDonationAdded) onDonationAdded(newDonation);
      alert('দান সফলভাবে রেকর্ড করা হয়েছে!');
    }
    
    setFormData({
      donorName: '',
      email: '',
      phone: '',
      amount: '',
      paymentMethod: 'bKash',
      transactionId: '',
      donationPurpose: 'সাধারণ দাতব্য',
      donationDate: new Date().toISOString().split('T')[0],
      notes: '',
    });
  };

  const handleDownloadExcel = () => {
    if (sortedDonations.length === 0) {
      alert('ডাউনলোড করার জন্য কমপক্ষে একটি দান রেকর্ড করুন');
      return;
    }

    const dataToExport = sortedDonations.map(donation => ({
      'দাতার নাম': donation.donorName,
      'ইমেইল': donation.email,
      'ফোন': donation.phone,
      'দান পরিমাণ (টাকা)': donation.amount,
      'পেমেন্ট পদ্ধতি': donation.paymentMethod,
      'লেনদেন আইডি': donation.transactionId,
      'দান উদ্দেশ্য': donation.donationPurpose,
      'দান তারিখ': donation.donationDate,
      'মন্তব্য': donation.notes,
    }));

    downloadExcel(dataToExport, 'BNP_দান_রেকর্ড');
  };

  const handleDeleteDonation = (id) => {
    if (confirm('এই দান রেকর্ডটি মুছে ফেলতে নিশ্চিত?')) {
      setDonations(donations.filter(d => d.id !== id));
      alert('দান রেকর্ড মুছে ফেলা হয়েছে');
    }
  };

  const handleEditDonation = (donation) => {
    setFormData({ ...donation, amount: donation.amount.toString() });
    setEditingId(donation.id);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClearForm = () => {
    setFormData({
      donorName: '',
      email: '',
      phone: '',
      amount: '',
      paymentMethod: 'bKash',
      transactionId: '',
      donationPurpose: 'সাধারণ দাতব্য',
      donationDate: new Date().toISOString().split('T')[0],
      notes: '',
    });
    setEditingId(null);
  };

  const filteredDonations = [...donations, ...apiDonations].filter(donation => {
    const matchesSearch = 
      donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.phone.includes(searchTerm) ||
      donation.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterMethod === 'all' || donation.paymentMethod === filterMethod;
    
    return matchesSearch && matchesFilter;
  });

  // Sort by date descending (most recent first)
  const sortedDonations = [...filteredDonations].sort((a, b) => {
    const dateA = new Date(a.donationDate || a.date || 0);
    const dateB = new Date(b.donationDate || b.date || 0);
    return dateB - dateA;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedDonations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedDonations = sortedDonations.slice(startIndex, endIndex);

  // Reset to page 1 if search/filter changes and current page is out of range
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterMethod]);

  const totalDonations = sortedDonations.reduce((sum, d) => sum + d.amount, 0);
  const averageDonation = sortedDonations.length > 0 ? (totalDonations / sortedDonations.length).toFixed(2) : 0;

  return (
    <div className="donation-payment-container">
      <div className="donation-header">
        <div>
          <h2>💝 দান পেমেন্ট সিস্টেম</h2>
          <p>দান রেকর্ড করুন এবং পেমেন্ট ট্র্যাক করুন</p>
        </div>
        <div className="donation-stats-compact">
          <div className="stat-mini">
            <span className="label">মোট:</span>
            <span className="value">৳{totalDonations.toLocaleString('bn-BD')}</span>
          </div>
          <div className="stat-mini">
            <span className="label">সংখ্যা:</span>
            <span className="value">{sortedDonations.length}</span>
          </div>
        </div>
      </div>

      {(donations.length > 0 || apiDonations.length > 0) && (
        <div className="donation-stats">
          <div className="stat-card">
            <h4>মোট দান</h4>
            <p className="stat-value">৳{sortedDonations.reduce((sum, d) => sum + d.amount, 0).toLocaleString('bn-BD')}</p>
          </div>
          <div className="stat-card">
            <h4>দান সংখ্যা</h4>
            <p className="stat-value">{sortedDonations.length}</p>
          </div>
          <div className="stat-card">
            <h4>গড় দান</h4>
            <p className="stat-value">৳{sortedDonations.length > 0 ? (sortedDonations.reduce((sum, d) => sum + d.amount, 0) / sortedDonations.length).toFixed(0) : 0}</p>
          </div>
        </div>
      )}

      <form className="donation-form" ref={formRef} onSubmit={handleSubmit}>
        <div className="form-title">{editingId ? '✏️ দান আপডেট করুন' : '➕ নতুন দান যোগ করুন'}</div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>দাতার নাম *</label>
            <input
              type="text"
              name="donorName"
              value={formData.donorName}
              onChange={handleInputChange}
              placeholder="দাতার সম্পূর্ণ নাম"
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
              placeholder="ইমেইল ঠিকানা"
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
              placeholder="ফোন নম্বর"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label>দান পরিমাণ (টাকা) *</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="পরিমাণ"
              min="0"
              step="1"
              required
            />
          </div>
          <div className="form-group half-width">
            <label>পেমেন্ট পদ্ধতি</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
            >
              <option>bKash</option>
              <option>Nagad</option>
              <option>Rocket</option>
              <option>Bank Transfer</option>
              <option>হাতে নগদ</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>লেনদেন আইডি</label>
            <input
              type="text"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleInputChange}
              placeholder="bKash/Nagad/Bank Transaction ID"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label>দান উদ্দেশ্য</label>
            <select
              name="donationPurpose"
              value={formData.donationPurpose}
              onChange={handleInputChange}
            >
              <option>সাধারণ দাতব্য</option>
              <option>শিক্ষা প্রকল্প</option>
              <option>স্বাস্থ্য সেবা</option>
              <option>দুর্যোগ ত্রাণ</option>
              <option>সামাজিক কর্মসূচি</option>
              <option>অন্যান্য</option>
            </select>
          </div>
          <div className="form-group half-width">
            <label>দান তারিখ</label>
            <input
              type="date"
              name="donationDate"
              value={formData.donationDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>মন্তব্য</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="অতিরিক্ত তথ্য বা মন্তব্য (ঐচ্ছিক)"
              rows="2"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {editingId ? '✏️ আপডেট করুন' : '➕ দান রেকর্ড করুন'}
          </button>
          {editingId && (
            <button type="button" className="btn-cancel" onClick={handleClearForm}>
              ✕ বাতিল করুন
            </button>
          )}
          <button type="button" className="btn-toggle-table" onClick={() => setShowTable(!showTable)}>
            {showTable ? '📋 ফর্ম লুকান' : '📋 দান তালিকা'}
          </button>
          <button type="button" className="btn-refresh" onClick={loadDonationsFromAPI} title="API থেকে রিফ্রেশ করুন">
            🔄 রিফ্রেশ
          </button>
          {donations.length > 0 && (
            <button type="button" className="btn-download" onClick={handleDownloadExcel}>
              📥 এক্সেল ({sortedDonations.length})
            </button>
          )}
        </div>
      </form>

      {showTable && (
        <div className="donations-table-container">
          <div className="table-header">
            <h3>দান রেকর্ড ({sortedDonations.length})</h3>
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
                value={filterMethod}
                onChange={(e) => setFilterMethod(e.target.value)}
              >
                <option value="all">সব পদ্ধতি</option>
                <option value="bKash">bKash</option>
                <option value="Nagad">Nagad</option>
                <option value="Rocket">Rocket</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="হাতে নগদ">হাতে নগদ</option>
              </select>
            </div>
          </div>

          {sortedDonations.length > 0 ? (
            <>
              <div className="table-responsive">
                <table className="donations-table">
                  <thead>
                    <tr>
                      <th>ক্রম</th>
                      <th>দাতার নাম</th>
                      <th>পরিমাণ</th>
                      <th>পেমেন্ট</th>
                      <th>উদ্দেশ্য</th>
                      <th>তারিখ</th>
                      <th>অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedDonations.map((donation, index) => (
                      <tr key={donation.id} className={editingId === donation.id ? 'editing' : ''}>
                        <td>{startIndex + index + 1}</td>
                        <td><strong>{donation.donorName}</strong></td>
                        <td className="amount">৳{donation.amount.toLocaleString('bn-BD')}</td>
                        <td><span className="badge-payment">{donation.paymentMethod}</span></td>
                        <td className="purpose">{donation.donationPurpose}</td>
                        <td>{donation.donationDate}</td>
                        <td className="action-cell">
                          <button 
                            className="btn-edit"
                            onClick={() => handleEditDonation(donation)}
                            title="সম্পাদন করুন"
                          >
                            ✏️
                          </button>
                          <button 
                            className="btn-delete"
                            onClick={() => handleDeleteDonation(donation.id)}
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

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="pagination-container">
                  <button 
                    className="btn-pagination"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    title="আগের পৃষ্ঠা"
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
                    title="পরবর্তী পৃষ্ঠা"
                  >
                    পরবর্তী ➡️
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="no-data">কোন দান রেকর্ড পাওয়া যায়নি</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DonationPayment;
