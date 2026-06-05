import React, { useState } from 'react';
import '../styles/AdminPanel.css';
import Backend from './Backend';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const [error, setError] = useState('');

  // সহজ পাসওয়ার্ড - পরবর্তীতে সার্ভার সাইড থেকে আসবে
  const ADMIN_PASSWORD = 'admin123';

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
      setShowPanel(true);
    } else {
      setError('পাসওয়ার্ড ভুল!');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowPanel(false);
    setPassword('');
    setError('');
  };

  return (
    <>
      {/* Admin Button */}
      {!showPanel && (
        <button 
          className="admin-trigger-btn" 
          onClick={() => setShowPanel(true)}
          title="Admin Panel"
        >
          ⚙️
        </button>
      )}

      {/* Admin Panel Modal */}
      {showPanel && (
        <div className="admin-panel-overlay" onClick={() => !isAuthenticated && setShowPanel(false)}>
          <div className="admin-panel-container" onClick={(e) => e.stopPropagation()}>
            {!isAuthenticated ? (
              <div className="admin-login">
                <div className="login-header">
                  <h2>Admin Panel লগইন</h2>
                  <button className="close-btn" onClick={() => setShowPanel(false)}>✕</button>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                  <div className="form-group">
                    <label>পাসওয়ার্ড:</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="পাসওয়ার্ড লিখুন"
                      autoFocus
                    />
                  </div>

                  {error && <div className="error-message">{error}</div>}

                  <button type="submit" className="login-btn">লগইন করুন</button>
                </form>
              </div>
            ) : (
              <div className="admin-panel-content">
                <div className="panel-header">
                  <h2>📊 Admin Dashboard</h2>
                  <button className="logout-btn" onClick={handleLogout}>লগআউট</button>
                </div>
                <div className="panel-body">
                  <Backend />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
