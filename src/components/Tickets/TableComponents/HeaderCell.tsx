import React, { FC, MouseEvent, ReactNode, useState } from 'react';

interface HeaderCellProps {
  children: ReactNode;
  data_name: string;
  sortFunction?: (e: MouseEvent) => void;
}

const HeaderCell: FC<HeaderCellProps> = ({
  children,
  data_name,
  sortFunction,
}) => {
  const [order, setOrder] = useState('');

  const sortByTitle = (e: MouseEvent) => {
    sortFunction?.(e);
    order == 'asc' ? setOrder('desc') : setOrder('asc');
  };

  return (
    <th className="" data-name={data_name} onClick={(e) => sortByTitle(e)}>
      <div className="flex justify-between items-center">
        <p>{children}</p>

        {sortFunction &&
          (!order ? (
            <svg
              className="h-4 w-4 text-white"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {' '}
              <path stroke="none" d="M0 0h24v24H0z" />{' '}
              <path d="M3 9l4-4l4 4m-4 -4v14" />{' '}
              <path d="M21 15l-4 4l-4-4m4 4v-14" />
            </svg>
          ) : order == 'desc' ? (
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
          ) : (
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
              />
            </svg>
          ))}
      </div>
    </th>
  );
};

export default HeaderCell;
