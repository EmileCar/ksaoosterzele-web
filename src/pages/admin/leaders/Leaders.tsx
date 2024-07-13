import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import LeadersByRoleList from "../../../components/leaders/list/LeadersByRoleList";

const LeadersAdmin = () => {
    return (
        <>
            <SectionTitle title="Leiding beheren">
                <p>Op deze pagina kan je de iedereen van de leiding en hun rollen beheren.</p>
            </SectionTitle>
            <LeadersByRoleList />
        </>
    );
}

export default LeadersAdmin;