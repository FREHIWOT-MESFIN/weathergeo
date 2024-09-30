import React from 'react';

const SearchBar = ({ value, onChange }) => {
    return (
        <div className="search-bar">
            <i class="ri-search-line"></i>
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder="Enter city..."
                className="border p-2 rounded"
            />
        </div>
    );
};

export default SearchBar;
