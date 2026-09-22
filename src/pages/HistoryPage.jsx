import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoryPage.css';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('agrisense_history');
    if (saved) {
      try { setHistory(JSON.parse(saved)); }
      catch { setHistory([]); }
    }
  }, []);

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      localStorage.removeItem('agrisense_history');
      setHistory([]);
    }
  };

  const deleteItem = (index) => {
    const updated = history.filter((_, i) => i !== index);
    setHistory(updated);
    localStorage.setItem('agrisense_history', JSON.stringify(updated));
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const getSeverityClass = (severity) => {
    if (!severity) return '';
    const s = severity.toLowerCase();
    if (s === 'none') return 'hsev-none';
    if (s === 'low') return 'hsev-low';
    if (s === 'moderate') return 'hsev-moderate';
    if (s === 'high') return 'hsev-high';
    return '';
  };

  return (
    <div className="history-page">
      {/* Header */}
      <header className="hist-header">
        <div className="hist-header-left">
          <button className="hist-back-btn" onClick={() => navigate('/dashboard')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div className="hist-logo">
            <div className="hist-logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22.17C6.42 20.5 7.14 18.83 8.15 17.42C9.44 18.28 10.9 18.57 12.6 18.57C17.24 18.57 21 14.81 21 10.17V2L17 8Z" fill="white"/>
              </svg>
            </div>
            <span className="hist-title">Analysis History</span>
          </div>
        </div>
        <div className="hist-header-right">
          <button className="hist-clear-btn" style={{marginRight: '15px'}} onClick={() => navigate('/dashboard')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Dashboard
          </button>
          <span className="hist-count">{history.length} {history.length === 1 ? 'scan' : 'scans'}</span>
          {history.length > 0 && (
            <button className="hist-clear-btn" onClick={clearHistory}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
              Clear All
            </button>
          )}
        </div>
      </header>

      <div className="hist-content">
        {history.length === 0 ? (
          <div className="hist-empty">
            <div className="hist-empty-icon">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <h3>No Analysis History</h3>
            <p>Your scan results will appear here after you analyze a leaf image.</p>
            <button className="hist-scan-btn" onClick={() => navigate('/detection')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Start First Scan
            </button>
          </div>
        ) : (
          <div className="hist-list">
            {history.map((item, index) => (
              <div
                className={`hist-card ${expandedId === index ? 'hist-card-expanded' : ''}`}
                key={index}
              >
                <div className="hist-card-main" onClick={() => setExpandedId(expandedId === index ? null : index)}>
                  {item.thumbnail && (
                    <img src={item.thumbnail} alt="" className="hist-thumb" />
                  )}
                  <div className="hist-info">
                    <span className="hist-disease-name">{item.disease}</span>
                    <span className="hist-date">{formatDate(item.date)}</span>
                  </div>
                  <div className="hist-badges">
                    <span className={`hist-sev-badge ${getSeverityClass(item.severity)}`}>
                      {item.severity}
                    </span>
                    <span className="hist-conf-badge">{item.confidence}%</span>
                  </div>
                  <svg className="hist-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>

                {expandedId === index && (
                  <div className="hist-card-details">
                    <p className="hist-desc">{item.description}</p>
                    {item.treatment && item.treatment.length > 0 && (
                      <div className="hist-treatment">
                        <h4>Treatment</h4>
                        <ul>
                          {item.treatment.map((t, ti) => (
                            <li key={ti}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3a7d44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <button className="hist-delete-btn" onClick={(e) => { e.stopPropagation(); deleteItem(index); }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                      Delete this scan
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
