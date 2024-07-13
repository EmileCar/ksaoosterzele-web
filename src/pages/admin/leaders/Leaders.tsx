import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import LeadersGroupedList from "../../../components/leaders/list/LeadersGroupedList";
import { getLeaderRoles, getLeadersByRole } from "../../../services/leaderService";
import Leader, { LeaderRole } from "../../../types/Leader";
import LeadersGroupedListItemAdmin from "../../../components/leaders/list/LeaderGroupedListItemAdmin";
import { useCallback } from "react";
import { getGroups } from "../../../services/groupService";
import useFetch from "../../../hooks/useFetch";
import Group from "../../../types/Group";

const LeadersAdmin = () => {
    const fetchRoles = useCallback(() => getLeaderRoles(), []);
    const { pending, data: roles, error } = useFetch<LeaderRole[]>(fetchRoles);

    return (
        <>
            <SectionTitle title="Leiding beheren">
                <p>Op deze pagina kan je de iedereen van de leiding en hun rollen beheren.</p>
            </SectionTitle>
            <LeadersGroupedList
                fetchFunction={getLeadersByRole}
                isAdmin
                LeaderComponent={({ leader }: { leader: Leader }) => <LeadersGroupedListItemAdmin leader={leader} roles={roles!}/>}
            />
        </>
    );
}

export default LeadersAdmin;