import React, { useState } from "react";
import './Registrations.css';
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import useFetch from "../../../hooks/useFetch";
import { getRegistrations } from "../../../services/registrationService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { MultiSelect } from "primereact/multiselect";
import { formatDateTime } from "../../../utils/datetimeUtil";
import Registration from "../../../types/Registration";
import { exportToExcel } from "../../../utils/exportToExcel";
import Input from "../../../components/form/Input";
import Form from "../../../components/form/Form";
import Button from "../../../components/button/Button";
import RegistrationPopup from "../../../components/inschrijven/popups/RegistrationPopup";
import { usePopupContext } from "../../../contexts/PopupContext";

const RegistrationsAdmin = () => {
    const { pending, data: registrations, error, refetch } = useFetch(getRegistrations);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        tak: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [visibleColumns, setVisibleColumns] = useState<{ field: string; header: string; }[]>([]);
    const { registerPopup } = usePopupContext();

    const extraColumns = [
        { field: 'birthdate', header: 'Geboortedatum' },
        { field: 'address', header: 'Straat + Nr' },
        { field: 'town', header: 'Gemeente' },
        { field: 'email', header: 'Email' },
        { field: 'phoneNumber', header: 'Gsm' },
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
            <Form customClassName="registrationstable-header">
                <span className="p-input-icon-left">
                    <Input type="name" name="search" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Zoeken..." />
                </span>
                <MultiSelect placeholder="Selecteer opties" value={visibleColumns} options={extraColumns} optionLabel="header" onChange={onColumnToggle} className="input" display="chip" />
                <span className="exportToExcel__container">
                    <Button text="" onClick={() => exportToExcel(registrations!, "inschrijvingen")} />
                    <span>Exporteer naar Excel</span>
                </span>
            </Form>
        );
    };

    const createdAtBodyTemplate = (rowData: Registration) => {
        const formattedDateTime = formatDateTime(rowData.createdAt);
        return (
            <div className="flex align-items-center gap-2">
                <span>{formattedDateTime}</span>
            </div>
        );
    };

    const openRegistrationPopup = (registration: Registration) => {
        registerPopup(<RegistrationPopup registration={registration} onClose={refetch} />);
    };

    return (
        <>
            <SectionTitle title="Inschrijvingen beheren">
                <p>Hier kun je inschrijvingen zien en aanpassen. Verwijderen kan niet, daarvoor moet je Emile contacteren.</p>
            </SectionTitle>
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
                    onSelectionChange={(e) => openRegistrationPopup(e.value)}
                >
                    <Column field="firstName" header="Voornaam" sortable></Column>
                    <Column field="lastName" header="Achternaam" sortable></Column>
                    <Column field="group.name" header="Tak" sortable></Column>
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