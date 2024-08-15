import Invoice from '../../../types/Invoice';
import { formatDateTime } from '../../../utils/datetimeUtil';
import Popup from '../../popup/Popup';

const InvoiceDetailPopup = ({ invoice, onClose, name } : { invoice: Invoice, onClose: () => void, name: string }) => {
    return (
        <Popup title={`Transactie detail`}>
            <p>Deze transactie is gemaakt voor <strong>{name}</strong></p>
            <div className='invoice-details'>
                <div className="invoice-detail-row">
                    <span className="invoice-detail-label">Naam:</span>
                    <span className="invoice-detail-value">{invoice.name}</span>
                </div>
                <div className="invoice-detail-row">
                    <span className="invoice-detail-label">Bedrag:</span>
                    <span className="invoice-detail-value">€ {invoice.amount}</span>
                </div>
                <div className="invoice-detail-row">
                    <span className="invoice-detail-label">Opmerkingen:</span>
                    <span className="invoice-detail-value">{invoice.remarks ?? '/'}</span>
                </div>
                <div className="invoice-detail-row">
                    <span className="invoice-detail-label">Gemaakt op:</span>
                    <span className="invoice-detail-value">{formatDateTime(invoice.createdAt)}</span>
                </div>
                <div className="invoice-detail-row">
                    <span className="invoice-detail-label">Bijgewerkt op:</span>
                    <span className="invoice-detail-value">{formatDateTime(invoice.updatedAt)}</span>
                </div>
            </div>
        </Popup>
    );
};

export default InvoiceDetailPopup;