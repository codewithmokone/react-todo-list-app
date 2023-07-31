import React, { useState } from 'react';
import { AiOutlineSearch} from 'react-icons/ai'

const Search = ({ onSearch }) => {
  const [clear, setClear] = useState(false);
  const [searchBar, setSearchBar] = useState('');

  const handleSearch = () => {
    let searchInputValue = document.getElementById('searchInput').value

    if (searchInputValue.trim() !== '') {
      onSearch(searchInputValue);
      setClear(true);
      
    }
    setSearchBar('');
  };

  return (
    <div className='search-section'>
      <input type="text" name='searchInput' id="searchInput" value={searchBar} onChange={(e) => setSearchBar(e.target.value)} placeholder='Search task'/>
      <span><AiOutlineSearch className="searcn-btn" onClick={handleSearch} /></span>
    </div>
  );
};

export default Search;