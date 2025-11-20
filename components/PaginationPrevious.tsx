import { ArrowLeft } from "lucide-react";
import React from "react";

const PaginationPrevious = () => {
  return (
    <>
      <ArrowLeft
        className=" block md:hidden"
        aria-label="Previous page"
        role="button"
      />
      <span
        className=" hidden md:block"
        aria-label="Previous page"
        role="button"
      >
        Previous
      </span>
    </>
  );
};

export default PaginationPrevious;
