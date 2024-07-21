import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import LeadersGroupedList from "../../../components/leaders/list/LeadersGroupedList";
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
                <LeadersGroupedList
                    leaders={data!}
                    refetch={refetch}
                    isAdmin
                    LeaderComponent={({ leader, refetch }: { leader: Leader, refetch: () => void }) =>
                        <LeadersGroupedListItemAdmin leader={leader} roles={roles!} leaderRolesPending={pending} refetch={refetch} />}
                />
            </FetchedDataLayout>
        </>
    );
}

export default LeadersAdmin;