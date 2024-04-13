import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react';

import { TableHead } from './ui/table';

interface Props {
  label: string;
  column: string;
  sort: {
    [key: string]: string;
  };
  toggleSort: (column: string) => void;
}

const OrdersTableHeader: React.FC<Props> = ({ label, column, sort, toggleSort }) => (
  <TableHead className="w-32 cursor-pointer text-[#3798dc]" onClick={() => toggleSort(column)}>
    <div className="flex items-center gap-1">
      <p>{label}</p>
      {sort &&
        sort[column] &&
        (sort[column] === 'asc' ? <ChevronUp strokeWidth={2.75} /> : <ChevronDown strokeWidth={2.75} />)}
    </div>
  </TableHead>
);

export default OrdersTableHeader;
