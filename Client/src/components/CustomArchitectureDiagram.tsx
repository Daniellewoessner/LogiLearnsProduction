import React from 'react';

const CustomArchitectureDiagram: React.FC = () => {
  return (
    <div className="architecture-diagram">
      <svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect width="800" height="600" fill="#f8f9fa" rx="10" ry="10" />
        
        {/* UI Components Section */}
        <rect x="50" y="30" width="300" height="180" rx="5" ry="5" fill="#f0f0f0" stroke="#666" strokeWidth="1" />
        <text x="200" y="50" textAnchor="middle" fontSize="14" fontWeight="bold">User Interface Components</text>
        
        {/* UI Component Nodes */}
        <rect x="100" y="70" width="120" height="40" rx="5" ry="5" fill="#f9d5e5" stroke="#333" strokeWidth="2" />
        <text x="160" y="95" textAnchor="middle" fontSize="12">SuperheroPage</text>
        
        <rect x="70" y="150" width="120" height="40" rx="5" ry="5" fill="#eeeeee" stroke="#333" strokeWidth="2" />
        <text x="130" y="175" textAnchor="middle" fontSize="12">ActivityPage</text>
        
        <rect x="210" y="150" width="120" height="40" rx="5" ry="5" fill="#eeeeee" stroke="#333" strokeWidth="2" />
        <text x="270" y="175" textAnchor="middle" fontSize="12">TeacherDashboard</text>
        
        <rect x="140" y="230" width="120" height="40" rx="5" ry="5" fill="#d5f9e8" stroke="#333" strokeWidth="2" />
        <text x="200" y="255" textAnchor="middle" fontSize="12">StoryPlayer</text>
        
        {/* UI Component Arrows */}
        <line x1="160" y1="110" x2="130" y2="150" stroke="#666" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <line x1="160" y1="110" x2="270" y2="150" stroke="#666" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <line x1="130" y1="190" x2="200" y2="230" stroke="#666" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <line x1="270" y1="190" x2="200" y2="230" stroke="#666" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        
        {/* Accessibility Features Section */}
        <rect x="400" y="30" width="300" height="180" rx="5" ry="5" fill="#f0f0f0" stroke="#666" strokeWidth="1" />
        <text x="550" y="50" textAnchor="middle" fontSize="14" fontWeight="bold">Accessibility Features</text>
        
        {/* Accessibility Feature Nodes */}
        <rect x="420" y="70" width="120" height="30" rx="5" ry="5" fill="#ffd1dc" stroke="#333" strokeWidth="1" />
        <text x="480" y="90" textAnchor="middle" fontSize="11">FontSize Controls</text>
        
        <rect x="420" y="105" width="120" height="30" rx="5" ry="5" fill="#ffd1dc" stroke="#333" strokeWidth="1" />
        <text x="480" y="125" textAnchor="middle" fontSize="11">LineSpacing Controls</text>
        
        <rect x="420" y="140" width="120" height="30" rx="5" ry="5" fill="#ffd1dc" stroke="#333" strokeWidth="1" />
        <text x="480" y="160" textAnchor="middle" fontSize="11">LetterSpacing Controls</text>
        
        <rect x="420" y="175" width="120" height="30" rx="5" ry="5" fill="#ffd1dc" stroke="#333" strokeWidth="1" />
        <text x="480" y="195" textAnchor="middle" fontSize="11">HighContrast Mode</text>
        
        <rect x="560" y="70" width="120" height="30" rx="5" ry="5" fill="#d1ffdc" stroke="#333" strokeWidth="1" />
        <text x="620" y="90" textAnchor="middle" fontSize="11">Audio Narration</text>
        
        <rect x="560" y="105" width="120" height="30" rx="5" ry="5" fill="#d1ffdc" stroke="#333" strokeWidth="1" />
        <text x="620" y="125" textAnchor="middle" fontSize="11">Text Highlighting</text>
        
        {/* Accessibility Feature Arrows */}
        <line x1="420" y1="85" x2="220" y2="85" stroke="#666" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="420" y1="120" x2="220" y2="85" stroke="#666" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="420" y1="155" x2="220" y2="85" stroke="#666" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="420" y1="190" x2="220" y2="85" stroke="#666" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="560" y1="85" x2="260" y2="235" stroke="#666" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="560" y1="120" x2="260" y2="235" stroke="#666" strokeWidth="1" markerEnd="url(#arrowhead)" />
        
        {/* Data Models Section */}
        <rect x="50" y="290" width="300" height="150" rx="5" ry="5" fill="#f0f0f0" stroke="#666" strokeWidth="1" />
        <text x="200" y="310" textAnchor="middle" fontSize="14" fontWeight="bold">Data Models</text>
        
        {/* Data Model Nodes */}
        <rect x="100" y="330" width="120" height="30" rx="5" ry="5" fill="#e6f7ff" stroke="#333" strokeWidth="1" />
        <text x="160" y="350" textAnchor="middle" fontSize="12">Curriculum Weeks</text>
        
        <rect x="100" y="370" width="120" height="30" rx="5" ry="5" fill="#e6f7ff" stroke="#333" strokeWidth="1" />
        <text x="160" y="390" textAnchor="middle" fontSize="12">Activities</text>
        
        <rect x="100" y="410" width="120" height="30" rx="5" ry="5" fill="#e6f7ff" stroke="#333" strokeWidth="1" />
        <text x="160" y="430" textAnchor="middle" fontSize="12">Stories</text>
        
        <rect x="240" y="370" width="120" height="30" rx="5" ry="5" fill="#e6f7ff" stroke="#333" strokeWidth="1" />
        <text x="300" y="390" textAnchor="middle" fontSize="12">Lesson Plans</text>
        
        {/* Data Model Arrows */}
        <line x1="160" y1="330" x2="160" y2="95" stroke="#666" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="160" y1="370" x2="160" y2="360" stroke="#666" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="160" y1="410" x2="160" y2="400" stroke="#666" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="300" y1="370" x2="270" y2="175" stroke="#666" strokeWidth="1" markerEnd="url(#arrowhead)" />
        
        {/* Adaptation Types Section */}
        <rect x="400" y="290" width="300" height="170" rx="5" ry="5" fill="#f0f0f0" stroke="#666" strokeWidth="1" />
        <text x="550" y="310" textAnchor="middle" fontSize="14" fontWeight="bold">Adaptation Types</text>
        
        {/* Adaptation Type Nodes */}
        <rect x="430" y="330" width="100" height="30" rx="5" ry="5" fill="#ffe8e8" stroke="#333" strokeWidth="1" />
        <text x="480" y="350" textAnchor="middle" fontSize="12">Visual</text>
        
        <rect x="430" y="370" width="100" height="30" rx="5" ry="5" fill="#e6f2ff" stroke="#333" strokeWidth="1" />
        <text x="480" y="390" textAnchor="middle" fontSize="12">Auditory</text>
        
        <rect x="430" y="410" width="100" height="30" rx="5" ry="5" fill="#e8f8e8" stroke="#333" strokeWidth="1" />
        <text x="480" y="430" textAnchor="middle" fontSize="12">Tactile</text>
        
        <rect x="570" y="330" width="100" height="30" rx="5" ry="5" fill="#fff5e6" stroke="#333" strokeWidth="1" />
        <text x="620" y="350" textAnchor="middle" fontSize="12">Kinesthetic</text>
        
        <rect x="570" y="370" width="100" height="30" rx="5" ry="5" fill="#f5e6ff" stroke="#333" strokeWidth="1" />
        <text x="620" y="390" textAnchor="middle" fontSize="12">Discussion</text>
        
        {/* Adaptation Type Arrows */}
        <line x1="430" y1="345" x2="220" y2="385" stroke="#666" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="430" y1="385" x2="220" y2="385" stroke="#666" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="430" y1="425" x2="220" y2="385" stroke="#666" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="570" y1="345" x2="220" y2="385" stroke="#666" strokeWidth="1" markerEnd="url(#arrowhead)" />
        <line x1="570" y1="385" x2="220" y2="385" stroke="#666" strokeWidth="1" markerEnd="url(#arrowhead)" />
        
        {/* Arrow definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
          </marker>
        </defs>
        
        {/* Legend */}
        <rect x="50" y="470" width="700" height="100" rx="5" ry="5" fill="#f0f0f0" stroke="#666" strokeWidth="1" />
        <text x="400" y="490" textAnchor="middle" fontSize="14" fontWeight="bold">Superhero Curriculum Architecture</text>
        <text x="400" y="510" textAnchor="middle" fontSize="12">Dyslexia-Friendly Components and Their Relationships</text>
        <text x="400" y="530" textAnchor="middle" fontSize="11" fill="#666">This diagram shows how the different parts of the application work together</text>
        <text x="400" y="550" textAnchor="middle" fontSize="11" fill="#666">to create an accessible, engaging learning experience.</text>
      </svg>
    </div>
  );
};

export default CustomArchitectureDiagram;