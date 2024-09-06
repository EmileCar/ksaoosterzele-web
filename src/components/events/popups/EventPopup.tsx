import { useState } from "react";
import Event, { SendEvent } from "../../../types/Event";
import useForm from "../../../hooks/useForm";
import { formatDateToInputDateTime, isDateTimeInPast } from "../../../utils/datetimeUtil";
import Popup from "../../popup/Popup";
import Label from "../../form/Label";
import Input from "../../form/Input";
import { sendEvent } from "../../../services/eventService";
import Checkbox from "../../form/Checkbox";
import Button from "../../button/Button";
import Form from "../../form/Form";
import Group from "../../form/Group";
import { usePopupContext } from "../../../contexts/PopupContext";
import ImageUploader from "../../form/ImageUploader";
import { uploadImage } from "../../../services/imageuploadService";

const EventPopup = ({ event, onClose } : { event?: Event | null | undefined, onClose: () => void }) => {
    const { values, errorStates, handleValueChange, changeValue, handleSubmitForm, submitPending, setErrors } = useForm<SendEvent>(new SendEvent(event || {}), sendEvent);
    const [ imageFile, setImageFile ] = useState<File | null>(null);
	const { closePopup } = usePopupContext();

    const handleCalendarChange = (e: any) => {
        const datetime = new Date(e.target.value);
        changeValue("datetime", datetime);
    }

    const handleSubmit = async () => {
        if (imageFile) {
            const formData = new FormData();
            formData.append('image', imageFile);
            formData.append('folder', 'events');

            await uploadImage(formData)
                .catch((error) => {
                    setErrors({ imgpathError: error.message });
                    return;
            });
        }

        await handleSubmitForm(event ? 'PUT' : 'POST', () => {
            onClose();
            closePopup();
        });
    }

    return (
        <Popup title={event ? `${event.name} aanpassen` : "Nieuw evenement"}>
            {isDateTimeInPast(values.datetime as Date) && (<p className="error" style={{ marginBottom: "1rem" }}>Dit evenement is in het verleden</p>)}
            <Form disabled={submitPending}>
                <Group>
                    <Label text="Naam" errorMessage={errorStates.nameError}>
                        <Input type={"text"} name="name" value={values.name} onChange={handleValueChange} focus />
                    </Label>
                    <Label text="Locatie" errorMessage={errorStates.locationError}>
                        <Input type={"text"} name="location" value={values.location} onChange={handleValueChange}/>
                    </Label>
                </Group>
                <Group>
                    <Label text="Afbeelding" errorMessage={errorStates.imgpathError}>
                        <ImageUploader
                            existingImagePath={values.imageFileName}
                            destination="events"
                            onImageSelect={(file) => {setImageFile(file); changeValue("imageFileName", file?.name)}}
                        />
                    </Label>
                    <Label text="Datum & tijd" errorMessage={errorStates.datetimeError}>
                        <Input name="datetime" type="datetime-local" value={formatDateToInputDateTime(values.datetime as Date)} onChange={handleCalendarChange} />
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
                <Group>
                    <Label text="URL" errorMessage={errorStates.urlError}>
                        <Input type="text" name="url" value={values.url} onChange={handleValueChange} />
                    </Label>
                    <div className="form-group__half">
                        <Label text="Prijs" errorMessage={errorStates.entryPriceError}>
                            <Input type="string" name="entryPrice" value={values.entryPrice} onChange={handleValueChange} />
                        </Label>
                        <Label text="Featured?" customClassName="flex-column">
                            <Checkbox name="featured" checked={values.featured} onChange={(e) => changeValue("featured", e.target.checked)} />
                        </Label>
                    </div>
                </Group>
                <Button text="Opslaan" onClick={handleSubmit} darken uppercase pending={submitPending}/>
            </Form>
        </Popup>
    )
};

export default EventPopup;