import { useCallback } from "react";
import useFetch from "../../../hooks/useFetch";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import { getGroups } from "../../../services/groupService";
import Group from "../../../types/Group";
import Leader, { ChangeLeaderGroup } from "../../../types/Leader";
import Popup from "../../popup/Popup";
import Form from "../../form/Form";
import useForm from "../../../hooks/useForm";
import { changeLeaderGroup } from "../../../services/leaderService";
import Label from "../../form/Label";

const LeaderGroupPopup = ({ leader, onClose } : { leader: Leader, onClose: () => void }) => {
    const fetchGroups = useCallback(() => getGroups(true), []);
    const { pending, data: groups, error } = useFetch<Group[]>(fetchGroups);
    const { values, errorStates, handleValueChange, handleSubmitForm, submitPending } = useForm<ChangeLeaderGroup>(new ChangeLeaderGroup(leader || {}), changeLeaderGroup);

    const renderIntroText = () => {
        switch (leader.role_id) {
            case 1: {
                if (leader.group) {
                    return `Momenteel is ${leader.firstName} leider bij de ${leader.group.name} dit werkjaar. Dit kun je hieronder aanpassen.`;
                } else {
                    return `${leader.firstName} is nog niet toegewezen als leiding aan een tak voor dit werkjaar. Dit kun je hieronder aanpassen.`;
                }
            }
            case 2:
                if (leader.group) {
                    return `Momenteel geeft bondsleider ${leader.firstName} leiding bij de ${leader.group.name} dit werkjaar. Dit kun je hieronder aanpassen.`;
                } else {
                    return `Bondsleider ${leader.firstName} is nog niet toegewezen als leiding aan een tak voor dit werkjaar. Dit kun je hieronder aanpassen.`;
                }
            case 3:
                if(leader.group) {
                    return `Momenteel geeft oudleider ${leader.firstName} leiding bij de ${leader.group.name} dit werkjaar. Eigenlijk kan dit niet kloppen. Dit kun je hieronder aanpassen.`;
                } else {
                    return `Oudleider ${leader.firstName} is niet toegewezen als leiding aan een tak voor dit werkjaar. Hoewel dit niet nodig is, kun je dit hieronder aanpassen.`;
                }
            case 4:
                if (leader.group) {
                    return `Momenteel geeft passief leider ${leader.firstName} leiding bij de ${leader.group.name} dit werkjaar. Dit kun je hieronder aanpassen.`;
                } else {
                    return `Passief leider ${leader.firstName} is nog niet toegewezen als leiding aan een tak voor dit werkjaar. Dit kun je hieronder aanpassen.`;
                }
            default:
                if(leader.group) {
                    return `Momenteel geeft ${leader.firstName} leiding bij de ${leader.group.name} dit werkjaar. Dit kun je hieronder aanpassen.`;
                } else {
                    return `${leader.firstName} is nog niet toegewezen als leiding aan een tak voor dit werkjaar. Dit kun je hieronder aanpassen.`;
                }
        }
    }

    return (
        <Popup title={`Tak van ${leader.firstName} aanpassen`}>
            <FetchedDataLayout error={error} isPending={pending}>
                <p>{renderIntroText()}</p>
                <Form>
                    <Label text="Verander tak">
                        <select className="input inherit-font" name="groupId" value={values.groupId} onChange={handleValueChange}>
                            <option value="">Geen tak</option>
                            {groups && groups.map(group => (
                                <option key={group.id} value={group.id!}>{group.name}</option>
                            ))}
                        </select>
                    </Label>
                </Form>
            </FetchedDataLayout>
        </Popup>
    );
}

export default LeaderGroupPopup;