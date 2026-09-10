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
    <div className="filter-catagory-container">
      <h5> Price </h5>
        <PriceInput
          label_text="From"
          onChangeValue={handleMinPrice}
        />
        <PriceInput
          label_text="To"
          onChangeValue={handleMaxPrice}
        />
    </div>
  );
}

export default PriceRangeFilter;
