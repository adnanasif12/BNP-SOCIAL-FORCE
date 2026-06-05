import React, { useState } from "react";
import "./Donation.css";
import { donationsApi } from "../../utils/api";

const donationAmounts = [100, 250, 500, 1000, 2500, 5000];

const causes = [
  {
    id: 1,
    icon: "📚",
    title: "শিক্ষা সহায়তা",
    description: "সুবিধাবঞ্চিত শিশুদের শিক্ষার সুযোগ নিশ্চিত করতে সাহায্য করুন।",
    raised: 125000,
    goal: 200000,
    donors: 342,
    color: "#6366f1",
  },
  {
    id: 2,
    icon: "🏥",
    title: "স্বাস্থ্য সেবা",
    description: "দরিদ্র পরিবারগুলোকে বিনামূল্যে চিকিৎসা সেবা দিতে পাশে থাকুন।",
    raised: 89000,
    goal: 150000,
    donors: 215,
    color: "#ec4899",
  },
  {
    id: 3,
    icon: "🌱",
    title: "পরিবেশ রক্ষা",
    description: "গাছ লাগানো ও পরিবেশ সংরক্ষণে আমাদের উদ্যোগে অংশ নিন।",
    raised: 45000,
    goal: 100000,
    donors: 98,
    color: "#10b981",
  },
];

const paymentMethods = [
  { id: "bkash", label: "bKash", icon: "🔴", color: "#e2136e" },
  { id: "nagad", label: "Nagad", icon: "🟠", color: "#f7941d" },
  { id: "rocket", label: "Rocket", icon: "🟣", color: "#8b2be2" },
  { id: "card", label: "ক্রেডিট কার্ড", icon: "💳", color: "#6366f1" },
];

const formatBDT = (amount) =>
  "৳ " + amount.toLocaleString("bn-BD").replace(/,/g, ",");

const ProgressBar = ({ raised, goal, color }) => {
  const pct = Math.min((raised / goal) * 100, 100).toFixed(0);
  return (
    <div className="progress-wrap">
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="progress-pct">{pct}%</span>
    </div>
  );
};

