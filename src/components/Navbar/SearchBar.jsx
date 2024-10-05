import React, { useState } from 'react';

const SearchBar = ({ value, onSearch }) => {
    const [inputValue, setInputValue] = useState(value);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch(inputValue);
        }
    };

    const handleClick = () => {
        onSearch(inputValue);
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="search-bar">
            <i className="ri-search-line" onClick={handleClick}></i>
            <input
                type="text"
                value={inputValue} 
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                placeholder="Search for your preferred city..."
            />
        </div>
    );
};

export default SearchBar;
