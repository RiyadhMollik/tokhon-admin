import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const maxButtons = 10;

  let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let end = start + maxButtons - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxButtons + 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(
      <button
        key={i}
        className={`px-3 py-1 rounded ${
          i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex justify-center mt-6 items-center gap-2 flex-wrap">
      {/* Previous Button */}
      <button
        className={`px-3 py-1 rounded ${
          currentPage === 1 ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pages}

      {/* Show ellipsis + last page if not already shown */}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="px-2 text-gray-500">...</span>
          )}
          <button
            className={`px-3 py-1 rounded ${
              currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            }`}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        className={`px-3 py-1 rounded ${
          currentPage === totalPages ? 'bg-gray-300 text-black' : 'bg-blue-500 text-white'
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
