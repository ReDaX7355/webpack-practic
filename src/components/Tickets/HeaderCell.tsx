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
    <div
      className="flex space-between"
      data-name={data_name}
      onClick={(e) => sortFunction(e)}
    >
      {title}
    </div>
  );
};

export default HeaderCell;
