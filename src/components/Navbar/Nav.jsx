import React from 'react'

import SearchBar from './SearchBar'

function Nav({value, onChange}) {
  return (
    <div className='nav-container'>
      <div className="theme-toggle">
        <div className="toggle">
          <div className="ellipse">
          </div>
        </div>
        <p>Dark Mode</p>
      </div>
      <SearchBar value={value} onChange={onChange}/>
      <div className='cu-location'>
        <i className="ri-crosshair-2-fill"></i>
        <p>Current Location</p>
      </div>
    </div>
  )
}

export default Nav
