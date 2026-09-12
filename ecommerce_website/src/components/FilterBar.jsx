import { useState } from 'react';
import { createFilters, createCheckboxes } from '../utils/Common.utils'
import { AVAILABILITY, PRODUCT_CATEGORY } from '../constants'

import PriceRangeFilter from './PriceRangeFilter'
import MultiSelectDropDown from './MultiSelectDropDown'

function FilterBar({ onFilterChange }) {
    const [selectedValue, setSelectedValue] = useState('');
    const [filters, setFilters] = useState({
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

    return (
        // TODO: Make filter bar sticky to the top
        <div
            id="filter-bar"
            className="flex-col"
        >
            <b><h4>Filter:</h4></b>
            <PriceRangeFilter onChangeValue={handleFilterChange} />
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
    );
}

export default FilterBar;
