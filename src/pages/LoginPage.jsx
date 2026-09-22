import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = activeTab === 'signin' ? 'login' : 'signup';
    const payload = activeTab === 'signin' 
      ? { email, password } 
      : { email, password, name };

    try {
      const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Save user to local storage and go to dashboard
      localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <div className="login-logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22.17C6.42 20.5 7.14 18.83 8.15 17.42C9.44 18.28 10.9 18.57 12.6 18.57C17.24 18.57 21 14.81 21 10.17V2L17 8Z" fill="white"/>
            <path d="M12.6 16.57C11.28 16.57 10.14 16.28 9.24 15.57C10.14 14.07 11.54 12.87 13.24 12.17C14.94 11.47 16.84 11.37 18.64 11.87C18.34 14.57 15.84 16.57 12.6 16.57Z" fill="white" opacity="0.6"/>
          </svg>
          <span>AgriSense</span>
        </div>
        <p className="login-tagline">Smart Agriculture Management</p>
      </div>

      <div className="login-card">
        <h2 className="login-welcome">Welcome</h2>
        <p className="login-subtitle">Sign in to your account or create a new one</p>

        <div className="login-tabs">
          <button
            className={`login-tab ${activeTab === 'signin' ? 'active' : ''}`}
            onClick={() => setActiveTab('signin')}
          >
            Sign In
          </button>
          <button
            className={`login-tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message" style={{color: '#ef4444', background: '#fee2e2', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '14px', border: '1px solid #f87171'}}>{error}</div>}
          
          {activeTab === 'signup' && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Processing...' : (activeTab === 'signin' ? 'Sign In' : 'Sign Up')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
