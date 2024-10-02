import React from 'react'

import SearchBar from './SearchBar'

function Nav({value, onChange}) {
  return (
    <div className='nav-container'>
      <div className="theme-toggle">
        <i className="ri-toggle-line"></i>
        <p>Dark Mode</p>
      </div>
      {/* <i className="ri-toggle-fill"></i> */}
      <SearchBar value={value} onChange={onChange}/>
      <div className='cu-location'>
        <i className="ri-crosshair-2-fill"></i>
        <p>Current Location</p>
      </div>
    </div>
  )
}

export default Nav
