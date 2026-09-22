import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CTA.css';

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="cta-section" id="contact">
      <div className="cta-bg">
        <div className="cta-card">
          <h2 className="cta-title">Ready to Protect Your Crops?</h2>
          <p className="cta-desc">
            Join thousands of farmers who trust AgriSense to safeguard their
            harvests and maximize their yields with AI-powered plant health
            monitoring.
          </p>

          <div className="cta-features">
            <div className="cta-feature">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a7d44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>Free 30-day trial</span>
            </div>
            <div className="cta-feature">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a7d44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>No setup fees</span>
            </div>
            <div className="cta-feature">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a7d44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>24/7 support</span>
            </div>
            <div className="cta-feature">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a7d44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>Cancel anytime</span>
            </div>
          </div>

          <div className="cta-actions">
            <button className="cta-btn-primary" onClick={() => navigate('/detection')}>
              Start Free Trial
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="cta-btn-secondary">Schedule Demo</button>
          </div>

          <div className="cta-contact">
            <p>Have questions? We're here to help.</p>
            <div className="cta-contact-links">
              <a href="mailto:support@agrisense.com" className="contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a7d44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                support@agrisense.com
              </a>
              <a href="tel:+15550123456" className="contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a7d44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +1 (555) 012-3456
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
