import Popup from "../../popup/Popup";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import Button from "../../button/Button";
import Label from "../../form/Label";
import Input from "../../form/Input";
import useForm from "../../../hooks/useForm";
import { formatDateToInputDate } from "../../../utils/datetimeUtil";
import AutoComplete, { AutoCompleteOption } from "../../form/AutoComplete";
import Form from "../../form/Form";
import Group from "../../form/Group";
import Leader, { LeaderRole, SendLeader } from "../../../types/Leader";
import { getLeaderImagePaths, getLeaderRoles, sendLeader } from "../../../services/leaderService";
import { usePopupContext } from "../../../contexts/PopupContext";
import useFetch from "../../../hooks/useFetch";
import { useEffect, useState } from "react";

const LeaderPopup = ({ leader, onClose } : { leader?: Leader | null | undefined, onClose: () => void }) => {
    const { values, errorStates, handleValueChange, handleSubmitForm, changeValue, submitPending } = useForm<SendLeader>(new SendLeader(leader || {}), sendLeader);
    const { pending: pendingRoles, data: roles, error: rolesError } = useFetch<LeaderRole[]>(getLeaderRoles);
    const { pending, data: fetchedImagePaths } = useFetch<string[]>(getLeaderImagePaths);
	const { closePopup } = usePopupContext();

    const handleCalendarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!value) {
            changeValue("birthdate", null);
            return;
        }
        const datetime = new Date(value);
        changeValue("birthdate", datetime);
    };

    const handleSubmit = async () => {
        await handleSubmitForm(leader ? 'PUT' : 'POST', () => {
            onClose();
            closePopup();
        });
    }

    return (
		<Popup title={leader ? `${leader.firstName} aanpassen` : "Nieuwe leider toevoegen"}>
            <FetchedDataLayout isPending={submitPending} error={errorStates.general}>
                <Form>
                    <Group>
                        <Label text="Voornaam" errorMessage={errorStates.firstNameError}>
                            <Input type={"text"} name="firstName" value={values.firstName} onChange={handleValueChange} focus />
                        </Label>
                        <Label text="Achternaam" errorMessage={errorStates.lastNameError}>
                            <Input type={"text"} name="lastName" value={values.lastName} onChange={handleValueChange} />
                        </Label>
                    </Group>
                    <Group>
                        <Label text="Geboortedatum" errorMessage={errorStates.birthdateError}>
                            <Input type="date" name="birthdate" value={formatDateToInputDate(values.birthdate)} onChange={handleCalendarChange} />
                        </Label>
                        <Label text="Afbeelding" errorMessage={errorStates.imageFileNameError}>
                            <AutoComplete
                                value={values.imageFileName}
                                suggestions={fetchedImagePaths ? fetchedImagePaths.map(path => ({ value: path, label: path })) : null}
                                onChange={handleValueChange}
                                name="imageFileName"
                                dropdown
                                fixedToSuggestions
                                noSuggestionsMessage={pending ? "Nog bezig me laden..." : "Geen afbeeldingen gevonden"}
                            />
                        </Label>
                    </Group>
                    <Group>
                        <Label text="Gsmnummer" errorMessage={errorStates.phoneNumberError}>
                            <Input type={"text"} name="phoneNumber" value={values.phoneNumber} onChange={handleValueChange} />
                        </Label>
                        <Label text="Email" errorMessage={errorStates.emailError}>
                            <Input type={"text"} name="email" value={values.email} onChange={handleValueChange} />
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
                    <Label text="Huidige rol" errorMessage={errorStates.roleError}>
                        <select className="input inherit-font" name="roleId" value={values.roleId} onChange={handleValueChange}>
                            {roles?.map(role => (
                                <option key={role.id} value={role.id?.toString()}>{role.name}</option>
                            ))}
                        </select>
                    </Label>
                    <Button text="Opslaan" onClick={handleSubmit} darken uppercase/>
                </Form>
            </FetchedDataLayout>
        </Popup>
	)
};

export default LeaderPopup;