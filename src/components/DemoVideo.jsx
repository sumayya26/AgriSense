import React from 'react';
import './DemoVideo.css';

const DemoVideo = () => {
  return (
    <section className="demo-video-section" id="demo">
      <div className="demo-container">
        <div className="demo-header">
          <h2 className="demo-title">See AgriSense in Action</h2>
          <p className="demo-desc">
            Watch how easy it is to detect diseases and monitor your crop health using our AI-powered platform.
          </p>
        </div>
        
        <div className="video-wrapper">
          <div className="video-card">
            <img 
              src="/demo.webp" 
              alt="AgriSense Application Demo" 
              className="demo-image"
            />
            <div className="video-overlay">
              <div className="play-hint">
                <span>Live Preview</span>
              </div>
            </div>
          </div>
          
          <div className="video-features">
            <div className="v-feature">
              <div className="v-icon">1</div>
              <div>
                <h4>Upload Image</h4>
                <p>Simple drag-and-drop or camera capture interface.</p>
              </div>
            </div>
            <div className="v-feature">
              <div className="v-icon">2</div>
              <div>
                <h4>AI Analysis</h4>
                <p>Instant detection with detailed severity reports.</p>
              </div>
            </div>
            <div className="v-feature">
              <div className="v-icon">3</div>
              <div>
                <h4>Smart Advisor</h4>
                <p>Professional treatment recommendations for every scan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoVideo;
