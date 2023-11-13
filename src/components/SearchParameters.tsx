import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

interface SerachParametersProps {
  clearSearch: () => void;
}

const SerachParameters: FC<SerachParametersProps> = ({ clearSearch }) => {
  const [searchParams] = useSearchParams();
  const searching = searchParams.get('search');

  return (
    <div>
      <p>Результаты поиска: {searching}</p>
      <button onClick={clearSearch}>Очистить</button>
    </div>
  );
};

export default SerachParameters;
