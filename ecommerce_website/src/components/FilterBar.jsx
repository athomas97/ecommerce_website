import { useState } from 'react';

import PriceRangeFilter from './PriceRangeFilter'
import MultiSelectDropDown from './MultiSelectDropDown'

function FilterBar({ numProducts, onFilterChange, onDropDownSelect }) {
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
        <div id="filter-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <p>Filter:</p>
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
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <p>Sort By:</p>
                <label for="sort_by"></label>
                <select id="sort_by" name="sort_by" value={selectedValue} onChange={handleDropdownChange}>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="price_low_to_high">Price: Low to High</option>
                    <option value="price_high_to_low">Price: High to Low</option>
                </select>
            </div>
            <p>{numProducts} Products</p>
        </div>
        </>
    );
}

export default FilterBar;
