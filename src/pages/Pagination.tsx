import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const generatePages = () => {
    const pages = [];
    const ellipsis = '...';

    if (totalPages <= 5) {
      // If total pages are 5 or fewer, show all pages
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show the first two pages
      pages.push(1);
      if (currentPage > 3) pages.push(ellipsis);

      // Show current page and its neighbors
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (i > 1 && i < totalPages) pages.push(i);
      }

      // Add ellipsis if necessary
      if (currentPage < totalPages - 2) pages.push(ellipsis);

      // Always show the last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handleClick = (page) => {
    if (page !== '...' && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="mt-4 flex justify-center">
      <button
        className={`mx-1 px-3 py-1 border rounded ${
          currentPage === 1 ? 'bg-gray-400 text-white' : 'bg-gray-200 text-black'
        }`}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {generatePages().map((page, index) => (
        <button
          key={index}
          className={`mx-1 px-3 py-1 border rounded ${
            page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
          }`}
          onClick={() => handleClick(page)}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}

      <button
        className={`mx-1 px-3 py-1 border rounded ${
          currentPage === totalPages ? 'bg-gray-400 text-white' : 'bg-gray-200 text-black'
        }`}
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
