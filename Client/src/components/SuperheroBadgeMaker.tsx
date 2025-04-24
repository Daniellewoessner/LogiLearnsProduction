import React, { useState } from 'react';

const SuperheroBadgeMaker = () => {
  const [badgeName, setBadgeName] = useState('My Hero Name');
  const [selectedPower, setSelectedPower] = useState('creativity');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedSymbol, setSelectedSymbol] = useState('⚡');
  
  // Badge color options
  const colorOptions = [
    { name: 'blue', bgClass: 'bg-blue-500', textClass: 'text-white' },
    { name: 'red', bgClass: 'bg-red-500', textClass: 'text-white' },
    { name: 'green', bgClass: 'bg-green-500', textClass: 'text-white' },
    { name: 'purple', bgClass: 'bg-purple-500', textClass: 'text-white' },
    { name: 'orange', bgClass: 'bg-orange-500', textClass: 'text-white' },
  ];
  
  // Symbol options
  const symbolOptions = ['⚡', '✨', '🔥', '💧', '🌟', '❤️', '🧠', '👁️', '🌈'];
  
  // Superhero powers
  const powerOptions = [
    'creativity', 'kindness', 'courage', 'wisdom', 
    'patience', 'strength', 'teamwork', 'persistence'
  ];
  
  // Get current color classes
  const getCurrentColorClasses = () => {
    const colorOption = colorOptions.find(color => color.name === selectedColor);
    return colorOption || colorOptions[0];
  };
  
  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">Superhero Badge Maker</h2>
        <p className="text-gray-600">Create your own superhero identity badge!</p>
      </div>
      
      {/* Badge Preview */}
      <div className="mb-8 flex justify-center">
        <div className={`badge-preview rounded-xl p-6 w-64 h-64 flex flex-col items-center justify-center shadow-lg border-4 ${getCurrentColorClasses().bgClass} border-yellow-400`}>
          <div className="symbol-container bg-white rounded-full w-20 h-20 flex items-center justify-center mb-4 border-4 border-yellow-400 shadow-md">
            <span className="text-4xl" role="img" aria-label="Superhero symbol">{selectedSymbol}</span>
          </div>
          
          <h3 className={`hero-name text-xl font-bold mb-2 ${getCurrentColorClasses().textClass}`}>{badgeName}</h3>
          
          <div className="power-badge bg-yellow-300 px-3 py-1 rounded-full">
            <span className="text-sm font-bold text-blue-800">Power: {selectedPower.charAt(0).toUpperCase() + selectedPower.slice(1)}</span>
          </div>
        </div>
      </div>
      
      {/* Badge Customization Controls */}
      <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
        <div className="mb-4">
          <label htmlFor="hero-name" className="block text-sm font-medium text-blue-800 mb-1">Hero Name:</label>
          <input
            type="text"
            id="hero-name"
            value={badgeName}
            onChange={(e) => setBadgeName(e.target.value)}
            maxLength={20}
            className="w-full p-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-blue-800 mb-1">Badge Color:</label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-8 h-8 rounded-full ${color.bgClass} ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                aria-label={`${color.name} color`}
              />
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-blue-800 mb-1">Superhero Symbol:</label>
          <div className="flex flex-wrap gap-2">
            {symbolOptions.map((symbol) => (
              <button
                key={symbol}
                onClick={() => setSelectedSymbol(symbol)}
                className={`w-10 h-10 flex items-center justify-center bg-white rounded-lg border-2 ${
                  selectedSymbol === symbol ? 'border-blue-500' : 'border-gray-300'
                }`}
              >
                <span className="text-xl">{symbol}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="power-select" className="block text-sm font-medium text-blue-800 mb-1">Superhero Power:</label>
          <select
            id="power-select"
            value={selectedPower}
            onChange={(e) => setSelectedPower(e.target.value)}
            className="w-full p-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {powerOptions.map((power) => (
              <option key={power} value={power}>
                {power.charAt(0).toUpperCase() + power.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <button className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-2">
          Print My Badge
        </button>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>This activity helps students identify their personal strengths and connect them to heroic traits!</p>
      </div>
    </div>
  );
};

export default SuperheroBadgeMaker;