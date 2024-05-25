import React from 'react';

const Pagination = ({ postsPerPage, length, handlePagination, currentPage }: { postsPerPage: number, length: number, handlePagination: (pageNumber: number) => void, currentPage: number }) => {
    let paginationNumber = [];
    for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
        paginationNumber.push(i);
    }

    return (
        <div className='flex justify-center items-center space-x-2 mt-4'>
            <button
                onClick={() => handlePagination(currentPage > 1 ? currentPage - 1 : 1)}
                className={`px-3 py-1 rounded-full ${currentPage === 1 ? 'bg-gray-300 text-white cursor-not-allowed' : 'bg-white text-black border hover:bg-gray-200'}`}
                disabled={currentPage === 1}
            >
            {"<"}
            </button>
            {paginationNumber.map((pageNumber: number) => (
                <button
                    key={pageNumber}
                    onClick={() => handlePagination(pageNumber)}
                    className={`px-3 py-1 rounded-full ${currentPage === pageNumber ? 'bg-blue-400 text-white' : 'bg-white text-black border hover:bg-gray-200'}`}
                >
                    {pageNumber}
                </button>
            ))}
            <button
                onClick={() => handlePagination(currentPage < paginationNumber.length ? currentPage + 1 : paginationNumber.length)}
                className={`px-3 py-1 rounded-full ${currentPage === paginationNumber.length ? 'bg-gray-300 text-white cursor-not-allowed' : 'bg-white text-black border hover:bg-gray-200'}`}
                disabled={currentPage === paginationNumber.length}
            >
                {">"}
            </button>
        </div>
    )
}

export default Pagination;
