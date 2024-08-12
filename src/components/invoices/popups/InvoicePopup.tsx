import useForm from "../../../hooks/useForm";
import Popup from "../../popup/Popup";
import Label from "../../form/Label";
import Input from "../../form/Input";
import Button from "../../button/Button";
import Form from "../../form/Form";
import Group from "../../form/Group";
import AutoComplete, { AutoCompleteOption } from "../../form/AutoComplete";
import { usePopupContext } from "../../../contexts/PopupContext";
import Invoice, { SendInvoice } from "../../../types/Invoice";
import { sendInvoice } from "../../../services/invoiceService";
import useFetch from "../../../hooks/useFetch";
import { getLeaders } from "../../../services/leaderService";
import { useEffect, useMemo, useState } from "react";

const InvoicePopup = ({ invoice, onClose } : { invoice?: Invoice | null | undefined, onClose: () => void }) => {
    const { values, errorStates, handleValueChange, changeValue, handleSubmitForm, submitPending } = useForm<SendInvoice>(new SendInvoice(invoice || {}), sendInvoice);
    const { pending, data: fetchedLeaders, error } = useFetch<{ id: number, name: string }[]>(getLeaders);
    const { closePopup } = usePopupContext();

    const leaderSuggestions = useMemo(() => {
        return fetchedLeaders ? fetchedLeaders.map(leader => ({ value: leader.id, label: leader.name })) : [];
    }, [fetchedLeaders]);

    const handleSubmit = async () => {
        await handleSubmitForm(invoice ? 'PUT' : 'POST', () => {
            onClose();
            closePopup();
        });
    }

    console.log(fetchedLeaders)

    return (
        <Popup title={invoice ? `${invoice.name} aanpassen` : "Nieuwe transactie"}>
            <Form disabled={submitPending}>
                <Group>
                    <Label text="Leider" errorMessage={errorStates.leaderError}>
                        <AutoComplete
                            name="leaderId"
                            value={values.leaderId}
                            onChange={handleValueChange}
                            suggestions={fetchedLeaders ? fetchedLeaders.map(leader => ({ value: leader.id, label: leader.name })) : null}
                            dropdown
                        />
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