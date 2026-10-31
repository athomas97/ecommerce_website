import { useState, useEffect } from 'react';
import { createFilters, createCheckboxes } from '../utils/Common.utils'
import { SORT_BY, AVAILABILITY, PRODUCT_CATEGORY } from '../constants'
import { ICONS } from '/src/constants'

import SearchBar from './SearchBar'
import DropDownInput from './DropDownInput'
import PriceRangeFilter from './PriceRangeFilter'
import MultiSelectDropDown from './MultiSelectDropDown'

function FilterBar({ onFilterChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({
        'sort_by': Object.values(SORT_BY)[0],
        "name": '',
        "availability": createFilters(AVAILABILITY),
        "price": {
            "min": '',
            "max": '' 
        },
        "category": createFilters(PRODUCT_CATEGORY),
    });

    // Callback functions
    const handleFilterChange = (nextRange) => {
        setFilters((prevFilters) => {
            const nextFilters = { ...prevFilters };
            if (nextRange.sort_by) {
                nextFilters.sort_by = nextRange.sort_by;
            }
            if (nextRange.name !== undefined) {
                nextFilters.name = nextRange.name;
            }
            // TODO: Handles errors if availability is not a valid type
            if (nextRange.availability) {
                nextFilters.availability = {
                    ...prevFilters.availability,
                    ...nextRange.availability,
                };
            }
            if (nextRange.price) {
                nextFilters.price = {
                    ...prevFilters.price,
                    ...nextRange.price,
                };
            }
            // TODO: Handles errors if category is not a valid type
            if (nextRange.category) {
                nextFilters.category = {
                    ...prevFilters.category,
                    ...nextRange.category,
                };
            }
            return nextFilters;
        });
        onFilterChange?.(nextRange);
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
        <div id="filter-bar" className="flex-col">
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
                <SearchBar
                    value={filters.name}
                    onSearchChange={(name) => handleFilterChange({ name })}
                />
                <DropDownInput
                    label_text="Sort By"
                    options={SORT_BY}
                    onChangeValue={handleFilterChange}
                />
                <PriceRangeFilter
                    onChangeValue={handleFilterChange}
                />
                <MultiSelectDropDown
                    btnTxt="Category"
                    filterKey="category"
                    checkboxes={createCheckboxes(PRODUCT_CATEGORY)}
                    onChangeValue={handleFilterChange}
                />
                <MultiSelectDropDown
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
