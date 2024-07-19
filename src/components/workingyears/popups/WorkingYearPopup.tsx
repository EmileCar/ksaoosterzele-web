import { useEffect } from "react";
import { usePopupContext } from "../../../contexts/PopupContext";
import useForm from "../../../hooks/useForm";
import { sendWorkingYear } from "../../../services/workingYearService";
import WorkingYear, { SendWorkingYear } from "../../../types/WorkingYear";
import Button from "../../button/Button";
import Form from "../../form/Form";
import Group from "../../form/Group";
import Input from "../../form/Input";
import Label from "../../form/Label";
import Popup from "../../popup/Popup";

const WorkingYearPopup = ({ workingYear, onClose } : { workingYear?: WorkingYear, onClose: () => void }) => {
    const { values, errorStates, handleValueChange, changeValue, handleSubmitForm, submitPending } = useForm<SendWorkingYear>(new SendWorkingYear(workingYear || {}), sendWorkingYear);
	const { closePopup } = usePopupContext();

    const handleSubmit = async () => {
        await handleSubmitForm(workingYear ? 'PUT' : 'POST', () => {
            onClose();
            closePopup();
        });
    }

    useEffect(() => {
        if(!values?.startYear) {
            const startYear = new Date().getFullYear();
            changeValue("startYear", startYear);
        } else {
            const startYearNumber = Number(values.startYear);
            const name = `Werkjaar ${startYearNumber}-${startYearNumber + 1}`;
            changeValue("name", name);
        }
    }, [values.startYear]);

    return (
        <Popup title={workingYear ? `${workingYear.name || ""} aanpassen` : "Nieuw werkjaar"}>
            {!workingYear &&
                <>
                    <p>Ben je er zeker van dat je een nieuw werkjaar wilt starten?</p>
                    <p>Dit betekent dat alle inschrijvingen van het huidige werkjaar worden afgesloten en de leiding zal opnieuw gelinkt moeten worden aan een tak in dit werkjaar.</p>
                    <div style={{margin: "var(--s0) 0"}}>
                        <p><strong>Deze gegevens zullen niet meer aangepast kunnen worden na creatie</strong></p>
                        <p>Bepaal het startjaar en de naam zal automatisch gegenereerd worden</p>
                    </div>
                </>
            }
            <div className="error">{errorStates.general}</div>
            <Form disabled={submitPending}>
                <Group>
                    <Label text="Startjaar" errorMessage={errorStates.startYearError}>
                        <Input type={"number"} name="startYear" value={values.startYear} onChange={handleValueChange} />
                    </Label>
                    <Label text="Naam" errorMessage={errorStates.nameError}>
                        <Input type={"text"} name="name" value={values.name} onChange={handleValueChange} focus placeholder="Werkjaar 20xx-20xx" disabled/>
                    </Label>
                </Group>
                <Button text="Opslaan" onClick={handleSubmit} pending={submitPending} />
            </Form>
        </Popup>
    );
};

export default WorkingYearPopup;