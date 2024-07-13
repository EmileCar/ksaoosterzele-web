import useFetch from "../../../hooks/useFetch";
import Leader, { LeadersGroupedResult } from "../../../types/Leader";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import './LeadersGroupedList.css';
import LeadersGroupedListItemAdmin from "./LeaderGroupedListItemAdmin";
import LeadersGroupedListItem from "./LeaderGroupedListItem";

const LeadersGroupedList = ({fetchFunction, isAdmin} : {fetchFunction: () => Promise<LeadersGroupedResult>, isAdmin?: boolean}) => {
    const { pending, data, error } = useFetch<LeadersGroupedResult>(fetchFunction!);

    return (
        <FetchedDataLayout isPending={pending} error={error}>
            <div className="leader__roles">
                {data && Object.keys(data).map(role => (
                    <div key={role} className="leader__role">
                        <h3>{role}</h3>
                        <div className="leaders">
                            {data[role].length === 0 ? (
                                <p>Geen leiding</p>
                            ) : (
                                data[role].map((leader: Leader) => (
                                    {isAdmin} ? (
                                        <LeadersGroupedListItemAdmin key={leader.id} leader={leader} />
                                    ) : (
                                        <LeadersGroupedListItem key={leader.id} leader={leader} />
                                    )
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </FetchedDataLayout>
    );
};

export default LeadersGroupedList;