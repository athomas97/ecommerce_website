import { useState } from 'react';

function Checkbox({  id, label_name, onChangeValue }) {
  const [isChecked, setIsChecked] = useState({ 
    id: {id}, state: false });

  return (
    <div>
      <label
        className="checkbox-container"
        for={id}
      >
        <input
          type="checkbox"
          id={id}
          name={id}
          value={label_name}
          checked={isChecked.state} 
          onChange={(event) => {
            setIsChecked({
              id: id,
              state: event.target.checked
            });
            onChangeValue(event.target.checked, id);
          }}
        />
        {label_name}
      </label>
    </div>
  );
}

export default Checkbox;
