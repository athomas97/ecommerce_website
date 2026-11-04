import { useState, useEffect } from 'react';
import { createCheckboxes, createFilters } from '../utils/Common.utils'
import { SORT_BY, AVAILABILITY, PRODUCT_CATEGORY } from '../constants'
import { ICONS } from '/src/constants'

import DropDownInput from './DropDownInput'
import PriceRangeFilter from './PriceRangeFilter'
import MultiSelectDropDown from './MultiSelectDropDown'

function FilterBar({ onFilterChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [resetKey, setResetKey] = useState(0);

    // Callback functions
    const handleFilterChange = (nextRange) => {
        onFilterChange?.(nextRange);
    };

    const handleResetFilters = () => {
        onFilterChange?.({
            sort_by: Object.values(SORT_BY)[0].toLowerCase(),
            price: { min: '', max: '' },
            category: createFilters(PRODUCT_CATEGORY),
            availability: createFilters(AVAILABILITY),
        });
        setResetKey((key) => key + 1);
    };

    const handleOpenFilterBar = (value) => {
        setIsOpen(value);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 900) {
                setIsOpen(false);
            } else {
                setIsOpen(true); 
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener(
            'resize', handleResize
        );
    }, []);

    return (
        <div id="filter-bar">
            <h4 className="filter-title"><b>Filter</b></h4>
            <div
                className="filter-title filter-btn secondary-btn"
                onClick={(event) => handleOpenFilterBar(true)}
            >
                <h4><b>Filter</b></h4>
                <img id="menu-icon" src={ICONS.MENU}/>
            </div>
            <div
                id="filter-container"
                className={isOpen === true ? "flex-col is_open" : "flex-col"}
            >
                <div className="filter-bar-header">
                    <h4
                        id="close-icon"
                        className="icon-hover"
                        onClick={(event) => handleOpenFilterBar(false)}
                    >
                        X
                    </h4>
                    <h2 className="align-txt-left"><b>Filter</b></h2>
                </div>
                <h5
                    className="red-underline-text product-clickable-area align-txt-left"
                    onClick={handleResetFilters}
                >
                    Clear Filters
                </h5>
                <DropDownInput
                    key={`sort-${resetKey}`}
                    label_text="Sort By"
                    options={SORT_BY}
                    onChangeValue={handleFilterChange}
                />
                <PriceRangeFilter
                    key={`price-${resetKey}`}
                    onChangeValue={handleFilterChange}
                />
                <MultiSelectDropDown
                    key={`category-${resetKey}`}
                    btnTxt="Category"
                    filterKey="category"
                    checkboxes={createCheckboxes(PRODUCT_CATEGORY)}
                    onChangeValue={handleFilterChange}
                />
                <MultiSelectDropDown
                    key={`availability-${resetKey}`}
                    btnTxt="Availability"
                    filterKey="availability"
                    checkboxes={createCheckboxes(AVAILABILITY)}
                    onChangeValue={handleFilterChange}
                />
            </div>
        </div>
    );
}

export default FilterBar;
