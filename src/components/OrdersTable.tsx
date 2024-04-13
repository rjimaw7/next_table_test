/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import { useDebounce } from '@uidotdev/usehooks';
import React, { useMemo, useState } from 'react';

import { useService } from '@/hooks/use-service';
import { DUMMY_DATA } from '@/lib/constants/DUMMY_DATA';
import type { PatientData } from '@/lib/interfaces';

import OrderRecord from './OrderRecord';
import OrdersLimit from './OrdersLimit';
import OrdersPagination from './OrdersPagination';
import OrdersSkeleton from './OrdersSkeleton';
import OrdersTableHeader from './OrdersTableHeader';
import SearchOrder from './SearchOrder';
import { Skeleton } from './ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const OrdersTable = () => {
  // LOCAL STATE
  const [showExactMatchesOnly, setShowExactMatchesOnly] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState<{ [key: string]: string }>({});

  // CONSTANTS
  const skeletonArray = Array.from({ length: 10 });
  const skeletonArrayHeader = Array.from({ length: 7 });

  //   HOOKS
  const { getOrders } = useService();
  const debouncedSearchQuery = useDebounce(searchQuery, 700);

  const {
    data: ordersData,
    isLoading: ordersDataLoading,
    isFetching: ordersDataFetching
  } = getOrders(
    {
      searchQuery: debouncedSearchQuery,
      page,
      limit,
      sort: sort || null
    },
    showExactMatchesOnly
  );

  const ordersDataMemo = useMemo(() => ordersData?.data ?? [], [ordersData?.data]);
  const ordersDataTotal = useMemo(() => ordersData?.total ?? 0, [ordersData?.total]);

  const totalPages = useMemo(() => Math.ceil(ordersDataTotal / limit), [ordersDataTotal, limit]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handlePreviousClick = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextClick = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Function to toggle sorting order
  const toggleSort = (column: string) => {
    setSort({
      [column]: sort[column] === 'asc' ? 'desc' : 'asc'
    });
  };

  return (
    <section id="orders" className="container mx-auto py-4">
      <SearchOrder
        ordersDataLoading={ordersDataLoading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setShowExactMatchesOnly={setShowExactMatchesOnly}
        showExactMatchesOnly={showExactMatchesOnly}
      />

      <Table>
        <TableHeader>
          <TableRow>
            {ordersDataLoading || ordersDataFetching ? (
              skeletonArrayHeader.map((_, cellIndex) => (
                <TableHead key={cellIndex} className="text-[#3798dc]">
                  <Skeleton className="h-4 w-[150px]" />
                </TableHead>
              ))
            ) : (
              <>
                <OrdersTableHeader label="ID" column="id" sort={sort} toggleSort={toggleSort} />
                <OrdersTableHeader label="Date" column="date" sort={sort} toggleSort={toggleSort} />
                <OrdersTableHeader label="Patient Name" column="patient_name" sort={sort} toggleSort={toggleSort} />
                <OrdersTableHeader label="Doctor Name" column="doctor_name" sort={sort} toggleSort={toggleSort} />
                <OrdersTableHeader label="Patient Phone" column="patient_phone" sort={sort} toggleSort={toggleSort} />
                <OrdersTableHeader label="Doctor Phone" column="doctor_phone" sort={sort} toggleSort={toggleSort} />
                <OrdersTableHeader label="Status" column="status" sort={sort} toggleSort={toggleSort} />
              </>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {ordersDataLoading || ordersDataFetching ? (
            skeletonArray.map((_, rowIndex) => <OrdersSkeleton key={rowIndex} />)
          ) : ordersDataMemo && ordersDataMemo.length === 0 ? (
            <TableRow>
              <TableCell colSpan={Object.keys(DUMMY_DATA).length}>
                <p className="text-center text-xl">No Records Found</p>
              </TableCell>
            </TableRow>
          ) : (
            ordersDataMemo.map((row: PatientData, index: number) => <OrderRecord row={row} key={index} index={index} />)
          )}
        </TableBody>
      </Table>

      {(!ordersDataLoading || !ordersDataFetching) && (
        <>
          <OrdersLimit limit={limit} page={page} setLimit={setLimit} totalPages={totalPages} />
          <OrdersPagination
            handleNextClick={handleNextClick}
            handlePageChange={handlePageChange}
            handlePreviousClick={handlePreviousClick}
            page={page}
            totalPages={totalPages}
          />
        </>
      )}
    </section>
  );
};

export default OrdersTable;
