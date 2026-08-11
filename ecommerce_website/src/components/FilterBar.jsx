import { useState } from 'react';

function FilterBar({ numProducts, onDropDownSelect }) {
    const [selectedValue, setSelectedValue] = useState('');

    // Callback functions
    const handleDropdownChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        onDropDownSelect(value);
    };

    return (
        <>
        <div id="filter-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <p>Filter:</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <p>Sort By:</p>
                <label for="sort_by"></label>
                <select id="sort_by" name="sort_by" value={selectedValue} onChange={handleDropdownChange}>
                    <option value="newest">
                        Newest
                    </option>
                    <option value="oldest">
                        Oldest
                    </option>
                    <option value="price_low_to_high">
                        Price: Low to High
                    </option>
                    <option value="price_high_to_low">
                        Price: High to Low
                    </option>
                </select>
            </div>
            <p>{numProducts} Products</p>
        </div>
        </>
    );
}

export default FilterBar;
