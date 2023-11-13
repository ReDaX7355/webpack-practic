import React, { FC, FormEvent, useState } from 'react';

interface SearchBarProps {
  searchFunction: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = React.memo(({ searchFunction }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    searchFunction(searchValue);
    setSearchValue('');
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className="flex items-center">
        <input
          type="text"
          placeholder="Поиск"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="px-3 py-1.5 rounded-l border-y-2 border-l-2 outline-none border-transparent focus:border-primary w-[100%] max-w-[500px]"
        />
        <button className="p-1.5 bg-primary rounded-r border-2 border-primary hover:border-agree hover:bg-agree trandition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </form>
    </>
  );
});

export default SearchBar;
