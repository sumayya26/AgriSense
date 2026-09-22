import React from 'react';
import './WhyChoose.css';

const benefits = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3a7d44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
        <polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
    title: 'Increase Crop Yields',
    stat: '+30%',
    desc: 'Early disease detection can increase your harvest by up to 30% through timely intervention.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3a7d44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'Reduce Losses',
    stat: '-40%',
    desc: 'Prevent costly crop failures and reduce pesticide expenses with targeted treatment.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3a7d44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Sustainable Farming',
    stat: '-50%',
    desc: 'Use fewer pesticides and chemicals by applying treatments only when and where needed.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3a7d44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Save Time',
    stat: '90%',
    desc: 'Instant analysis replaces hours of manual field inspection, saving you valuable time.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3a7d44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Expert Knowledge',
    stat: '24/7',
    desc: 'Access to agricultural expertise and disease databases anytime, anywhere.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3a7d44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Global Impact',
    stat: '10K+',
    desc: 'Join thousands of farmers worldwide in creating a sustainable future for agriculture.',
  },
];

const WhyChoose = () => {
  return (
    <section className="why-choose" id="benefits">
      <div className="why-container">
        <h2 className="why-title">
          Why Choose <span className="green-text">AgriSense</span>
        </h2>
        <p className="why-subtitle">
          Transform your farming practices with measurable results and sustainable growth.
        </p>

        <div className="benefits-grid">
          {benefits.map((b, i) => (
            <div className="benefit-card" key={i}>
              <div className="benefit-header">
                <div className="benefit-icon">{b.icon}</div>
                <div className="benefit-info">
                  <h3 className="benefit-title">{b.title}</h3>
                </div>
                <span className="benefit-stat">{b.stat}</span>
              </div>
              <p className="benefit-desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
