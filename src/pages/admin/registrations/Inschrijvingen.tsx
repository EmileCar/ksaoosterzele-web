import React, { useEffect, useState } from "react";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import useFetch from "../../../hooks/useFetch";
import { getRegistrations } from "../../../services/registrationService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { formatDatabaseDateTime } from "../../../utils/datetimeUtil";
import Registration from "../../../types/Registration";
import { exportToExcel } from "../../../utils/exportToExcel";

const RegistrationsAdmin = () => {
    const { pending, data: registrations, error, refetch } = useFetch(getRegistrations);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        tak: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [selectedRow, setSelectedRow] = useState<Registration | null>(null);
    const [visibleColumns, setVisibleColumns] = useState<{ field: string; header: string; }[]>([]);

    const extraColumns = [
        { field: 'geboortedatum', header: 'Geboortedatum' },
        { field: 'straatEnHuisnummer', header: 'Straat + Nr' },
        { field: 'gemeente', header: 'Gemeente' },
        { field: 'email', header: 'Email' },
        { field: 'gsmNummer', header: 'Gsm' },
    ];

    const onColumnToggle = (e: any) => {
        let orderedSelectedColumns = extraColumns.filter((col) => e.value.some((sCol: any) => sCol.field === col.field));
        setVisibleColumns(orderedSelectedColumns);
    };

    const onGlobalFilterChange = (e: any) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end gap">
                <span className="p-input-icon-left">
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Zoeken..." />
                </span>
                <MultiSelect placeholder="Selecteer opties" value={visibleColumns} options={extraColumns} optionLabel="header" onChange={onColumnToggle} className="w-full sm:w-20rem" display="chip" />
                <span className="exportToExcel__container">
                    <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={() => exportToExcel(registrations!, "inschrijvingen")} data-pr-tooltip="XLS" />
                    <span>Exporteer naar Excel</span>
                </span>
            </div>
        );
    };

    const createdAtBodyTemplate = (rowData: any) => {
        const formattedDateTime = formatDatabaseDateTime(rowData.created_at);
        return (
            <div className="flex align-items-center gap-2">
                <span>{formattedDateTime}</span>
            </div>
        );
    };

    return (
        <>
            <div className="admin__top">
                <SectionTitle title="Inschrijvingen beheren">
                    <p>Hier kun je inschrijvingen zien en aanpassen. Verwijderen kan niet, daarvoor moet je Emile contacteren.</p>
                </SectionTitle>
            </div>
            <FetchedDataLayout isPending={pending} error={error}>
                <DataTable
                    value={registrations || []}
                    header={renderHeader}
                    paginator rows={20}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    sortMode="multiple"
                    removableSort
                    filters={filters}
                    emptyMessage="Er zijn nog geen inschrijvingen"
                    selectionMode="single"
                    onSelectionChange={(e) => setSelectedRow(e.value as Registration | null)}
                >
                    <Column field="voornaam" header="Voornaam" sortable></Column>
                    <Column field="achternaam" header="Achternaam" sortable></Column>
                    <Column field="tak" header="Tak" sortable></Column>
                    {visibleColumns.map((col) => (
                        <Column key={col.field} field={col.field} header={col.header} sortable />
                    ))}
                    <Column field="created_at" body={createdAtBodyTemplate} header="Ingeschreven op" sortable></Column>
                </DataTable>
            </FetchedDataLayout>
        </>
    );
}

export default RegistrationsAdmin;