import { useRef, useState, useEffect } from 'react';

import PriceInput from './PriceInput'

function PriceRangeFilter({ onChangeValue }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showDropdown &&
        filterRef.current &&
        !filterRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleMinPrice = (price) => {
    const nextMinPrice = price;
    const nextRange = { price: {min: nextMinPrice, max: maxPrice }};
    setMinPrice(nextMinPrice);
    onChangeValue(nextRange);
  };

  const handleMaxPrice = (price) => {
    const nextMaxPrice = price;
    const nextRange = { price: {min: minPrice, max: nextMaxPrice }};
    setMaxPrice(nextMaxPrice);
    onChangeValue(nextRange);
  };

  return (
    <div
      ref={filterRef}
      style={{
        display: 'flex',
        alignItems: 'center', 
        gap: '10px',
        position: 'relative' 
      }}
    >
      <button
        type="Price"
        onClick={() => {
          setShowDropdown((prev) => !prev);
        }}
      >
        Price
      </button>
      <div
        className={
          showDropdown ? 'filter-btn-popup is-open' : 'filter-btn-popup'
        }
        style={{
          display: showDropdown ? 'flex' : 'none',
          alignItems: 'center',
          gap: '15px',
          padding: '10px 10px'
        }}
      >
        <PriceInput
          label_text="From"
          onChangeValue={handleMinPrice}
        />
        <PriceInput
          label_text="To"
          onChangeValue={handleMaxPrice}
        />
      </div>
    </div>
  );
}

export default PriceRangeFilter;
