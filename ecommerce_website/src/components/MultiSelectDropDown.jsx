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
    <div className="filter-catagory-container">
      <h5> {btnTxt} </h5>
        <div className="checkbox-list">
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
  );
}

export default MultiSelectDropDown;
