/* eslint-disable react/no-array-index-key */
import React from 'react';

import { DUMMY_DATA } from '@/lib/constants/DUMMY_DATA';

import { Skeleton } from './ui/skeleton';
import { TableCell, TableRow } from './ui/table';

const OrdersSkeleton = () => {
  return (
    <TableRow>
      {Object.keys(DUMMY_DATA).map((_key, cellIndex) => (
        <TableCell key={cellIndex}>
          <Skeleton className="h-4 w-[150px]" />
        </TableCell>
      ))}
    </TableRow>
  );
};

export default OrdersSkeleton;