const DonationPage = () => {
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedCause, setSelectedCause] = useState(causes[0]);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);
  const [step, setStep] = useState(1); // 1: choose, 2: payment, 3: success
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorMessage, setDonorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const finalAmount = customAmount ? parseInt(customAmount) || 0 : selectedAmount;

  const validate = () => {
    const newErrors = {};
    if (!donorName.trim()) newErrors.name = "নাম দিন";
    if (!donorPhone.trim() || donorPhone.length < 11)
      newErrors.phone = "সঠিক ফোন নম্বর দিন";
    if (finalAmount < 10) newErrors.amount = "কমপক্ষে ৳১০ দান করুন";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDonate = async () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (validate()) {
        // Save donation to backend
        setLoading(true);
        try {
          const txnId = `TXN${Math.floor(Math.random() * 9000000 + 1000000)}`;
          const donationData = {
            donorName,
            donorPhone,
            donorMessage,
            amount: finalAmount,
            causeId: selectedCause.id,
            causeName: selectedCause.title,
            paymentMethod: selectedPayment.label,
            transactionId: txnId,
            date: new Date().toISOString(),
            status: "নিশ্চিত",
          };

          // Call API
          const response = await donationsApi.create(donationData);
          console.log("✅ Donation saved:", response);
          
          setTransactionId(txnId);
          setStep(3);
        } catch (error) {
          console.error("❌ Error saving donation:", error);
          setErrors({ submit: "দান সেভ করতে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।" });
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedAmount(500);
    setCustomAmount("");
    setDonorName("");
    setDonorPhone("");
    setDonorMessage("");
    setErrors({});
    setSelectedCause(causes[0]);
    setSelectedPayment(paymentMethods[0]);
  };

  return (
    <div className="donation-page">
      {/* Hero */}
      <div className="donation-hero">
        <div className="donation-hero-bg" />
        <div className="donation-hero-content">
          <div className="donation-badge">❤️ দান করুন</div>
          <h1 className="donation-hero-title">
            আপনার একটি দান <br />
            <span className="donation-highlight">বদলে দিতে পারে একটি জীবন</span>
          </h1>
          <p className="donation-hero-sub">
            আপনার সাহায্যেই আমরা এগিয়ে যেতে পারি। ছোট একটি অবদান রাখুন,
            বড় পরিবর্তন আনুন।
          </p>
        </div>
      </div>

      {/* Causes Section */}
      <div className="causes-section">
        <div className="causes-header">
          <h2 className="causes-title">আমাদের কার্যক্রম</h2>
          <p className="causes-sub">আপনি যে খাতে সাহায্য করতে চান তা বেছে নিন</p>
        </div>
        <div className="causes-grid">
          {causes.map((cause) => (
            <div
              key={cause.id}
              className={`cause-card ${selectedCause.id === cause.id ? "selected" : ""}`}
              onClick={() => setSelectedCause(cause)}
              style={{
                "--cause-color": cause.color,
              }}
            >
              <div className="cause-icon">{cause.icon}</div>
              <div className="cause-check">
                {selectedCause.id === cause.id && (
                  <span className="check-mark">✓</span>
                )}
              </div>
              <h3 className="cause-title">{cause.title}</h3>
              <p className="cause-desc">{cause.description}</p>

              <ProgressBar
                raised={cause.raised}
                goal={cause.goal}
                color={cause.color}
              />

              <div className="cause-meta">
                <div className="cause-meta-item">
                  <span className="meta-val">{formatBDT(cause.raised)}</span>
                  <span className="meta-key">সংগ্রহ</span>
                </div>
                <div className="cause-meta-item">
                  <span className="meta-val">{cause.donors}+</span>
                  <span className="meta-key">দাতা</span>
                </div>
                <div className="cause-meta-item">
                  <span className="meta-val">{formatBDT(cause.goal)}</span>
                  <span className="meta-key">লক্ষ্যমাত্রা</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Donation Form */}
      <div className="donation-form-section">
        <div className="donation-form-container">
          {/* Step Indicator */}
          {step < 3 && (
            <div className="step-indicator">
              <div className={`step-dot ${step >= 1 ? "active" : ""}`}>১</div>
              <div className={`step-line ${step >= 2 ? "active" : ""}`} />
              <div className={`step-dot ${step >= 2 ? "active" : ""}`}>২</div>
              <div className={`step-line`} />
              <div className={`step-dot ${step >= 3 ? "active" : ""}`}>৩</div>
            </div>
          )}

          {/* Step 1: Choose Amount */}
          {step === 1 && (
            <div className="form-step">
              <h2 className="form-title">দানের পরিমাণ বেছে নিন</h2>
              <p className="form-sub">
                <span className="selected-cause-tag">
                  {selectedCause.icon} {selectedCause.title}
                </span>
              </p>

              <div className="amount-grid">
                {donationAmounts.map((amt) => (
                  <button
                    key={amt}
                    className={`amount-btn ${!customAmount && selectedAmount === amt ? "active" : ""}`}
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount("");
                    }}
                  >
                    ৳{amt.toLocaleString()}
                  </button>
                ))}
              </div>

              <div className="custom-amount-wrap">
                <label className="custom-label">অথবা নিজে লিখুন</label>
                <div className="custom-input-wrap">
                  <span className="currency-symbol">৳</span>
                  <input
                    type="number"
                    className="custom-input"
                    placeholder="যেকোনো পরিমাণ"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    min="10"
                  />
                </div>
                {errors.amount && (
                  <span className="error-msg">{errors.amount}</span>
                )}
              </div>

              <div className="amount-summary">
                <div className="summary-row">
                  <span>নির্বাচিত কার্যক্রম</span>
                  <strong>{selectedCause.icon} {selectedCause.title}</strong>
                </div>
                <div className="summary-row">
                  <span>দানের পরিমাণ</span>
                  <strong className="summary-amount">
                    ৳{finalAmount.toLocaleString()}
                  </strong>
                </div>
              </div>

              <button className="donate-btn" onClick={handleDonate}>
                পরবর্তী ধাপ →
              </button>
            </div>
          )}

          {/* Step 2: Payment Info */}
          {step === 2 && (
            <div className="form-step">
              <h2 className="form-title">আপনার তথ্য দিন</h2>

              <div className="payment-methods">
                {paymentMethods.map((pm) => (
                  <button
                    key={pm.id}
                    className={`payment-btn ${selectedPayment.id === pm.id ? "active" : ""}`}
                    onClick={() => setSelectedPayment(pm)}
                    style={{ "--pm-color": pm.color }}
                  >
                    <span>{pm.icon}</span>
                    <span>{pm.label}</span>
                  </button>
                ))}
              </div>

              <div className="input-group">
                <label className="input-label">আপনার নাম *</label>
                <input
                  type="text"
                  className={`form-input ${errors.name ? "has-error" : ""}`}
                  placeholder="পূর্ণ নাম লিখুন"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                />
                {errors.name && (
                  <span className="error-msg">{errors.name}</span>
                )}
              </div>

              <div className="input-group">
                <label className="input-label">মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  className={`form-input ${errors.phone ? "has-error" : ""}`}
                  placeholder="01XXXXXXXXX"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                />
                {errors.phone && (
                  <span className="error-msg">{errors.phone}</span>
                )}
              </div>

              <div className="input-group">
                <label className="input-label">বার্তা (ঐচ্ছিক)</label>
                <textarea
                  className="form-input form-textarea"
                  placeholder="আপনার অনুভূতি শেয়ার করুন..."
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="payment-summary">
                <div className="summary-row">
                  <span>পেমেন্ট পদ্ধতি</span>
                  <strong>
                    {selectedPayment.icon} {selectedPayment.label}
                  </strong>
                </div>
                <div className="summary-row">
                  <span>কার্যক্রম</span>
                  <strong>{selectedCause.title}</strong>
                </div>
                <div className="summary-row total">
                  <span>মোট পরিমাণ</span>
                  <strong className="summary-amount">
                    ৳{finalAmount.toLocaleString()}
                  </strong>
                </div>
              </div>

              <div className="form-btns">
                <button 
                  className="back-btn" 
                  onClick={() => setStep(1)}
                  disabled={loading}
                >
                  ← পিছনে
                </button>
                <button 
                  className="donate-btn" 
                  onClick={handleDonate}
                  disabled={loading}
                >
                  {loading ? "⏳ সংরক্ষণ করছে..." : "❤️ দান নিশ্চিত করুন"}
                </button>
              </div>
              {errors.submit && (
                <div className="error-alert">
                  <span>⚠️ {errors.submit}</span>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="success-step">
              <div className="success-animation">
                <div className="success-circle">
                  <span className="success-check">✓</span>
                </div>
                <div className="success-rings">
                  <div className="ring ring-1" />
                  <div className="ring ring-2" />
                  <div className="ring ring-3" />
                </div>
              </div>
              <h2 className="success-title">আন্তরিক ধন্যবাদ! 🎉</h2>
              <p className="success-name">প্রিয় {donorName},</p>
              <p className="success-msg">
                আপনার{" "}
                <strong className="success-amount">
                  ৳{finalAmount.toLocaleString()}
                </strong>{" "}
                দানের মাধ্যমে <strong>{selectedCause.title}</strong> কার্যক্রমে
                গুরুত্বপূর্ণ অবদান রাখলেন। আল্লাহ আপনাকে উত্তম প্রতিদান দিন।
              </p>
              <div className="success-detail">
                <div className="detail-row">
                  <span>ট্রানজেকশন ID</span>
                  <span>#{transactionId}</span>
                </div>
                <div className="detail-row">
                  <span>পেমেন্ট</span>
                  <span>
                    {selectedPayment.icon} {selectedPayment.label}
                  </span>
                </div>
                <div className="detail-row">
                  <span>তারিখ</span>
                  <span>{new Date().toLocaleDateString("bn-BD")}</span>
                </div>
              </div>
              <button className="donate-again-btn" onClick={handleReset}>
                আবার দান করুন ↺
              </button>
            </div>
          )}
        </div>

        {/* Trust Badges */}
        <div className="trust-section">
          <div className="trust-grid">
            <div className="trust-item">
              <span className="trust-icon">🔒</span>
              <span>নিরাপদ পেমেন্ট</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">📋</span>
              <span>স্বচ্ছ হিসাব</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✅</span>
              <span>যাচাইকৃত সংস্থা</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">💯</span>
              <span>১০০% দান পৌঁছায়</span>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="impact-section">
        <h2 className="impact-title">আপনার দানের প্রভাব</h2>
        <div className="impact-grid">
          <div className="impact-card">
            <div className="impact-emoji">🏫</div>
            <h3>৳৫০০</h3>
            <p>একজন শিশুর এক মাসের পড়াশোনার খরচ</p>
          </div>
          <div className="impact-card">
            <div className="impact-emoji">💊</div>
            <h3>৳১,০০০</h3>
            <p>একটি পরিবারের স্বাস্থ্য সেবার ব্যয়</p>
          </div>
          <div className="impact-card">
            <div className="impact-emoji">🌳</div>
            <h3>৳২,৫০০</h3>
            <p>১০টি গাছ লাগানো ও পরিচর্যার খরচ</p>
          </div>
          <div className="impact-card">
            <div className="impact-emoji">🏡</div>
            <h3>৳৫,০০০</h3>
            <p>একটি পরিবারের এক মাসের খাদ্য সহায়তা</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
