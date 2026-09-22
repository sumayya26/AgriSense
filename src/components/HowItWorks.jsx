import React from 'react';
import './HowItWorks.css';

const steps = [
  {
    num: '01',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3a7d44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
    title: 'Capture & Upload',
    desc: 'Take a photo of your plant leaves using your smartphone or upload existing images to our platform.',
  },
  {
    num: '02',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3a7d44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2"/>
        <circle cx="12" cy="12" r="3"/>
        <line x1="4" y1="12" x2="9" y2="12"/>
        <line x1="15" y1="12" x2="20" y2="12"/>
        <line x1="12" y1="4" x2="12" y2="9"/>
        <line x1="12" y1="15" x2="12" y2="20"/>
      </svg>
    ),
    title: 'AI Analysis',
    desc: 'Our advanced AI algorithms analyze the image, identifying patterns, symptoms, and potential diseases.',
  },
  {
    num: '03',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3a7d44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: 'Get Results & Treatment',
    desc: 'Receive instant diagnosis with treatment recommendations and preventive measures for your crops.',
  },
];

const HowItWorks = () => {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-container">
        <h2 className="how-title">
          How AgriSense <span className="green-text">Works</span>
        </h2>
        <p className="how-subtitle">
          Simple, fast, and accurate plant disease detection in just three easy steps.
        </p>

        <div className="steps-grid">
          {steps.map((step, i) => (
            <div className="step-card" key={i}>
              <div className="step-icon-wrapper">
                <div className="step-icon-bg">
                  {step.icon}
                </div>
                <span className="step-num">{step.num}</span>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
