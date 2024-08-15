import React from 'react';
import Button from '../button/Button';

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

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="paginator">
            <Button
                onClick={handlePrev}
                disabled={currentPage === 0}
                darken
                text='<'
            />
            <span>{`Pagina ${currentPage + 1} van de ${totalPages}`}</span>
            <Button
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
                aria-label="Next Page"
                darken
                text='>'
            />
        </div>
    );
};
