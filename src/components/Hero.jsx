import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero" id="features">
      <div className="hero-bg">
        <img src="/hero-bg-user.jpg" alt="Farmer in field with drones" className="hero-bg-img" />
        <div className="hero-bg-overlay"></div>
      </div>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            <span>AI-Powered Plant Protection</span>
          </div>

          <h1 className="hero-title">
            Smart Plant Disease<br/>
            <span className="hero-title-green">Detection &amp;<br/>Prediction</span>
          </h1>

          <p className="hero-description">
            Revolutionize your farming with AI-powered early disease detection. 
            Protect your crops, increase yields, and secure your harvest with 
            intelligent plant health monitoring.
          </p>

          <div className="hero-actions">
            <button className="btn-trial" onClick={() => navigate('/detection')}>
              Start Free Trial
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="btn-demo" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
