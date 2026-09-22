import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

const DashboardPage = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const saved = localStorage.getItem('agrisense_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch { setHistory([]); }
    }
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all analysis history?')) {
      localStorage.removeItem('agrisense_history');
      setHistory([]);
    }
  };

  const totalScans = history.length;
  const diseasesFound = history.filter(h => h.severity !== 'None').length;
  const healthyPlants = history.filter(h => h.severity === 'None').length;
  const avgConfidence = totalScans > 0
    ? Math.round(history.reduce((sum, h) => sum + h.confidence, 0) / totalScans)
    : 0;

  const recentHistory = history.slice(0, 5);

  const getSeverityClass = (severity) => {
    if (!severity) return '';
    const s = severity.toLowerCase();
    if (s === 'none') return 'sev-none';
    if (s === 'low') return 'sev-low';
    if (s === 'moderate') return 'sev-moderate';
    if (s === 'high') return 'sev-high';
    return '';
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dash-header">
        <div className="dash-header-left">
          <div className="dash-logo" onClick={() => navigate('/')}>
            <div className="dash-logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22.17C6.42 20.5 7.14 18.83 8.15 17.42C9.44 18.28 10.9 18.57 12.6 18.57C17.24 18.57 21 14.81 21 10.17V2L17 8Z" fill="white"/>
              </svg>
            </div>
            <span className="dash-title">AgriSense</span>
          </div>
        </div>
        <nav className="dash-nav">
          <button className="dash-nav-btn active" onClick={() => navigate('/dashboard')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Dashboard
          </button>
          <button className="dash-nav-btn" onClick={() => navigate('/detection')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            New Scan
          </button>
          <button className="dash-nav-btn" onClick={() => navigate('/history')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            History
          </button>
        </nav>
        <button className="dash-logout" onClick={() => { localStorage.removeItem('user'); navigate('/'); }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Logout
        </button>
      </header>

      <div className="dash-content">
        {/* Welcome */}
        <div className="dash-welcome">
          <div>
            <h1>Welcome back! 👋</h1>
            <p>Monitor your crop health and track disease detections from your dashboard.</p>
          </div>
          <button className="dash-cta-btn" onClick={() => navigate('/detection')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            Start New Scan
          </button>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon stat-icon-scans">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">{totalScans}</span>
              <span className="stat-label">Total Scans</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-disease">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">{diseasesFound}</span>
              <span className="stat-label">Diseases Found</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-healthy">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">{healthyPlants}</span>
              <span className="stat-label">Healthy Plants</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-accuracy">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">{avgConfidence > 0 ? `${avgConfidence}%` : '—'}</span>
              <span className="stat-label">Avg Confidence</span>
            </div>
          </div>
        </div>

        {/* Quick Actions + Recent */}
        <div className="dash-grid">
          {/* Quick Actions */}
          <div className="dash-card">
            <h3 className="card-title">Quick Actions</h3>
            <div className="quick-actions">
              <button className="action-btn action-scan" onClick={() => navigate('/detection')}>
                <div className="action-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
                <div>
                  <span className="action-title">Scan a Leaf</span>
                  <span className="action-desc">Upload or capture a leaf image for analysis</span>
                </div>
              </button>
              <button className="action-btn action-history" onClick={() => navigate('/history')}>
                <div className="action-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <span className="action-title">View History</span>
                  <span className="action-desc">Review all past scan results</span>
                </div>
              </button>
              <button className="action-btn action-home" onClick={() => navigate('/')}>
                <div className="action-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                </div>
                <div>
                  <span className="action-title">Landing Page</span>
                  <span className="action-desc">Go back to the main website</span>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Analyses */}
          <div className="dash-card">
            <div className="card-header">
              <h3 className="card-title">Recent Analyses</h3>
              <div className="card-header-actions">
                {history.length > 0 && (
                  <>
                    <button className="clear-history-btn" onClick={clearHistory}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                      Clear All
                    </button>
                    <button className="view-all-btn" onClick={() => navigate('/history')}>View All →</button>
                  </>
                )}
              </div>
            </div>
            {recentHistory.length === 0 ? (
              <div className="empty-history">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                </svg>
                <p>No scans yet</p>
                <span>Start by scanning your first leaf!</span>
              </div>
            ) : (
              <div className="history-list">
                {recentHistory.map((item, i) => (
                  <div className="history-item" key={i}>
                    {item.thumbnail && (
                      <img src={item.thumbnail} alt="" className="history-thumb" />
                    )}
                    <div className="history-info">
                      <span className="history-disease">{item.disease}</span>
                      <span className="history-date">{formatDate(item.date)}</span>
                    </div>
                    <div className="history-meta">
                      <span className={`history-severity ${getSeverityClass(item.severity)}`}>
                        {item.severity}
                      </span>
                      <span className="history-confidence">{item.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="tips-section">
          <h3 className="card-title">Crop Care Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <span className="tip-emoji">🌱</span>
              <h4>Early Detection</h4>
              <p>Scan leaves regularly for early disease identification and prevention.</p>
            </div>
            <div className="tip-card">
              <span className="tip-emoji">💧</span>
              <h4>Proper Watering</h4>
              <p>Water at the base of plants to prevent fungal diseases from spreading.</p>
            </div>
            <div className="tip-card">
              <span className="tip-emoji">🔄</span>
              <h4>Crop Rotation</h4>
              <p>Rotate crops yearly to reduce soil-borne disease buildup.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
