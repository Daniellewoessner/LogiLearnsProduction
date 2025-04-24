import React from 'react';
import '../styles/GardenToolkit.css';

const GardenToolkit: React.FC = () => {
  // This is a simplified version of the toolkit that would be expanded
  // in a full implementation
  
  return (
    <div className="garden-toolkit">
      <div className="toolkit-header">
        <h3>Garden Tips</h3>
      </div>
      
      <div className="toolkit-content">
        <div className="toolkit-section">
          <h4>Gardening Tips for Kids</h4>
          <ul className="toolkit-list">
            <li>Plants need sunlight, water, and good soil to grow well.</li>
            <li>Some plants help each other grow better when planted together.</li>
            <li>Different plants need different amounts of space.</li>
            <li>Keep your garden organized in squares to make it easier to plan.</li>
          </ul>
        </div>
        
        <div className="toolkit-section">
          <h4>Reading Garden Plans</h4>
          <div className="toolkit-info">
            <p>Each small square in your garden is 1 foot × 1 foot (30cm × 30cm).</p>
            <p>The number on each plant shows how many plants can fit in one square.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GardenToolkit;