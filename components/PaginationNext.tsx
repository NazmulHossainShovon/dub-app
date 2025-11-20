import { ArrowRight } from "lucide-react";
import React from "react";

const PaginationNext = () => {
  return (
    <>
      <ArrowRight
        className=" block md:hidden"
        aria-label="Next page"
        role="button"
      />
      <span className=" hidden md:block" aria-label="Next page" role="button">
        Next
      </span>
    </>
  );
};

export default PaginationNext;
