import { useState } from 'react';

import PriceRangeFilter from './PriceRangeFilter'
import MultiSelectDropDown from './MultiSelectDropDown'

function FilterSideBar({ numProducts, onFilterChange, onDropDownSelect }) {
    const [selectedValue, setSelectedValue] = useState('');
    const [filters, setFilters] = useState({
        "availability": {
            "in-stock": false,
            "out-of-stock": false,
            "preorder": false
        },
        "price": {
            "min": '',
            "max": '' 
        },
        "category": {
            "category-1": false,
            "category-2": false,
        }
    });

    // Callback functions
    const handleDropdownChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        onDropDownSelect(value);
    };
    const handleFilterChange = (nextRange) => {
        setFilters((prevFilters) => {
            const nextFilters = { ...prevFilters };
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
        <>
        <div id="filter-bar-vertical">
            {/* <div style={{ display: 'flex', gap: '20px' }}> */}
                {/* TODO: Make into a sidebar thats fixed that the top */}
                    {/* <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}> */}
                    <b><h4>Filter:</h4></b>
                    <PriceRangeFilter onChangeValue={handleFilterChange} />
                    <MultiSelectDropDown
                        btnTxt="Category"
                        filterKey="category"
                        checkboxes={[
                        {
                            "id": "category-1",
                            "label_name": "Category 1",
                        },
                        {
                            "id": "category-2",
                            "label_name": "Category 2",
                        }
                        ]}
                        onChangeValue={handleFilterChange}
                    />
                    <MultiSelectDropDown
                        btnTxt="Availability"
                        filterKey="availability"
                        checkboxes={[
                        {
                            "id": "in-stock",
                            "label_name": "In Stock",
                        },
                        {
                            "id": "out-of-stock",
                            "label_name": "Out of Stock",
                        },
                        {
                            "id": "preorder",
                            "label_name": "Preorder",
                        }
                        ]}
                        onChangeValue={handleFilterChange}
                    />
                {/* </div> */}
            {/* </div> */}
        </div>
        </>
    );
}

export default FilterSideBar;
