
import React, { useState } from 'react';
import "./SearchBar.css";

const SearchBar = () => {
  const [ searchContext, setSearchContext ] = useState("")

  return (
    <div id="navbar-search-bar">
      <input
        className="search-bar"
        placeholder='Search feature coming soon'
        value={searchContext}
        onChange={e => setSearchContext(e.target.value)}>
      </input>
      <i id='search-icon' class="fa-solid fa-magnifying-glass"></i>
    </div>
  )
};

export default SearchBar;
