import { useRef, useState } from 'react';

function PriceInput({ label_text, onChangeValue }) {
  const [showInput, setShowInput] = useState(false);
  const [price, setPrice] = useState('');
  const inputRef = useRef(null);

  const handleContainerBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      if (price.trim() === '') {
        setShowInput(false);
      } else {
        setShowInput(true);
      }
    }
  };

  const openInput = () => {
    setShowInput(true);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', width: '100%' }}>
      <label htmlFor="min-price">$ </label>
      <div
        className={showInput ? 'price-input-container is-open' : 'price-input-container'}
        tabIndex={0}
        onClick={openInput}
        onBlur={handleContainerBlur}
      >
        <p>{label_text}</p>
        <input
          ref={inputRef}
          type="number"
          id="min-price"
          name="min-price"
          step="0.01"
          inputmode="decimal"
          value={price}
          onChange={(event) => {
            setPrice(event.target.value);
            onChangeValue(event.target.value);
          }}
          onFocus={() => setShowInput(true)}
          onBlur={() => {
            if (price.trim() === '') {
              setShowInput(false);
            } else {
              setShowInput(true);
            }
          }}
          style={{ display: showInput ? 'block' : 'none' }}
        />
      </div>
    </div>
  );
}

export default PriceInput;
