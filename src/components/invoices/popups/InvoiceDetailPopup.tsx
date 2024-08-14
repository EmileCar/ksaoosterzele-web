import Invoice from '../../../types/Invoice';
import Popup from '../../popup/Popup';

const InvoiceDetailPopup = ({ invoice, onClose } : { invoice?: Invoice | null | undefined, onClose: () => void }) => {
    return (
        <Popup title={`Transactie detail`}>
            {/* <p>Deze transactie is voor leider {invoice?.leaderId.firstName} {invoice?.leader.lastName}.</p> */}
            <div>
                <p>Naam transactie: <strong>{invoice?.name}</strong></p>
                <p>Bedrag: <strong>€ {invoice?.amount}</strong></p>
                <p>Opmerkingen: {invoice?.remarks}</p>
            </div>
        </Popup>
    );
};

export default InvoiceDetailPopup;