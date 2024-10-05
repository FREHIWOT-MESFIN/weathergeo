import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

function Nav({ value, onSearch }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const body = document.querySelector('.app');
    body.classList.toggle('dark', isDarkMode);
    body.classList.toggle('light', !isDarkMode);
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className='nav-container'>
      <div className="theme-toggle" onClick={handleToggle} role="button" aria-pressed={isDarkMode} tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && handleToggle()}>
        <div className="toggle">
          <div className="ellipse"></div>
        </div>
        <p>Dark Mode</p>
      </div>
      <SearchBar value={value} onSearch={onSearch} />
      <div className='cu-location'>
        <i className="ri-crosshair-2-fill"></i>
        <p>Current Location</p>
      </div>
    </div>
  );
}

export default Nav;
