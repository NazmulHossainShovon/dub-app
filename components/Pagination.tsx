'use client';

import React from 'react';
import ReactPaginate from 'react-paginate';

import PaginationNext from './PaginationNext';
import PaginationPrevious from './PaginationPrevious';

type PageClickEvent = {
  selected: number;
};

type Props = {
  totalPages: number;
  handlePageClick: (event: PageClickEvent) => void;
};

const Pagination = ({ handlePageClick, totalPages }: Props) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<PaginationNext />}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      onPageChange={handlePageClick}
      previousLabel={<PaginationPrevious />}
      renderOnZeroPageCount={null}
      containerClassName="flex text-sm md:text-[14px] gap-2 cursor-pointer"
      activeClassName=" bg-[#324057] text-white"
      pageClassName="px-3 py-1 md:py-2 h-fit rounded-lg text-[#2B2D2F] hover:bg-[#324057] hover:text-white transition-colors"
      previousClassName="pr-3 py-0 md:py-2 h-fit rounded-lg "
      nextClassName="pl-3 py-0 md:py-2 h-fit rounded-lg "
      disabledClassName="opacity-40 cursor-not-allowed"
      disabledLinkClassName="cursor-not-allowed"
      nextAriaLabel="Go to next page"
      previousAriaLabel="Go to previous page"
      ariaLabelBuilder={page => `Go to page ${page}`}
      prevRel="prev"
      nextRel="next"
      extraAriaContext="pagination navigation"
    />
  );
};

export default Pagination;
