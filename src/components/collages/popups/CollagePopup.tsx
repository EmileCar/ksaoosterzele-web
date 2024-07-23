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
import AutoComplete from "../../form/AutoComplete";
import Form from "../../form/Form";
import Group from "../../form/Group";
import useFetch from "../../../hooks/useFetch";
import { usePopupContext } from "../../../contexts/PopupContext";

const CollagePopup = ({ collage, onClose } : { collage?: Collage | null | undefined, onClose: () => void }) => {
    const { values, errorStates, handleValueChange, changeValue, handleSubmitForm, submitPending } = useForm<SendCollage>(new SendCollage(collage || {}), sendCollage);
    const { data: collageTypes } = useFetch<CollageType[]>(getCollageTypes);
    const [filteredTypes, setFilteredTypes] = useState<string[]>([]);
    const { closePopup } = usePopupContext();

    useEffect(() => {
        if (collageTypes) {
            search({ query: "" });
        }
    } , [collageTypes])

    const search = async (e: any) => {
        if (!collageTypes) return;
        const allTypeNames = collageTypes.map((type : CollageType) => type.name);
        setFilteredTypes(e.query ? allTypeNames.filter(type => type.toLowerCase().includes(e.query.toLowerCase())) : allTypeNames);
    }

    const handleSubmit = async () => {
        console.log(values);
        await handleSubmitForm(collage ? 'PUT' : 'POST', () => {
            onClose();
            closePopup();
        });
    }

    return (
		<Popup title={collage ? `${collage.displayName} aanpassen` : "Nieuwe collage"}>
            {errorStates.general && <div className="error">{errorStates.general}</div>}
            <Form disabled={submitPending}>
                <Group>
                    <Label text="Naam" errorMessage={errorStates.nameError}>
                        <Input type="text" name="name" value={values.name} onChange={handleValueChange} focus />
                    </Label>
                    <Label text="Datum" errorMessage={errorStates.dateError}>
                        <Input type="date" name="date" value={values.date.toString()} onChange={handleValueChange}/>
                    </Label>
                </Group>
                <Group>
                    <Label text="Hoort bij welke type(s)?" errorMessage={errorStates.typesError}>
                        <AutoComplete value={values.types} suggestions={filteredTypes} completeMethod={search} onChange={handleValueChange} name="types" dropdown multiple/>
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