import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ICONS } from '/src/constants'

function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeSearch = searchParams.get('search') ?? '';
  const [query, setQuery] = useState(activeSearch);

  useEffect(() => {
    setQuery(activeSearch);
  }, [activeSearch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const search = query.trim();
    navigate(search ? `/catalog?search=${encodeURIComponent(search)}` : '/catalog');
  };

  return (
    <form id="search-bar" onSubmit={handleSubmit}>
      <input
        type="search"
        id="search"
        name="search"
        placeholder="Search products"
        aria-label="Search products"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="submit" aria-label="Search">
        <img src={ICONS.SEARCH} alt="" />
      </button>
    </form>
  );
}

export default SearchBar;