import useFetch from "../../../hooks/useFetch";
import Leader, { LeadersGroupedResult } from "../../../types/Leader";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import './LeadersGroupedList.css';
import LeadersGroupedListItemAdmin from "./LeaderGroupedListItemAdmin";
import LeadersGroupedListItem from "./LeaderGroupedListItem";

interface LeadersGroupedListProps {
    fetchFunction: () => Promise<LeadersGroupedResult>;
    isAdmin?: boolean;
    emptyMessage?: string;
}

const LeadersGroupedList: React.FC<LeadersGroupedListProps> = ({ fetchFunction, isAdmin = false, emptyMessage }) => {
    const { pending, data, error } = useFetch<LeadersGroupedResult>(fetchFunction);

    return (
        <FetchedDataLayout isPending={pending} error={error}>
            <div className={`leaders-grouped`}>
                {data && Object.keys(data).map(role => (
                    <div key={role} className={`leaders-group ${isAdmin && "admin"}`}>
                        <h3>{role}</h3>
                        <div className="leaders">
                            {data[role].length === 0 ? (
                                <p>{emptyMessage || "Geen leiders gevonden"}</p>
                            ) : (
                                data[role].map((leader: Leader) => (
                                    isAdmin ? (
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
