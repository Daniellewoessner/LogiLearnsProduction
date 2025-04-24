import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css'; // This would use the CSS styles from the main file I provided

// You may want to replace this with your actual logo
import logo from '../Images/Logilogo.png';

interface UserProfile {
  avatar?: string;
  name?: string;
}

const Navbar = ({ isLoggedIn = false, userProfile = null }: { isLoggedIn?: boolean; userProfile?: UserProfile | null }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src={logo} alt="LogiLearns Logo" />
          <span className="logo-text">LogiLearns</span>
        </Link>

        {/* Navigation Menu */}
        <nav>
          <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-active' : ''}`}>
            <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
              <Link to="/">Home</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/courses' ? 'active' : ''}`}>
              <Link to="/courses">Courses</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/games' ? 'active' : ''}`}>
              <Link to="/games">Learning Games</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/resources' ? 'active' : ''}`}>
              <Link to="/resources">Resources</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>
              <Link to="/about">About Us</Link>
            </li>
         
          </ul>
          
        </nav>

        {/* Auth Buttons or User Profile */}
        {isLoggedIn ? (
          <div className="user-profile-menu">
            <div className="user-avatar" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {userProfile?.avatar ? (
                <img src={userProfile.avatar} alt={`${userProfile.name}'s avatar`} />
              ) : (
                <div className="avatar-placeholder">
                  {userProfile?.name?.charAt(0) || 'U'}
                </div>
              )}
            </div>
            {mobileMenuOpen && (
              <div className="profile-dropdown">
                <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                <Link to="/profile" className="dropdown-item">My Profile</Link>
                <Link to="/settings" className="dropdown-item">Settings</Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout-button">Log Out</button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-outline">Log In</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-bars"></i>
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;