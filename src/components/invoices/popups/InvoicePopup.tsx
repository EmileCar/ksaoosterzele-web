import useForm from "../../../hooks/useForm";
import Popup from "../../popup/Popup";
import Label from "../../form/Label";
import Input from "../../form/Input";
import Button from "../../button/Button";
import Form from "../../form/Form";
import Group from "../../form/Group";
import AutoComplete from "../../form/AutoComplete";
import { usePopupContext } from "../../../contexts/PopupContext";
import Invoice, { SendInvoice } from "../../../types/Invoice";
import { sendInvoice } from "../../../services/invoiceService";

const InvoicePopup = ({ invoice, onClose } : { invoice?: Invoice | null | undefined, onClose: () => void }) => {
    const { values, errorStates, handleValueChange, changeValue, handleSubmitForm, submitPending } = useForm<SendInvoice>(new SendInvoice(invoice || {}), sendInvoice);
	const { closePopup } = usePopupContext();

    const handleSubmit = async () => {
        await handleSubmitForm(invoice ? 'PUT' : 'POST', () => {
            onClose();
            closePopup();
        });
    }

    return (
        <Popup title={invoice ? `${invoice.name} aanpassen` : "Nieuwe transactie"}>
            <Form disabled={submitPending}>
                <Group>
                    <Label text="Leider" errorMessage={errorStates.leaderError}>
                        {/* <AutoComplete name="leader" value={values.leaderId} onChange={handleValueChange} suggestions={imagePaths} completeMethod={search} /> */}
                    </Label>
                    <Label text="Amount" errorMessage={errorStates.amountError}>
                        <Input name="amount" type="number" value={values.amount} onChange={handleValueChange} step={0.50}  />
                    </Label>
                </Group>
                
                <Button text="Opslaan" onClick={handleSubmit} darken uppercase pending={submitPending}/>
            </Form>
        </Popup>
    )
};

export default InvoicePopup;