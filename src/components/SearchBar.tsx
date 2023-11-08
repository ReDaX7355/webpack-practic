import React, { FC, useState } from 'react';

interface SearchBarProps {
  searchFunction: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ searchFunction }) => {
  const [searchValue, setSearchValue] = useState('');
  const handleSubmit = () => {
    searchFunction(searchValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Поиск"
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
