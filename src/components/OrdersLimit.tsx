import React from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Props {
  page: number;
  totalPages: number;
  limit: number;
  setLimit: (value: React.SetStateAction<number>) => void;
}

const OrdersLimit = ({ limit, page, setLimit, totalPages }: Props) => {
  return (
    <div className="my-6 flex items-center justify-center gap-2 text-sm">
      <div>
        <p>
          Page <span className="font-bold">{page}</span> of {totalPages}
        </p>
      </div>
      <div className="h-5 border border-gray-500" />
      <Select value={String(limit)} onValueChange={(value) => setLimit(Number(value))}>
        Show{' '}
        <SelectTrigger className="w-[60px]">
          <SelectValue>{limit}</SelectValue>
        </SelectTrigger>{' '}
        records per page
        <SelectContent>
          {[10, 20, 30, 40, 50].map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default OrdersLimit;
