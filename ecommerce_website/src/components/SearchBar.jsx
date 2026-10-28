import { useRef } from 'react';

import { ICONS } from '/src/constants'

function SearchBar({ value, onSearchChange }) {
  const inputRef = useRef(null);

  const focusSearchInput = (event) => {
    if (event.target.closest('img')) {
      return;
    }
    inputRef.current?.focus();
  };

  return (
    <div
      id="search-bar"
      onClick={focusSearchInput}
      style={{ display: 'flex', alignItems: 'center', gap: '5px', width: '100%' }}
    >
      <img
        src={ICONS.SEARCH}
        alt="Search Icon"
      />
      <input
        ref={inputRef}
        type="text"
        id="search"
        name="search"
        placeholder="Search for product"
        value={value}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;