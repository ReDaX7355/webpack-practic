import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

interface SerachParametersProps {
  clearSearch: () => void;
}

const SearchParameters: FC<SerachParametersProps> = ({ clearSearch }) => {
  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get('search');

  return (
    <div className="h-5 mt-4 flex items-center gap-3 text-sm">
      {searchParam && (
        <>
          <p>
            Результаты поиска: <b>{searchParam}</b>
          </p>
          <button
            onClick={clearSearch}
            className="py-1 px-2 bg-primary text-white rounded"
          >
            Очистить
          </button>
        </>
      )}
    </div>
  );
};

export default SearchParameters;
