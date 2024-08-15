import { useState, useEffect } from "react";
import './Registrations.css';
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import useFetch from "../../../hooks/useFetch";
import { getRegistrations } from "../../../services/registrationService";
import { formatDateTime } from "../../../utils/datetimeUtil";
import Registration from "../../../types/Registration";
import { exportToExcel } from "../../../utils/exportToExcel";
import Input from "../../../components/form/Input";
import Form from "../../../components/form/Form";
import Button from "../../../components/button/Button";
import RegistrationPopup from "../../../components/inschrijven/popups/RegistrationPopup";
import { usePopupContext } from "../../../contexts/PopupContext";
import { Table } from "../../../components/table/Table";
import { Column } from "../../../components/table/Column";
import Label from "../../../components/form/Label";

const RegistrationsAdmin = () => {
    const { pending, data: registrations, error, refetch } = useFetch(getRegistrations);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [visibleColumns, setVisibleColumns] = useState<{ field: string; header: string; }[]>([]);
    const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
    const { registerPopup } = usePopupContext();

    useEffect(() => {
        if (!registrations) {
            setFilteredRegistrations([]);
            return;
        }

        const lowerCaseFilter = globalFilterValue.toLowerCase();

        const filtered = registrations.filter((registration) => 
            registration.firstName.toLowerCase().includes(lowerCaseFilter) || 
            registration.lastName.toLowerCase().includes(lowerCaseFilter)
        );

        setFilteredRegistrations(filtered);
    }, [globalFilterValue, registrations]);

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
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
                <Form customClassName="registrationstable-header">
                    <Label text="Zoeken">
                        <Input type="text" name="search" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Zoeken..." />
                    </Label>

                    <span className="exportToExcel__container">
                        <Button
                            icon="pi-file-export"
                            customClassName="exportToExcel__button"
                            darken
                            onClick={() => exportToExcel(filteredRegistrations, "inschrijvingen")}
                        />
                        <span onClick={() => exportToExcel(filteredRegistrations, "inschrijvingen")}>Exporteer naar Excel</span>
                    </span>
                </Form>
                <Table
                    values={filteredRegistrations}
                    rows={20}
                    emptyMessage={(registrations && registrations.length > 0)? 'Geen inschrijvingen gevonden' : 'Geen data gevonden'}
                    onRowClick={(registration: Registration) => openRegistrationPopup(registration)}
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