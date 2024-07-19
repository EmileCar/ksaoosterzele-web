import Popup from "../../popup/Popup";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import Button from "../../button/Button";
import Label from "../../form/Label";
import Input from "../../form/Input";
import useForm from "../../../hooks/useForm";
import { formatDateToInputDate } from "../../../utils/datetimeUtil";
import AutoComplete from "../../form/AutoComplete";
import Form from "../../form/Form";
import Group from "../../form/Group";
import Leader, { LeaderRole, SendLeader } from "../../../types/Leader";
import { getLeaderRoles, sendLeader } from "../../../services/leaderService";
import { usePopupContext } from "../../../contexts/PopupContext";
import useFetch from "../../../hooks/useFetch";

const LeaderPopup = ({ leader, onClose } : { leader?: Leader | null | undefined, onClose: () => void }) => {
    const { values, errorStates, setErrors, handleValueChange, changeValue, handleSubmitForm, submitPending } = useForm<SendLeader>(new SendLeader(leader || {}), sendLeader);
    const { pending: pendingRoles, data: roles, error: rolesError } = useFetch<LeaderRole[]>(getLeaderRoles);
	const { closePopup } = usePopupContext();

    const handleSubmit = async () => {
        await handleSubmitForm(leader ? 'PUT' : 'POST', () => {
            onClose();
            closePopup();
        });
    }

    return (
		<Popup title={leader ? `${leader.firstName} aanpassen` : "Nieuwe leader"}>
            <FetchedDataLayout isPending={submitPending} error={errorStates.general}>
                <Form>
                    <Group>
                        <Label text="Voornaam" errorMessage={errorStates.firstNameError}>
                            <Input type={"text"} name="firstName" value={values.firstName} onChange={handleValueChange} focus />
                        </Label>
                        <Label text="Achternaam" errorMessage={errorStates.lastNameError}>
                            <Input type={"text"} name="lastName" value={values.lastName} onChange={handleValueChange} focus />
                        </Label>
                    </Group>
                    <Group>
                        <Label text="Geboortedatum" errorMessage={errorStates.birthdateError}>
                            <Input type={"datetime"} name="birthdate" value={formatDateToInputDate(values.birthdate as Date)} onChange={handleValueChange} focus />
                        </Label>
                        <Label text="Afbeelding" errorMessage={errorStates.imageFileNameError}>
                            {/* <AutoComplete value={values.imageFileName} suggestions={imagePaths} completeMethod={search} onChange={handleValueChange} name="imageFileName" dropdown noSuggestionsMessage={pending ? "Nog bezig me laden..." : "Geen afbeeldingen gevonden"} /> */}
                        </Label>
                    </Group>
                    <Group>
                        <Label text="Gsmnummer" errorMessage={errorStates.phoneNumberError}>
                            <Input type={"text"} name="phoneNumber" value={values.phoneNumber} onChange={handleValueChange} focus />
                        </Label>
                        <Label text="Email" errorMessage={errorStates.emailError}>
                            <Input type={"text"} name="email" value={values.email} onChange={handleValueChange} focus />
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