import { useState } from "react";
import './Registrations.css';
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import useFetch from "../../../hooks/useFetch";
import { getRegistrations } from "../../../services/registrationService";
import { formatDateTime } from "../../../utils/datetimeUtil";
import Registration from "../../../types/Registration";
import RegistrationPopup from "../../../components/inschrijven/popups/RegistrationPopup";
import { usePopupContext } from "../../../contexts/PopupContext";
import { Table } from "../../../components/table/Table";
import { Column } from "../../../components/table/Column";

const RegistrationsAdmin = () => {
    const { pending, data: registrations, error, refetch } = useFetch(getRegistrations);
    const [visibleColumns, setVisibleColumns] = useState<{ field: string; header: string; }[]>([]);
    const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
    const { registerPopup } = usePopupContext();

    const searchFunction = (value: string) => {
        if (!registrations) return [];

        return registrations.filter((registration) => {
            return (
                registration.firstName.toLowerCase().includes(value.toLowerCase()) ||
                registration.lastName.toLowerCase().includes(value.toLowerCase())
            );
        });
    }

    const openRegistrationPopup = (registration: Registration) => {
        registerPopup(<RegistrationPopup registration={registration} onClose={refetch} />);
    };

    return (
        <>
            <SectionTitle title="Inschrijvingen beheren">
                <p>Hier kun je inschrijvingen zien en aanpassen. Verwijderen kan niet, daarvoor moet je Emile contacteren.</p>
            </SectionTitle>
            <FetchedDataLayout isPending={pending} error={error}>
                <Table
                    values={filteredRegistrations}
                    rows={20}
                    emptyMessage={(registrations && registrations.length > 0)? 'Geen inschrijvingen gevonden' : 'Geen data gevonden'}
                    onRowClick={(registration: Registration) => openRegistrationPopup(registration)}
                    globalSearchFunction={searchFunction}
                    exportToExcel
                >
                    <Column field="firstName" header="Voornaam" sortable></Column>
                    <Column field="lastName" header="Achternaam" sortable></Column>
                    <Column field="group.name" header="Tak" sortable body={(rowData: Registration) => rowData.group && rowData.group.name}></Column>
                    {visibleColumns.map((col) => (
                        <Column key={col.field} field={col.field} header={col.header} sortable />
                    ))}
                    <Column field="created_at" header="Ingeschreven op" sortable body={(rowData: Registration) => formatDateTime(rowData.createdAt)}></Column>
                </Table>
            </FetchedDataLayout>
        </>
    );
}

export default RegistrationsAdmin;