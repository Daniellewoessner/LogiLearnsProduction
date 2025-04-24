import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/Homepage';
import GardenGamePage from './pages/GardenGamePage';
import ReadingGamesPage from './pages/ReadingGamesPage';
import PhonicsLabPage from './pages/PhonicsLabPage';
import SettingsPage from './pages/SettingsPage';
import ActivityPage from './pages/ActivityPage'; // Fixed import path
import SuperheroPage from './pages/SuperheroPage';
import StoryActivityPage from './pages/StoryActivityPage';
import SuperheroActivity from './pages/SuperheroPage';
import SuperheroBadgeMaker from './components/SuperheroBadgeMaker';
import './styles/App.css';

// Context for dyslexia settings
export const DyslexiaSettingsContext = React.createContext({
  fontFamily: 'OpenDyslexic',
  fontSize: 'medium',
  lineSpacing: 'normal',
  colorTheme: 'neutral',
  updateSettings: (settings: any) => {}
});

const App: React.FC = () => {
  const [settings, setSettings] = useState({
    fontFamily: 'OpenDyslexic',
    fontSize: 'medium',
    lineSpacing: 'normal',
    colorTheme: 'neutral'
  });

  const updateSettings = (newSettings: any) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Apply global styling based on settings
  document.documentElement.style.setProperty(
    '--app-font-family', 
    settings.fontFamily === 'OpenDyslexic' ? 'OpenDyslexic, sans-serif' : 
    settings.fontFamily === 'Comic Sans' ? 'Comic Sans MS, sans-serif' : 
    'Arial, sans-serif'
  );

  document.documentElement.style.setProperty(
    '--app-line-height', 
    settings.lineSpacing === 'wide' ? '1.8' : 
    settings.lineSpacing === 'normal' ? '1.5' : '1.2'
  );

  document.documentElement.style.setProperty(
    '--app-font-size-base', 
    settings.fontSize === 'large' ? '18px' : 
    settings.fontSize === 'medium' ? '16px' : '14px'
  );

  // Set color theme
  let bgColor = '#ffffff';
  let textColor = '#333333';
  let accentColor = '#4caf50';

  if (settings.colorTheme === 'cream') {
    bgColor = '#f8f5e4';
    textColor = '#333333';
  } else if (settings.colorTheme === 'dark') {
    bgColor = '#222222';
    textColor = '#f0f0f0';
    accentColor = '#66bb6a';
  } else if (settings.colorTheme === 'blue') {
    bgColor = '#e8f4fc';
    textColor = '#333333';
    accentColor = '#2196f3';
  }

  document.documentElement.style.setProperty('--app-bg-color', bgColor);
  document.documentElement.style.setProperty('--app-text-color', textColor);
  document.documentElement.style.setProperty('--app-accent-color', accentColor);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <DyslexiaSettingsContext.Provider value={{ ...settings, updateSettings }}>
        <Router>
          <div className="app" style={{ 
            backgroundColor: 'var(--app-bg-color)',
            color: 'var(--app-text-color)',
            fontFamily: 'var(--app-font-family)',
            fontSize: 'var(--app-font-size-base)',
            lineHeight: 'var(--app-line-height)'
          }}>
            <header className="app-header">
              <div className="logo-container">
                <img src="/assets/logo.png" alt="Logi Learns Logo" className="app-logo" />
                <h1 className="app-title">Logi Learns</h1>
              </div>
              <nav className="app-nav">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/garden" className="nav-link">Garden Explorer</Link>
                <Link to="/reading" className="nav-link">Reading Games</Link>
                <Link to="/phonics" className="nav-link">Phonics Lab</Link>
                <Link to="/superhero" className="nav-link">Superhero Stories</Link>
                <Link to="/settings" className="nav-link">Settings</Link>
              </nav>
            </header>
            
            <main className="app-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/garden" element={<GardenGamePage />} />
                <Route path="/reading" element={<ReadingGamesPage />} />
                <Route path="/phonics" element={<PhonicsLabPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/superhero" element={<SuperheroPage />} />
                <Route path="/activity/:id" element={<ActivityPage />} />
                <Route path="/" element={<SuperheroPage />} />
           <Route path="/StoryActivityPage" element={<StoryActivityPage />} />
        <Route path="/superhero-activity" element={<SuperheroActivity />} />
        <Route path="/superhero-badge-maker" element={<SuperheroBadgeMaker />} />
                <Route path="/project/:id" element={
                  <div className="project-placeholder" style={{
                    padding: '20px',
                    margin: '20px',
                    backgroundColor: 'var(--app-bg-color)',
                    border: '2px solid var(--app-accent-color)',
                    borderRadius: '10px',
                    textAlign: 'center'
                  }}>
                    <h2>Project Details</h2>
                    <p>Project details coming soon!</p>
                    <Link to="/superhero" className="back-link" style={{
                      display: 'inline-block',
                      margin: '20px 0',
                      padding: '10px 20px',
                      backgroundColor: 'var(--app-accent-color)',
                      color: 'white',
                      borderRadius: '5px',
                      textDecoration: 'none'
                    }}>Back to Curriculum</Link>
                  </div>
                } />
              </Routes>
            </main>
            
            <footer className="app-footer">
              <p>&copy; 2025 Logi Learns - Helping children with dyslexia learn through play</p>
            </footer>
          </div>
        </Router>
      </DyslexiaSettingsContext.Provider>
    </div>
  );
};

export default App;