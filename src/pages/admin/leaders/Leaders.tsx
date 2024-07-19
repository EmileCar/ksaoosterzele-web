import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import LeadersGroupedList from "../../../components/leaders/list/LeadersGroupedList";
import { getLeaderRoles, getLeadersByRole } from "../../../services/leaderService";
import Leader, { LeaderRole } from "../../../types/Leader";
import LeadersGroupedListItemAdmin from "../../../components/leaders/list/LeaderGroupedListItemAdmin";
import { useEffect, useRef } from "react";
import useFetch from "../../../hooks/useFetch";
import { useGlobalErrorContext } from "../../../contexts/GlobalErrorContext";
import "./Leaders.css"

const LeadersAdmin = () => {
    const { pending, data: roles, error: fetchLeaderRolesError, refetch } = useFetch<LeaderRole[]>(getLeaderRoles);
    const { GlobalError, setError } = useGlobalErrorContext();
    const hasErrorSet = useRef(false);

    useEffect(() => {
        if (fetchLeaderRolesError && !hasErrorSet.current) {
            setError("Er was een probleem bij het ophalen van de leidingfuncties.");
            hasErrorSet.current = true;
        }
    }, [fetchLeaderRolesError, setError]);

    return (
        <>
            <SectionTitle title="Leiding beheren">
                <p>Op deze pagina kan je de iedereen van de leiding en hun rollen beheren.</p>
            </SectionTitle>
            <GlobalError />
            <LeadersGroupedList
                fetchFunction={getLeadersByRole}
                isAdmin
                LeaderComponent={({ leader, refetch }: { leader: Leader, refetch: () => void }) =>
                    <LeadersGroupedListItemAdmin leader={leader} roles={roles!} leaderRolesPending={pending} refetch={refetch} />}
            />
        </>
    );
}

export default LeadersAdmin;