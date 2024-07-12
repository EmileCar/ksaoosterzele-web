import { useCallback } from "react";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import useFetch from "../../../hooks/useFetch";
import { LeadersByRoleResult } from "../../../types/Leader";
import { getLeadersByRole } from "../../../services/leaderService";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import LeadersByRoleList from "../../../components/leaders/list/LeadersByRoleList";

const LeadersAdmin = () => {
    return (
        <>
            <SectionTitle title="Leiding beheren">
                <p>Op deze pagina kan je de iedereen van de leiding en hun rollen beheren.</p>
            </SectionTitle>
            <LeadersByRoleList all />
        </>
    );
}

export default LeadersAdmin;