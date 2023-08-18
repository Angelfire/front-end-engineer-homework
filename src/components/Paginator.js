import React from "react";
import PropTypes from "prop-types";

/**
 * Generate an array of page numbers for pagination.
 *
 * @param {number} totalPages - The total number of pages.
 * @returns {number[]} An array of page numbers.
 */
const generatePageNumbers = (totalPages) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = generatePageNumbers(totalPages);

  return (
    <nav aria-label="Page navigation" className="d-flex justify-content-center mt-5">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => onPageChange(number)}
              className={`page-link ${number === currentPage ? "active" : ""}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Paginator.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Paginator;
