import React, { ReactNode, useState } from 'react';
import './Table.css';
import { Paginator } from './Paginator';
import { Column } from './Column';

interface TableProps<T> {
    values: T[];
    children: ReactNode;
    rows?: number;
    responsiveLayout?: 'stack' | 'scroll';
    className?: string;
    onRowClick?: (row: T) => void;
}

export const Table = <T,>({ values, children, rows = 10, responsiveLayout = 'stack', className = '', onRowClick }: TableProps<T>) => {
    const [page, setPage] = useState(0);
    const [sortField, setSortField] = useState<keyof T | string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const totalPages = Math.ceil(values.length / rows);
    const start = page * rows;
    const end = start + rows;

    const sortData = (data: T[]) => {
        if (!sortField) return data;

        return [...data].sort((a, b) => {
            const valueA = (a as any)[sortField];
            const valueB = (b as any)[sortField];

            if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const sortedData = sortData(values);
    const paginatedData = sortedData.slice(start, end);

    const handleSort = (field: keyof T | string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleRowClick = (row: T) => {
        if (onRowClick) {
            onRowClick(row);
        }
    };

    const renderColumns = () => {
        return React.Children.map(children, (child, index) => {
            if (React.isValidElement(child) && child.type === Column) {
                const { field, header, sortable } = child.props;
                const isSortable = sortable;
                const handleClick = isSortable ? () => handleSort(field) : undefined;
                const sortIndicator = sortField === field ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : '';

                return (
                    <th key={index} className={isSortable ? 'sortable' : ''} onClick={handleClick}>
                        {header}{isSortable && sortIndicator}
                    </th>
                );
            }
            return null;
        });
    };

    const renderRows = () => {
        return paginatedData.map((row, rowIndex) => (
            <tr
                key={rowIndex}
                onClick={() => handleRowClick(row)}
                className={onRowClick ? 'hoverable' : ''}
            >
                {React.Children.map(children, (child, colIndex) => {
                    if (React.isValidElement(child) && child.type === Column) {
                        const { field, body } = child.props;
                        const fieldValue = field ? (row as any)[field] : undefined;

                        return (
                            <td key={colIndex}>
                                {body ? body(row, fieldValue) : fieldValue}
                            </td>
                        );
                    }
                    return null;
                })}
            </tr>
        ));
    };

    return (
        <div className={`${responsiveLayout} ${className}`}>
            <table className='table'>
                <thead>
                    <tr>{renderColumns()}</tr>
                </thead>
                <tbody>{renderRows()}</tbody>
            </table>
            <Paginator totalPages={totalPages} currentPage={page} onPageChange={setPage} />
        </div>
    );
};
