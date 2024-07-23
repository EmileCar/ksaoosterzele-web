import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import { getLeaderRoles, getLeadersByRole } from "../../../services/leaderService";
import Leader, { LeaderRole, LeadersGroupedResult } from "../../../types/Leader";
import LeadersGroupedListItemAdmin from "../../../components/leaders/list/LeaderGroupedListItemAdmin";
import { useEffect, useRef } from "react";
import useFetch from "../../../hooks/useFetch";
import { useGlobalErrorContext } from "../../../contexts/GlobalErrorContext";
import "./Leaders.css"
import Button from "../../../components/button/Button";
import { usePopupContext } from "../../../contexts/PopupContext";
import LeaderPopup from "../../../components/leaders/popups/LeaderPopup";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import GroupedList from "../../../components/groupedList/GroupedList";

const LeadersAdmin = () => {
    const { pending, data, error, refetch } = useFetch<LeadersGroupedResult>(getLeadersByRole);
    const { pending: rolesPending, data: roles, error: fetchLeaderRolesError } = useFetch<LeaderRole[]>(getLeaderRoles);
    const { GlobalError, setError } = useGlobalErrorContext();
    const hasErrorSet = useRef(false);
    const { registerPopup } = usePopupContext();

    useEffect(() => {
        if (fetchLeaderRolesError && !hasErrorSet.current) {
            setError("Er was een probleem bij het ophalen van de leidingfuncties.");
            hasErrorSet.current = true;
        }
    }, [fetchLeaderRolesError, setError]);

    const openCreatePopup = () => {
        registerPopup(<LeaderPopup onClose={refetch} />);
    }

    const renderLeadersGroupedListItemAdmin = (leader: Leader) => (
        <LeadersGroupedListItemAdmin
            key={leader.id}
            leader={leader}
            roles={roles || []}
            leaderRolesPending={rolesPending}
            refetch={refetch}
        />
    );

    return (
        <>
            <SectionTitle title="Leiding beheren">
                <p>Op deze pagina kan je de iedereen van de leiding en hun rollen beheren.</p>
            </SectionTitle>
            <GlobalError />
            <div className="admin__actions">
                <Button text="+ Leiding toevoegen" onClick={openCreatePopup} hover/>
            </div>
            <FetchedDataLayout isPending={pending} error={error}>
                <div className="leaders__section-content">
                    <GroupedList groupedItems={data!} renderItem={renderLeadersGroupedListItemAdmin} emptyMessage="Er zijn geen leiders beschikbaar." />
                </div>
            </FetchedDataLayout>
        </>
    );
}

export default LeadersAdmin;