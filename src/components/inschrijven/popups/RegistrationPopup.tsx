import React, { useState } from "react";
import useForm from "../../../hooks/useForm";
import { formatDateTime } from "../../../utils/datetimeUtil";
import Popup from "../../popup/Popup";
import Label from "../../form/Label";
import Input from "../../form/Input";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import Button from "../../button/Button";
import Form from "../../form/Form";
import Group from "../../form/Group";
import Registration, { SendRegistration } from "../../../types/Registration";
import { sendInschrijving } from "../../../services/registrationService";

const RegistrationPopup = ({ registration, onClose } : { registration?: Registration | null | undefined, onClose: () => void }) => {
    const { values, errorStates, handleValueChange, changeValue, handleSubmitForm, submitPending } = useForm<SendRegistration>(new SendRegistration(registration || {}), sendInschrijving);
    const [imagePaths, setImagePaths] = useState<string[]>([]);
    const [imagePathError, setImagePathError] = useState<string>("");

    const handleCalendarChange = (e: any) => {
        const datetime = new Date(e.target.value);
        changeValue("datetime", datetime);
    }

    const handleSubmit = async () => {
        await handleSubmitForm(registration ? 'PUT' : 'POST', () => {
            onClose();
        });
    }

    return (
        <Popup title={registration ? `Inschrijving aanpassen` : "Nieuwe inschrijving"} onClose={onClose}>
            {registration && (
                <div className="popup-text">
                    <p><strong>{registration.firstName + " " +  registration.lastName}</strong> voor de <strong>{registration.group?.name}</strong></p>
                    <p>Ingeschreven op: {formatDateTime(registration.createdAt)}</p>
                    <p>Laatst aangepast op: {formatDateTime(registration.updatedAt)}</p>
                </div>
            )}
            <Form disabled={submitPending}>
                <Group>
                    <Label text="Voornaam lid" errorMessage={errorStates.nameError}>
                        <Input type={"text"} name="name" value={values.firstName} onChange={handleValueChange} focus />
                    </Label>
                    <Label text="Achternaam lid" errorMessage={errorStates.nameError}>
                        <Input type={"text"} name="name" value={values.lastName} onChange={handleValueChange} focus />
                    </Label>
                </Group>
                <Group>
                    <div className="form-group__half">
                        <Label text="Geboortedatum lid:" errorMessage={errorStates.birthdateError} required>
                            <Input type="date" name="birthdate" value={values.birthdate.toString()} onChange={handleValueChange} placeholder="Geboortedatum" />
                        </Label>
                        <Label text="Geslacht:" errorMessage={errorStates.genderError} customClassName={"geslacht-label"} required>
                            <select className="input inherit-font" name="gender" value={values.gender} onChange={handleValueChange}>
                                <option value="M" selected>M</option>
                                <option value="X">X</option>
                            </select>
                        </Label>
                    </div>
                    <Label text="Geboorteplaats lid:" errorMessage={errorStates.birthplaceError}>
                        <Input type="text" name="birthplace" value={values.birthplace} onChange={handleValueChange} placeholder="Geboorteplaats" />
                    </Label>
                </Group>
                <Group>
                    <Label text="Voornaam ouder/voogd:" errorMessage={errorStates.parentFirstNameError} required>
                        <Input type="text" name="parentFirstName" value={values.parentFirstName} onChange={handleValueChange} placeholder="Voornaam" />
                    </Label>
                    <Label text="Achternaam ouder/voogd:" errorMessage={errorStates.parentLastNameError} required>
                        <Input type="text" name="parentLastName" value={values.parentLastName} onChange={handleValueChange} placeholder="Achternaam" />
                    </Label>
                </Group>
                <Label text="Straat + huisnummer:" errorMessage={errorStates.addressError} required>
                    <Input type="text" name="address" value={values.address} onChange={handleValueChange} placeholder="Straat + huisnummer" />
                </Label>
                <Group>
                    <Label text="Postcode:" errorMessage={errorStates.postalCodeError} required>
                        <Input type="text" name="postalCode" value={values.postalCode} onChange={handleValueChange} placeholder="Postcode" />
                    </Label>
                    <Label text="Gemeente:" errorMessage={errorStates.townError} required>
                        <Input type="text" name="town" value={values.town} onChange={handleValueChange} placeholder="Gemeente" />
                    </Label>
                </Group>
                <Group>
                    <Label text="Gsm-nummer:" errorMessage={errorStates.phoneNumberError} required>
                        <Input type="text" name="phoneNumber" value={values.phoneNumber} onChange={handleValueChange} placeholder="Gsm-nummer" />
                    </Label>
                    <Label text="Telefoonnummer/Gsm 2:" errorMessage={errorStates.telephoneNumber}>
                        <Input type="text" name="telephoneNumber" value={values.telephoneNumber} onChange={handleValueChange} placeholder="Telefoonnummer" />
                    </Label>
                </Group>
                <Group>
                    <Label text="Email:" errorMessage={errorStates.emailError} required>
                        <Input type="text" name="email" value={values.email} onChange={handleValueChange} placeholder="Email" />
                    </Label>
                </Group>
                <Group>
                    <Label text="Voornaam tweede ouder/voogd:" errorMessage={errorStates.secondParentFirstNameError}>
                        <Input type="text" name="secondParentFirstName" value={values.secondParentFirstName} onChange={handleValueChange} placeholder="Voornaam" />
                    </Label>
                    <Label text="Achternaam tweede ouder/voogd:" errorMessage={errorStates.secondParentLastNameError}>
                        <Input type="text" name="secondParentLastName" value={values.secondParentLastName} onChange={handleValueChange} placeholder="Achternaam" />
                    </Label>
                </Group>
                <Label text="Tweede straat + huisnummer:" errorMessage={errorStates.secondAddressError}>
                    <Input type="text" name="secondAddress" value={values.secondAddress} onChange={handleValueChange} placeholder="Straat + huisnummer" />
                </Label>
                <Group>
                    <Label text="Tweede postcode:" errorMessage={errorStates.secondPostalCodeError}>
                        <Input type="text" name="secondPostalCode" value={values.secondPostalCode} onChange={handleValueChange} placeholder="Postcode" />
                    </Label>
                    <Label text="Tweede gemeente:" errorMessage={errorStates.secondTownError}>
                        <Input type="text" name="secondTown" value={values.secondTown} onChange={handleValueChange} placeholder="Gemeente" />
                    </Label>
                </Group>
                <Group>
                    <Label text="Tweede gsm-nummer:" errorMessage={errorStates.secondPhoneNumberError}>
                        <Input type="text" name="secondPhoneNumber" value={values.secondPhoneNumber} onChange={handleValueChange} placeholder="Gsm-nummer" />
                    </Label>
                    <Label text="Tweede telefoonnummer/Gsm 2:" errorMessage={errorStates.secondTelephoneNumberError}>
                        <Input type="text" name="secondTelephoneNumber" value={values.secondTelephoneNumber} onChange={handleValueChange} placeholder="Telefoonnummer" />
                    </Label>
                </Group>
                <Group>
                    <Label text="Tweede email:" errorMessage={errorStates.secondEmailError}>
                        <Input type="text" name="secondEmail" value={values.secondEmail} onChange={handleValueChange} placeholder="Email" />
                    </Label>
                </Group>
                <Label text={"Tak van het lid"} errorMessage={errorStates.groupError} required>
                    <select
                        className="input inherit-font"
                        value={values.groupId}
                        onChange={(e) => changeValue("groupId", parseInt(e.target.value))}
                        name="groupId"
                    >
                        <option value="1">Leeuwkes</option>
                        <option value="2">Jongknapen</option>
                        <option value="3">Knapen</option>
                        <option value="4">Jonghernieuwers</option>
                    </select>
                </Label>
                <Button text="Opslaan" onClick={handleSubmit} darken uppercase pending={submitPending}/>
            </Form>
        </Popup>
    )
};

export default RegistrationPopup;