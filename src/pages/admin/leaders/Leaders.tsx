import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import LeadersGroupedList from "../../../components/leaders/list/LeadersGroupedList";
import { getLeadersByRole } from "../../../services/leaderService";

const LeadersAdmin = () => {
    return (
        <>
            <SectionTitle title="Leiding beheren">
                <p>Op deze pagina kan je de iedereen van de leiding en hun rollen beheren.</p>
            </SectionTitle>
            <LeadersGroupedList fetchFunction={getLeadersByRole} isAdmin/>
        </>
    );
}

export default LeadersAdmin;