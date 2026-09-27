import { useState } from 'react';
import { createFilters, createCheckboxes } from '../utils/Common.utils'
import { SORT_BY, AVAILABILITY, PRODUCT_CATEGORY } from '../constants'

import DropDownInput from './DropDownInput'
import PriceRangeFilter from './PriceRangeFilter'
import MultiSelectDropDown from './MultiSelectDropDown'

function FilterBar({ onFilterChange }) {
    const [filters, setFilters] = useState({
        'sort_by': Object.values(SORT_BY)[0],
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
        <div id="filter-bar" className="flex-col">
            <b><h4>Filter</h4></b>
            <div id="filter-container" className="flex-col">
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
