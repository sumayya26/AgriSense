import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change or resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (hash) => {
    setMenuOpen(false);
    if (hash) window.location.hash = hash;
  };

  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    handleNavigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="/" className="navbar-logo" onClick={(e) => { e.preventDefault(); handleNavigate('/'); }}>
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22.17C6.42 20.5 7.14 18.83 8.15 17.42C9.44 18.28 10.9 18.57 12.6 18.57C17.24 18.57 21 14.81 21 10.17V2L17 8Z" fill="white"/>
              <path d="M12.6 16.57C11.28 16.57 10.14 16.28 9.24 15.57C10.14 14.07 11.54 12.87 13.24 12.17C14.94 11.47 16.84 11.37 18.64 11.87C18.34 14.57 15.84 16.57 12.6 16.57Z" fill="white" opacity="0.6"/>
            </svg>
          </div>
          <span className="logo-text">AgriSense</span>
        </a>

        {/* Hamburger button */}
        <button
          className={`hamburger ${menuOpen ? 'hamburger-active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Mobile overlay */}
        {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}

        <div className={`navbar-menu ${menuOpen ? 'navbar-menu-open' : ''}`}>
          <div className="navbar-links">
            <a href="#features" className="nav-link" onClick={() => handleNavClick('#features')}>Features</a>
            <a href="#how-it-works" className="nav-link" onClick={() => handleNavClick('#how-it-works')}>How It Works</a>
            <a href="#benefits" className="nav-link" onClick={() => handleNavClick('#benefits')}>Benefits</a>
            <a href="#contact" className="nav-link" onClick={() => handleNavClick('#contact')}>Contact</a>
          </div>

          <div className="navbar-actions">
            {user ? (
              <>
                <button className="btn-signin" onClick={handleLogout}>Logout</button>
                <button className="btn-getstarted" onClick={() => handleNavigate('/dashboard')}>Dashboard</button>
              </>
            ) : (
              <>
                <button className="btn-signin" onClick={() => handleNavigate('/login')}>Sign In</button>
                <button className="btn-getstarted" onClick={() => handleNavigate('/login')}>Get Started</button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
