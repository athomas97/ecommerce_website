import { useState } from 'react';
import { formatNameToId } from '/src/utils/Common.utils'

function DropDownInput({
    label_text,
    options,
    onChangeValue,
}) {
    const [selectedValue, setSelectedValue] = useState('');

    // Callback function
    const handleDropdownChange = (event) => {
        const value = event.target.value;
        const nextValue = { sort_by: value };
        setSelectedValue(value);
        onChangeValue(nextValue);
    };

    return (
        <div className="flex-col filter-category-container">
            <h5>{label_text}</h5>
            <select
                id={formatNameToId(label_text)}
                name={formatNameToId(label_text)}
                value={selectedValue}
                onChange={handleDropdownChange}
            >
                {Object.values(options).map((dropdownOption) => (
                    <option
                        key={dropdownOption}
                        value={formatNameToId(dropdownOption)}
                    >
                        {dropdownOption}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DropDownInput;
