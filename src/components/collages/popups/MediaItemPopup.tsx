import { useEffect, useState, useRef } from "react";
import Popup from "../../popup/Popup";
import Collage, { SendCollage } from "../../../types/Collage";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import Button from "../../button/Button";
import Label from "../../form/Label";
import Input from "../../form/Input";
import useForm from "../../../hooks/useForm";
import { formatDateToInputDateTime } from "../../../utils/datetimeUtil";
import Checkbox from "../../form/Checkbox";
import { getCollageTypes, sendCollage } from "../../../services/mediaService";
import CollageType from "../../../types/CollageType";
import AutoComplete from "../../form/AutoComplete";

const MediaItemPopup = ({ collage, onClose } : { collage?: Collage | null | undefined, onClose: () => void }) => {
    const { values, errorStates, setErrors, handleValueChange, changeValue } = useForm<SendCollage>(new SendCollage(collage || {}));
    const [isPending, setIsPending] = useState<boolean>(false);
    const [collageTypes, setCollageTypes] = useState<CollageType[]>([]);
    const [filteredTypes, setFilteredTypes] = useState<string[]>([]);

    const handleSubmitForm = async () => {
        setIsPending(true);
        setErrors(null);
        await sendCollage(values, collage ? "PUT" : "POST").then(() => {
            setIsPending(false);
            onClose();
        }).catch((errors: any) => {
            setTimeout(() => {
                let errorfields = errors.errorFields ?? {};
                setErrors(errorfields);
                setIsPending(false);
            }, 800)
        });
    }

    const handleCalendarChange = (e: any) => {
        const date = new Date(e.target.value);
        changeValue("date", date);
    }

    const search = async (e: any) => {
        const allTypes = await getCollageTypes();
        const allTypeNames = allTypes.map((type : CollageType) => type.name);
        setFilteredTypes(e.query ? allTypeNames.filter(type => type.toLowerCase().includes(e.query.toLowerCase())) : allTypeNames);
    }

    useEffect(() => {
        console.log(values)
    } , [values])
0
    return (
		<Popup title={collage ? `${collage.name} aanpassen` : "Nieuwe collage"} onClose={onClose}>
            <FetchedDataLayout isPending={isPending} error={errorStates.general}>
                <form className="collageForm form">
                    <div className="form-group">
                        <Label text="Naam" errorMessage={errorStates.nameError}>
                            <Input type={"text"} name="name" value={values.name} onChange={handleValueChange} focus />
                        </Label>
                        <Label text="Datum" errorMessage={errorStates.dateError}>
                            <Input type={"date"} name="date" value={formatDateToInputDateTime(values.date as Date)} onChange={handleCalendarChange}/>
                        </Label>
                    </div>
                    <div className="form-group">
                        <Label text="Hoort bij welke type(s)?" errorMessage={errorStates.typesError}>
                            <AutoComplete value={values.types} suggestions={filteredTypes} completeMethod={search} onChange={handleValueChange} name="types" />
                        </Label>
                        <Label text="Tonen?" customClassName="flex-column">
                            <Checkbox name="active" checked={values.active} onChange={(e) => changeValue("active", e.target.checked)} />
                        </Label>
                    </div>
                    <Label text="Beschrijving" errorMessage={errorStates.descriptionError} customClassName="flex-column">
                        <textarea
                            className="input"
                            onChange={handleValueChange}
                            name="description"
                            value={values.description}
                        />
                    </Label>
                    <Button text="Opslaan" onClick={handleSubmitForm} darken uppercase/>
                </form>
            </FetchedDataLayout>
        </Popup>
	)
};

export default MediaItemPopup;