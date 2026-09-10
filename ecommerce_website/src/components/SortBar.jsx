import { useState } from 'react';

function SortBar({ numProducts, onDropDownSelect }) {
    const [selectedValue, setSelectedValue] = useState('');

    // Callback function
    const handleDropdownChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        onDropDownSelect(value);
    };

    return (
        <div id="sorting-bar">
            <div id="sort-by-wrapper">
                <b><p>Sort By:</p></b>
                <label for="sort_by"></label>
                <select
                    id="sort_by"
                    name="sort_by"
                    value={selectedValue}
                    onChange={handleDropdownChange}
                >
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
            <i><p id="product-number">{numProducts} Products</p></i>
        </div>
    );
}

export default SortBar;
