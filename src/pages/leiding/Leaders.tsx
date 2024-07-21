import SectionTitle from "../../components/sectionTitle/SectionTitle";
import PageLayout from "../../layouts/PageLayout";
import { getLeadersOfWorkingYear } from "../../services/leaderService";
import Leader, { LeadersGroupedResult } from "../../types/Leader";
import LeadersGroupedListItem from "../../components/leaders/list/LeaderGroupedListItem";
import FetchedDataLayout from "../../layouts/FetchedDataLayout";
import useFetch from "../../hooks/useFetch";
import GroupedList from "../../components/groupedList/GroupedList";

const Leaders = () => {
    const { pending, data, error, refetch } = useFetch<LeadersGroupedResult>(getLeadersOfWorkingYear);

    const renderLeadersGroupedListItemAdmin = (leader: Leader) => (
        <LeadersGroupedListItem
            key={leader.id}
            leader={leader}
        />
    );

    return (
        <PageLayout>
            <SectionTitle title="Onze leiding">
                <p>
                    Onze leiding bestaat uit een groep enthousiaste vrijwilligers die elke zondag klaarstaan om leuke activiteiten te organiseren voor de kinderen. Naast een leidingsgroep zijn wij ook een hechte vriendengroep waardoor de sfeer elke keer weer top is!
                </p>
            </SectionTitle>
            <div className="page__section--content">
                <FetchedDataLayout isPending={pending} error={error}>
                    <GroupedList groupedItems={data!} renderItem={renderLeadersGroupedListItemAdmin} emptyMessage="Er zijn geen leiders geregistreerd voor deze tak." />
                </FetchedDataLayout>
            </div>
        </PageLayout>
    );
}

export default Leaders;
