import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './DetectionPage.css';

const DetectionPage = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cropType, setCropType] = useState('tomato');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setAnalyzing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('crop_type', cropType);

      const response = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const resultData = {
          disease: data.prediction.disease,
          confidence: data.prediction.confidence,
          severity: data.prediction.severity,
          description: data.prediction.description,
          treatment: data.prediction.treatment,
          imageQuality: data.image_info?.quality || 'Unknown',
          demoMode: data.demo_mode,
          stubMode: data.prediction?.stub_mode,
        };
        setResult(resultData);

        // Save to localStorage for history
        try {
          const historyEntry = {
            disease: resultData.disease,
            confidence: resultData.confidence,
            severity: resultData.severity,
            description: resultData.description,
            treatment: resultData.treatment,
            thumbnail: imagePreview,
            date: new Date().toISOString(),
          };
          const existing = JSON.parse(localStorage.getItem('agrisense_history') || '[]');
          existing.unshift(historyEntry);
          // Keep max 50 entries
          if (existing.length > 50) existing.length = 50;
          localStorage.setItem('agrisense_history', JSON.stringify(existing));
        } catch (e) {
          console.warn('Failed to save to history:', e);
        }
      } else {
        throw new Error(data.error || 'Prediction failed');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setResult({
        disease: '⚠️ Analysis Failed',
        confidence: 0,
        severity: 'Unknown',
        description: 'We couldn’t analyze the uploaded image successfully. This may be because the image does not clearly show a detectable crop or is not supported by our system.',
        treatment: [
          'Ensure the image is clear, well-lit, and in focus',
          'Make sure the plant leaf or crop is clearly visible and centered',
          'Avoid blurry, dark, or distant images',
          'Try uploading a different image of the same plant',
          'Capture the image closer to the affected area'
        ],
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setImagePreview(null);
    setResult(null);
    setAnalyzing(false);
  };

  return (
    <div className="detection-page">
      <header className="detection-header">
        <div className="detection-header-left">
          <button className="back-btn" onClick={() => navigate('/')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div className="detection-logo">
            <div className="detection-logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22.17C6.42 20.5 7.14 18.83 8.15 17.42C9.44 18.28 10.9 18.57 12.6 18.57C17.24 18.57 21 14.81 21 10.17V2L17 8Z" fill="white"/>
              </svg>
            </div>
            <span className="detection-title">Leaf Disease Detection</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="video-btn" onClick={() => navigate('/dashboard')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
              <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Dashboard
          </button>
          <button className="video-btn" onClick={() => setShowVideoModal(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Watch Demo
          </button>
        </div>
      </header>


      <div className="detection-content">
        <div className="detection-grid">
          {/* Upload Panel */}
          <div className="upload-panel">
            <div className="panel-header">
              <h3>Upload Image</h3>
              <p>Take a photo or upload a leaf image</p>
            </div>

            <div className="crop-selector">
              <label>Select Crop Type</label>
              <div className="crop-options">
                {[
                  'tomato', 'potato', 'pepper_bell', 'apple',
                  'corn', 'grape', 'peach', 'cherry', 'blueberry',
                  'orange', 'raspberry', 'soyabean', 'squash', 'strawberry'
                ].map((type) => (
                  <button
                    key={type}
                    className={`crop-opt ${cropType === type ? 'active' : ''}`}
                    onClick={() => setCropType(type)}
                  >
                    {type === 'auto' ? 'Auto Detect' : type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {!imagePreview ? (
              <div
                className={`upload-zone ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="upload-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3a7d44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                </div>
                <p className="upload-text">Click to upload</p>
                <p className="upload-hint">JPG, PNG or WEBP (max 10MB)</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="file-input-hidden"
                />
              </div>
            ) : (
              <div className="image-preview-container">
                <img src={imagePreview} alt="Uploaded leaf" className="image-preview" />
                <button className="remove-image-btn" onClick={handleReset}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            )}

            <div className="upload-actions">
              <button className="upload-btn" onClick={() => fileInputRef.current?.click()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                Browse
              </button>
              <button className="upload-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
                Camera
              </button>
              {imagePreview && (
                <button
                  className="analyze-btn"
                  onClick={handleAnalyze}
                  disabled={analyzing}
                >
                  {analyzing ? (
                    <>
                      <div className="spinner"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                      Analyze
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Results Panel */}
          <div className="results-panel">
            {!result && !analyzing ? (
              <div className="results-empty">
                <div className="empty-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <p>Upload and analyze a leaf to see results here</p>
              </div>
            ) : analyzing ? (
              <div className="results-loading">
                <div className="analysis-spinner"></div>
                <p>Analyzing your image...</p>
                <p className="loading-sub">Our AI is examining the leaf for diseases</p>
              </div>
            ) : result ? (
              <div className="results-content">
                {result.demoMode && (
                  <div className="demo-banner">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    Demo Mode — results are simulated. Add model weights for real predictions.
                  </div>
                )}

                {result.stubMode && (
                  <div className="demo-banner stub-warning">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    Untrained Models — Results are random. Please upload trained .pth files to backend/models/
                  </div>
                )}

                <h3 className="result-disease">{result.disease}</h3>
                <p className="result-desc">{result.description}</p>

                <div className="treatment-section">
                  <h4>{result.disease === '⚠️ Analysis Failed' ? '🌿 What You Can Do' : 'Recommended Treatment'}</h4>
                  <ul className="treatment-list">
                    {result.treatment.map((item, i) => (
                      <li key={i}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a7d44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {showVideoModal && (
        <div className="video-modal-overlay" onClick={() => setShowVideoModal(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-video-modal" onClick={() => setShowVideoModal(false)}>×</button>
            <h3 style={{marginBottom: '10px', color: '#111827'}}>How to use AgriSense Detection</h3>
            <img src="/demo.webp" alt="Detection Demo" style={{width: '100%', borderRadius: '8px'}} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetectionPage;
