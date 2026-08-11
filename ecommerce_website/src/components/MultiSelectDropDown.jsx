import { useRef, useState, useEffect } from 'react';

import Checkbox from './Checkbox'

function MultiSelectDropDown({ btnTxt, filterKey, checkboxes, onChangeValue }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isChecked, setIsChecked] = useState(
    checkboxes.reduce((acc, checkbox) => {
      acc[checkbox.id] = false;
      return acc;
    }, {})
  );
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

  const handleCheckboxChange = (checked, id) => {
    const updatedCheckbox = {
      ...isChecked,
      [id]: checked,
    };

    setIsChecked(updatedCheckbox);
    onChangeValue?.({ [filterKey]: updatedCheckbox });
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
        onClick={() => {
          setShowDropdown((prev) => !prev);
        }}
      >
        {btnTxt}
      </button>
      <div
        className={
          showDropdown ? 'filter-btn-popup is-open' : 'filter-btn-popup'
        }
        style={{
          display: showDropdown ? 'flex' : 'none',
          alignItems: 'center',
          gap: '15px'
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            position: 'relative' 
          }}
        >
          {checkboxes.map((checkbox) => (
            <Checkbox
              id={checkbox?.id}
              label_name={checkbox?.label_name}
              onChangeValue={
                (checked, id) => handleCheckboxChange(checked, id)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MultiSelectDropDown;
