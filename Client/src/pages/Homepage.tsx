import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Homepage.css'; // This would include the main CSS file I provided

const Homepage = () => {
  const [dyslexiaMode, setDyslexiaMode] = useState(false);

  // Apply dyslexia-friendly font if enabled
  useEffect(() => {
    if (dyslexiaMode) {
      document.body.classList.add('dyslexic-font');
    } else {
      document.body.classList.remove('dyslexic-font');
    }
  }, [dyslexiaMode]);

  // Toggle dyslexia mode
  const toggleDyslexiaMode = () => {
    setDyslexiaMode(!dyslexiaMode);
    // Could also store this preference in localStorage
    localStorage.setItem('dyslexiaMode', String(!dyslexiaMode));
  };

  return (
    <div className={`homepage ${dyslexiaMode ? 'dyslexic-font' : ''}`}>
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>Learn, Play, and Grow with LogiLearns</h1>
            <p>
              An interactive educational platform designed to make learning fun and accessible for
              children of all abilities. Explore our games, resources, and courses tailored for diverse learning styles.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary">Start Learning Today</Link>
              <Link to="/how-it-works" className="btn btn-outline">How It Works</Link>
            </div>
          </div>
          {/* Hero image removed temporarily */}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose LogiLearns?</h2>
            <p>Our platform is designed with every child in mind, offering inclusive features that make education accessible and enjoyable.</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h3>Personalized Learning</h3>
              <p>Adaptive technology that adjusts to each child's learning pace and style, ensuring optimal educational outcomes.</p>
              <Link to="/features/personalized" className="feature-link">Learn more</Link>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-universal-access"></i>
              </div>
              <h3>Accessibility First</h3>
              <p>Designed for all learners, including those with dyslexia, ADHD, and other learning differences.</p>
              <Link to="/features/accessibility" className="feature-link">Learn more</Link>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-gamepad"></i>
              </div>
              <h3>Learning Through Play</h3>
              <p>Educational games that make learning fun while developing essential academic and cognitive skills.</p>
              <Link to="/features/games" className="feature-link">Learn more</Link>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Progress Tracking</h3>
              <p>Comprehensive analytics and reports to track your child's learning journey and celebrate achievements.</p>
              <Link to="/features/tracking" className="feature-link">Learn more</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Areas Section */}
      <section className="learning-areas-section">
        <div className="container">
          <div className="section-title">
            <h2>Explore Learning Areas</h2>
            <p>Discover our range of courses and activities across key educational domains.</p>
          </div>
          
          <div className="learning-areas-grid">
            <div className="learning-area-card">
              {/* Image container removed temporarily */}
              <div className="learning-area-content">
                <h3>Mathematics</h3>
                <p>Build number sense, master calculations, and develop problem-solving skills through interactive games and lessons.</p>
              </div>
              <div className="learning-area-footer">
                <div className="learning-area-stats">
                  <span><i className="fas fa-gamepad"></i> 12 Games</span>
                  <span><i className="fas fa-book"></i> 8 Courses</span>
                </div>
                <Link to="/learning/math" className="btn btn-primary btn-sm">Explore</Link>
              </div>
            </div>
            
            <div className="learning-area-card">
              {/* Image container removed temporarily */}
              <div className="learning-area-content">
                <h3>Science</h3>
                <p>Discover the wonders of the natural world through experiments, simulations, and fascinating interactive content.</p>
              </div>
              <div className="learning-area-footer">
                <div className="learning-area-stats">
                  <span><i className="fas fa-gamepad"></i> 8 Games</span>
                  <span><i className="fas fa-book"></i> 6 Courses</span>
                </div>
                <Link to="/learning/science" className="btn btn-primary btn-sm">Explore</Link>
              </div>
            </div>
            
            <div className="learning-area-card">
              {/* Image container removed temporarily */}
              <div className="learning-area-content">
                <h3>Reading Skills</h3>
                <p>Develop phonics awareness, vocabulary, comprehension, and a love for reading with our literacy games.</p>
              </div>
              <div className="learning-area-footer">
                <div className="learning-area-stats">
                  <span><i className="fas fa-gamepad"></i> 15 Games</span>
                  <span><i className="fas fa-book"></i> 10 Courses</span>
                </div>
                <Link to="/learning/reading" className="btn btn-primary btn-sm">Explore</Link>
              </div>
            </div>
            
            <div className="learning-area-card">
              {/* Image container removed temporarily */}
              <div className="learning-area-content">
                <h3>Writing & Creativity</h3>
                <p>Express ideas through creative writing activities, storytelling games, and grammar exercises.</p>
              </div>
              <div className="learning-area-footer">
                <div className="learning-area-stats">
                  <span><i className="fas fa-gamepad"></i> 10 Games</span>
                  <span><i className="fas fa-book"></i> 7 Courses</span>
                </div>
                <Link to="/learning/writing" className="btn btn-primary btn-sm">Explore</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
  
<div className="superhero-section">
  <div className="container">
    <div className="superhero-content">
      <h2>Join the Superhero Curriculum</h2>  
      <p>Play Superhero Games, a fun and engaging way to learn math and reading skills.
      </p>
      <Link to="/superhero" className="btn btn-primary">Start Your Adventure</Link>
    </div>
  </div>
  {/* Superhero image removed temporarily */}
</div>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-title">
            <h2>What Parents & Teachers Say</h2>
            <p>Hear from families and educators who have experienced the impact of LogiLearns.</p>
          </div>
          
          <div className="testimonials-container">
            <div className="testimonial-card">
              <div className="testimonial-text">
                LogiLearns has been a game-changer for my daughter who struggles with dyslexia. The customizable interface and adaptive learning approach have helped her gain confidence in reading and math.
              </div>
              <div className="testimonial-author">
                {/* Avatar removed temporarily */}
                <div className="author-info">
                  <h4>Sarah Johnson</h4>
                  <p>Parent of a 9-year-old</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-text">
                As a special education teacher, I've tried many digital learning platforms, but LogiLearns stands out for its true commitment to accessibility and engaging content. My students look forward to our LogiLearns sessions every week.
              </div>
              <div className="testimonial-author">
                {/* Avatar removed temporarily */}
                <div className="author-info">
                  <h4>Michael Rodriguez</h4>
                  <p>Special Education Teacher</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container cta-container">
          <h2>Ready to Start Your Child's Learning Journey?</h2>
          <p>Join thousands of families discovering the joy of inclusive, engaging education.</p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn btn-primary">Create Free Account</Link>
            <Link to="/demo" className="btn btn-outline">Try Demo Lesson</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-container">
            <div className="footer-about">
              <div className="footer-logo">LogiLearns</div>
              <p>Making education accessible and enjoyable for every child, regardless of learning style or ability.</p>
              <div className="social-links">
                <a href="https://facebook.com" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="https://twitter.com" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="https://instagram.com" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="https://youtube.com" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
            
            <div className="footer-nav">
              <h4>Explore</h4>
              <ul className="footer-links">
                <li><Link to="/courses">Courses</Link></li>
                <li><Link to="/games">Learning Games</Link></li>
                <li><Link to="/resources">Parent Resources</Link></li>
                <li><Link to="/blog">Educational Blog</Link></li>
              </ul>
            </div>
            
            <div className="footer-nav">
              <h4>About</h4>
              <ul className="footer-links">
                <li><Link to="/about">Our Mission</Link></li>
                <li><Link to="/team">Our Team</Link></li>
                <li><Link to="/approach">Teaching Approach</Link></li>
                <li><Link to="/testimonials">Success Stories</Link></li>
              </ul>
            </div>
            
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <p><i className="fas fa-envelope"></i> support@logilearns.com</p>
              <p><i className="fas fa-phone"></i> 1111111111</p>
              <p><i className="fas fa-map-marker-alt"></i> 123 Learning Lane, Education City, EC 12345</p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} LogiLearns. All rights reserved. <Link to="/privacy">Privacy Policy</Link> | <Link to="/terms">Terms of Use</Link></p>
          </div>
        </div>
      </footer>

      {/* Accessibility Widget */}
      <div className="accessibility-widget" onClick={toggleDyslexiaMode}>
        <div className="accessibility-icon">
          <i className="fas fa-universal-access"></i>
        </div>
        <div className="accessibility-menu">
          <div className="accessibility-option">
            <input 
              type="checkbox" 
              id="dyslexia-mode" 
              checked={dyslexiaMode}
              onChange={toggleDyslexiaMode}
            />
            <label htmlFor="dyslexia-mode">Dyslexia-friendly font</label>
          </div>
          {/* Add more accessibility options here */}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
// Homepage.tsx