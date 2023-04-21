
import React, { useState } from 'react';
import "./SearchBar.css";

const SearchBar = () => {
  const [ searchContext, setSearchContext ] = useState("")

  return (
    <input
      className="search-bar"
      placeholder='Search for works by name, artist or year'
      value={searchContext}
      onChange={e => setSearchContext(e.target.value)}>
    </input>
  )
};

export default SearchBar;
