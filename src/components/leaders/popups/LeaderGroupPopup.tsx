import { useCallback, useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import { getGroups } from "../../../services/groupService";
import Group from "../../../types/Group";
import Leader, { ChangeLeaderGroup, LeaderGroup } from "../../../types/Leader";
import Popup from "../../popup/Popup";
import Form from "../../form/Form";
import useForm from "../../../hooks/useForm";
import { changeGroupOfLeader, getLeaderGroups } from "../../../services/leaderService";
import Label from "../../form/Label";
import { usePopupContext } from "../../../contexts/PopupContext";

const LeaderGroupPopup = ({ leader, onClose } : { leader: Leader, onClose: () => void }) => {
    const fetchGroups = useCallback(() => getGroups(true), []);
    const { pending, data: groups, error } = useFetch<Group[]>(fetchGroups);
    const fetchLeaderGroups = useCallback(() => getLeaderGroups(leader.id!), [leader.id]);
    const { pending: leaderGroupsPending, data: leaderGroups, error: leaderGroupsError } = useFetch<LeaderGroup[]>(fetchLeaderGroups);
    const { values, handleValueChange, handleSubmitForm, changeValue, submitPending } = useForm<ChangeLeaderGroup>(new ChangeLeaderGroup(leader || {}), changeGroupOfLeader);
    const { closePopup } = usePopupContext();
    const [generalError, setGeneralError] = useState<string | null>(null);

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

    useEffect(() => {
        if (values.groupId && values.groupId !== leader.group?.id) {
            handleSubmitForm("POST", () => {
                closePopup();
                onClose();
            }, (errors) => {
                setGeneralError(errors.message);
                changeValue("groupId", leader.group?.id);
            });
        }
    }, [values.groupId]);

    return (
        <Popup title={`Tak van ${leader.firstName} aanpassen`}>
            <FetchedDataLayout error={error || leaderGroupsError} isPending={pending || leaderGroupsPending}>
                <p className="popup-text">{renderIntroText()}</p>
                <div className="error">{generalError}</div>
                <Form disabled={submitPending}>
                    <Label text="Verander tak">
                        <select className="input inherit-font" name="groupId" value={values.groupId} onChange={handleValueChange}>
                            <option value={0}>Geen tak</option>
                            {groups && groups.map(group => (
                                <option key={group.id} value={group.id!}>{group.name}</option>
                            ))}
                        </select>
                    </Label>
                </Form>

                <div className="leader-groups">
                    <p className="leader-group leader-groups-title">Vorige werkjaren:</p>
                    {leaderGroups && leaderGroups.length === 0 && <p>{leader.firstName} gaf nog geen leiding vorige werkjaren.</p>}
                    {leaderGroups && leaderGroups.map(leaderGroup => (
                        <div key={leaderGroup.id} className="leader-group">
                            <p><strong>{leaderGroup.workingYearName}</strong></p>
                            <p>-</p>
                            <p>{leaderGroup.name}</p>
                        </div>
                    ))}
                </div>
            </FetchedDataLayout>
        </Popup>
    );
}

export default LeaderGroupPopup;