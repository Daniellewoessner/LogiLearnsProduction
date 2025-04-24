import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/App.css';
import './styles/GardenGame.css';
import './styles/ReadingGamesPage.css';
import './styles/Phonicslabpage.css';
import './styles/settingpage.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);