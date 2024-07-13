import LeadersGroupedList from "../../components/leaders/list/LeadersGroupedList";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import PageLayout from "../../layouts/PageLayout";
import { getLeadersOfWorkingYear } from "../../services/leaderService";

const Leaders = () => {
    return (
        <PageLayout>
            <SectionTitle title="Onze leiding">
                <p>
                    Onze leiding bestaat uit een groep enthousiaste vrijwilligers die elke zondag klaarstaan om leuke activiteiten te organiseren voor de kinderen. Naast een leidingsgroep zijn wij ook een hechte vriendengroep waardoor de sfeer elke keer weer top is!
                </p>
            </SectionTitle>
            <LeadersGroupedList fetchFunction={getLeadersOfWorkingYear}/>
        </PageLayout>
    );
}

export default Leaders;