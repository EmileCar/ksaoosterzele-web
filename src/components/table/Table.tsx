import React, { ReactNode, useEffect, useState } from 'react';
import './Table.css';
import { Paginator } from './Paginator';
import { Column, ColumnProps } from './Column';
import Form from '../form/Form';
import Label from '../form/Label';
import Input from '../form/Input';
import Button from '../button/Button';
import { exportToExcel as exportToExcelFunction } from '../../utils/exportToExcel';

interface TableProps<T> {
    values: T[];
    children: ReactNode;
    rows?: number;
    responsiveLayout?: 'stack' | 'scroll';
    className?: string;
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
    globalSearchFunction?: (value: string) => T[];
    exportToExcel?: boolean; // Fixed typo from 'exortToExcel' to 'exportToExcel'
}

export const Table = <T,>({
    values,
    children,
    rows = 10,
    responsiveLayout = 'stack',
    className = '',
    onRowClick,
    emptyMessage = 'Geen data gevonden',
    globalSearchFunction,
    exportToExcel, // Changed the name to match the interface
}: TableProps<T>) => {
    const [page, setPage] = useState(0);
    const [sortField, setSortField] = useState<keyof T | string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [paginatedData, setPaginatedData] = useState<T[]>([]);
    const [filteredData, setFilteredData] = useState<T[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [globalSearchValue, setGlobalSearchValue] = useState('');

    const sortData = (data: T[]) => {
        if (!sortField) return data;

        const columns = React.Children.toArray(children).filter((child): child is React.ReactElement<ColumnProps<T>> =>
            React.isValidElement(child) && child.type === Column
        );
        const column = columns.find(col => col.props.field === sortField);

        if (column && column.props.sortFunction) {
            return [...data].sort((a, b) => column.props.sortFunction!(a, b, sortDirection));
        }

        return [...data].sort((a, b) => {
            const valueA = (a as any)[sortField];
            const valueB = (b as any)[sortField];

            if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    };

    useEffect(() => {
        const totalPages = Math.ceil(filteredData.length / rows);
        setTotalPages(totalPages);
        const start = page * rows;
        const end = start + rows;
        const sortedData = sortData(filteredData);
        const paginatedData = sortedData.slice(start, end);
        setPaginatedData(paginatedData);
    }, [sortField, sortDirection, filteredData, rows, page]);

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

    useEffect(() => {
        if (globalSearchFunction) {
            const filtered = globalSearchFunction(globalSearchValue);
            setPage(0);
            setFilteredData(filtered);
        } else {
            setFilteredData(values);
        }
    }, [globalSearchValue, values, globalSearchFunction]);

    const renderColumns = () => {
        return React.Children.map(children, (child, index) => {
            if (React.isValidElement(child) && child.type === Column) {
                const { field, header, sortable } = child.props;
                const isSortable = sortable;
                const handleClick = isSortable ? () => handleSort(field) : undefined;
                const sortIndicator = sortField === field ? (sortDirection === 'asc' ? '▲' : '▼') : '';

                return (
                    <th key={index} className={isSortable ? 'sortable' : ''} onClick={handleClick}>
                        {header}
                        {isSortable && (
                            <span className="sort-indicator">
                                {sortIndicator}
                            </span>
                        )}
                    </th>
                );
            }
            return null;
        });
    };

    const renderRows = () => {
        if (paginatedData.length === 0) {
            return (
                <tr>
                    <td colSpan={React.Children.count(children)} className="empty-message">
                        {emptyMessage}
                    </td>
                </tr>
            );
        }

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
        <>
            {(globalSearchFunction || exportToExcel) && (
                <Form customClassName="registrationstable-header">
                    {globalSearchFunction && (
                        <Label text="Zoeken">
                            <Input 
                                type="text"
                                name="search"
                                value={globalSearchValue}
                                onChange={(e) => setGlobalSearchValue(e.target.value)}
                                placeholder="Zoeken..."
                            />
                        </Label>
                    )}
                    {exportToExcel && (
                        <span className="exportToExcel__container">
                            <Button
                                icon="pi-file-export"
                                customClassName="exportToExcel__button"
                                darken
                                onClick={() => exportToExcelFunction(filteredData, "inschrijvingen")}
                            />
                            <span onClick={() => exportToExcelFunction(filteredData, "inschrijvingen")}>Exporteer naar Excel</span>
                        </span>
                    )}
                </Form>
            )}
            <div className={`${responsiveLayout} ${className} table-container`}>
                <table className='table'>
                    <thead>
                        <tr>{renderColumns()}</tr>
                    </thead>
                    <tbody>{renderRows()}</tbody>
                </table>
                <Paginator totalPages={totalPages} currentPage={page} onPageChange={setPage} />
            </div>
        </>
    );
};