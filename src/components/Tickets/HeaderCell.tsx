import React, { FC, MouseEvent } from 'react';

interface HeaderCellProps {
  title: string;
  data_name: string;
  sortFunction: (e: MouseEvent) => void;
}

const HeaderCell: FC<HeaderCellProps> = ({
  title,
  data_name,
  sortFunction,
}) => {
  return (
    <th
      className="flex justify-between items-center"
      data-name={data_name}
      onClick={(e) => sortFunction(e)}
    >
      {title}
      <span>
        <svg
          className="h-5 w-5 text-black-400"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          {' '}
          <path stroke="none" d="M0 0h24v24H0z" />{' '}
          <path d="M3 9l4-4l4 4m-4 -4v14" />{' '}
          <path d="M21 15l-4 4l-4-4m4 4v-14" />
        </svg>
      </span>
    </th>
  );
};

export default HeaderCell;
