/* eslint-disable react/no-array-index-key */

import React from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from './ui/pagination';

interface Props {
  totalPages: number;
  page: number;
  handlePageChange: (newPage: number) => void;
  handlePreviousClick: () => void;
  handleNextClick: () => void;
}

const OrdersPagination = ({ handlePageChange, handlePreviousClick, page, totalPages, handleNextClick }: Props) => {
  return (
    <div>
      <Pagination>
        <PaginationContent>
          {/* Previous button */}
          <PaginationItem>
            <PaginationPrevious onClick={handlePreviousClick} className="cursor-pointer" />
          </PaginationItem>

          {/* Page numbers */}
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => handlePageChange(index + 1)}
                isActive={index + 1 === page}
                className="cursor-pointer"
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Pagination ellipsis (if applicable) */}
          {page < totalPages - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Next button */}
          <PaginationItem>
            <PaginationNext onClick={handleNextClick} className="cursor-pointer" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default OrdersPagination;
