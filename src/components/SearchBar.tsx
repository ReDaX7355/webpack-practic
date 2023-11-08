import React, { FC, FormEvent, useState } from 'react';

interface SearchBarProps {
  searchFunction: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = React.memo(({ searchFunction }) => {
  const [searchValue, setSearchValue] = useState('');
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    searchFunction(searchValue);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="search"
        placeholder="Поиск"
        onChange={(e) => setSearchValue(e.target.value)}
        className="px-3 py-2"
      />
    </form>
  );
});

export default SearchBar;
