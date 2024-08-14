import React from 'react';

export interface ColumnProps<T> {
    field: keyof T | string;
    header: string;
    body?: (rowData: T, fieldValue: any) => React.ReactNode;
    sortable?: boolean;
    sortFunction?: (a: T, b: T, sortDirection: 'asc' | 'desc') => number;
}

export const Column = <T,>({ field, header, body, sortable, sortFunction }: ColumnProps<T>) => {
    return null;
}
