import { useNavigate } from "react-router-dom";
import Button from "../../../components/button/Button";
import InvoicePopup from "../../../components/invoices/popups/InvoicePopup";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import { useAccountContext } from "../../../contexts/AccountContext";
import { usePopupContext } from "../../../contexts/PopupContext";
import useFetch from "../../../hooks/useFetch";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import { getInvoiceSummary } from "../../../services/invoiceService";
import { InvoiceSummary } from "../../../types/Invoice";
import { formatCustomDate, formatDateToDate } from "../../../utils/datetimeUtil";
import "./Rekeningen.css";

const Rekeningen = () => {
    const { pending, data: invoices, error, refetch } = useFetch<InvoiceSummary[]>(getInvoiceSummary);
    const { account } = useAccountContext();
    const { registerPopup } = usePopupContext();
    const navigate = useNavigate();

    const openInvoicePopup = () => {
        registerPopup(<InvoicePopup onClose={refetch} />);
    }

    return (
        <>
            <SectionTitle title="Rekeningen beheren">
                <p>Beheer hier de rekeningen van de leiding.</p>
                <p>Klik op een persoon om details te zien over zijn historiek.</p>
            </SectionTitle>
            {account?.role.id === 2 &&
                <div className="admin__actions">
                    <Button text="Transactie toevoegen" hover onClick={openInvoicePopup} />
                </div>
            }
            <FetchedDataLayout isPending={pending} error={error}>
                {invoices && invoices.length === 0 && (
                    <p>Geen rekeningen gevonden.</p>
                )}
                {invoices && invoices.length > 0 && (
                    <table className="invoices-table" style={account?.role.id !== 2 ? { pointerEvents: 'none' } : {}}>
                        <thead>
                            <tr>
                                <th>Naam leider</th>
                                <th>Huidig saldo</th>
                                <th>Recentste transactie</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((invoice: InvoiceSummary) => (
                                <tr key={invoice.firstName + invoice.lastName} onClick={() => navigate(`/admin/rekeningen/leider/${invoice.leaderId}`)}>
                                    <td className="invoice-name">{invoice.firstName} {invoice.lastName}</td>
                                    <td className="invoice-amount">€ {invoice.totalGrossAmount || 0}</td>
                                    <td>{invoice.mostRecentInvoice ? `${formatDateToDate(invoice.mostRecentInvoice.createdAt)} - ${invoice.mostRecentInvoice.name}` : "/"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </FetchedDataLayout>
        </>
    );
};

export default Rekeningen;