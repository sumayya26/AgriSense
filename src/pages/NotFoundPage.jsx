import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="notfound-content">
        <div className="notfound-leaf">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22.17C6.42 20.5 7.14 18.83 8.15 17.42C9.44 18.28 10.9 18.57 12.6 18.57C17.24 18.57 21 14.81 21 10.17V2L17 8Z" fill="#3a7d44" opacity="0.2"/>
            <path d="M12.6 16.57C11.28 16.57 10.14 16.28 9.24 15.57C10.14 14.07 11.54 12.87 13.24 12.17C14.94 11.47 16.84 11.37 18.64 11.87C18.34 14.57 15.84 16.57 12.6 16.57Z" fill="#3a7d44" opacity="0.4"/>
          </svg>
        </div>
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Page Not Found</h2>
        <p className="notfound-desc">
          Looks like this leaf has blown away! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="notfound-actions">
          <button className="notfound-home" onClick={() => navigate('/')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Go Home
          </button>
          <button className="notfound-back" onClick={() => navigate(-1)}>
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
