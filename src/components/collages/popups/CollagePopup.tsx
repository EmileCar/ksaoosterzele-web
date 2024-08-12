import { useEffect, useState } from "react";
import Popup from "../../popup/Popup";
import Collage, { SendCollage } from "../../../types/Collage";
import Button from "../../button/Button";
import Label from "../../form/Label";
import Input from "../../form/Input";
import useForm from "../../../hooks/useForm";
import { formatDateToInputDate } from "../../../utils/datetimeUtil";
import Checkbox from "../../form/Checkbox";
import { getCollageTypes, sendCollage } from "../../../services/mediaService";
import CollageType from "../../../types/CollageType";
import AutoComplete, { AutoCompleteOption } from "../../form/AutoComplete";
import Form from "../../form/Form";
import Group from "../../form/Group";
import useFetch from "../../../hooks/useFetch";
import { usePopupContext } from "../../../contexts/PopupContext";

const CollagePopup = ({ collage, onClose } : { collage?: Collage | null | undefined, onClose: () => void }) => {
    const { values, errorStates, handleValueChange, changeValue, handleSubmitForm, submitPending } = useForm<SendCollage>(new SendCollage(collage || {}), sendCollage);
    const { data: fetchedCollageTypes } = useFetch<CollageType[]>(getCollageTypes);
    const [ collageTypes, setCollageTypes ] = useState<AutoCompleteOption[]>([]);
    const { closePopup } = usePopupContext();

    const handleCalendarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!value) {
            changeValue("date", null);
            return;
        }
        const datetime = new Date(value);
        changeValue("date", datetime);
    };

    const handleSubmit = async () => {
        await handleSubmitForm(collage ? 'PUT' : 'POST', () => {
            onClose();
            closePopup();
        });
    }

    useEffect(() => {
        if (fetchedCollageTypes) {
            setCollageTypes(fetchedCollageTypes.map(type => ({ value: type.id ?? "", label: type.name })));
        }
    } , [fetchedCollageTypes]);

    return (
		<Popup title={collage ? `${collage.displayName} aanpassen` : "Nieuwe collage"}>
            {errorStates.general && <div className="error">{errorStates.general}</div>}
            <Form disabled={submitPending}>
                <Group>
                    <Label text="Naam" errorMessage={errorStates.nameError}>
                        <Input type="text" name="name" value={values.name} onChange={handleValueChange} focus />
                    </Label>
                    <Label text="Datum" errorMessage={errorStates.dateError}>
                        <Input type="date" name="date" value={formatDateToInputDate(values.date)} onChange={handleCalendarChange}/>
                    </Label>
                </Group>
                <Group>
                    <Label text="Hoort bij welke type(s)?" errorMessage={errorStates.typesError}>
                        <AutoComplete
                            name="types"
                            value={values.types}
                            onChange={handleValueChange}
                            suggestions={collageTypes}
                            dropdown
                            multiple
                        />
                    </Label>
                    <Label text="Tonen?">
                        <Checkbox name="active" checked={values.active} onChange={(e) => changeValue("active", e.target.checked)} />
                    </Label>
                </Group>
                <Label text="Beschrijving" errorMessage={errorStates.descriptionError} customClassName="flex-column">
                    <textarea
                        className="input"
                        onChange={handleValueChange}
                        name="description"
                        value={values.description ?? ""}
                    />
                </Label>
                <Button pending={submitPending} text="Opslaan" onClick={handleSubmit} darken uppercase/>
            </Form>
        </Popup>
	)
};

export default CollagePopup;