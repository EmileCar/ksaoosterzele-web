import React from 'react';

interface PaginatorProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export const Paginator: React.FC<PaginatorProps> = ({ totalPages, currentPage, onPageChange }) => {
    const handlePrev = () => {
        if (currentPage > 0) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
    };

    return (
        <div className="paginator">
            <button onClick={handlePrev} disabled={currentPage === 0}>
                Prev
            </button>
            <span>{`Page ${currentPage + 1} of ${totalPages}`}</span>
            <button onClick={handleNext} disabled={currentPage === totalPages - 1}>
                Next
            </button>
        </div>
    );
};
