import React from 'react';

interface ColumnProps<T> {
    field: keyof T | string;
    header: string;
    body?: (rowData: T, fieldValue: any) => React.ReactNode;
    sortable?: boolean;
}

export const Column = <T,>({ field, header, body, sortable }: ColumnProps<T>) => {
    return null;
}
