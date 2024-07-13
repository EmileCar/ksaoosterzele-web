import useFetch from "../../../hooks/useFetch";
import Leader, { LeadersGroupedResult } from "../../../types/Leader";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import './LeadersGroupedList.css';
import React from "react";

interface LeadersGroupedListProps {
    fetchFunction: () => Promise<LeadersGroupedResult>;
    isAdmin?: boolean;
    emptyMessage?: string;
    LeaderComponent: React.FC<{ leader: Leader }>;
}

const LeadersGroupedList: React.FC<LeadersGroupedListProps> = ({ fetchFunction, isAdmin = false, emptyMessage, LeaderComponent }) => {
    const { pending, data, error } = useFetch<LeadersGroupedResult>(fetchFunction);

    return (
        <FetchedDataLayout isPending={pending} error={error}>
            <div className={`leaders-grouped`}>
                {data && Object.keys(data).map(role => (
                    <div key={role} className={`leaders-group ${isAdmin ? "admin" : ""}`}>
                        <h3>{role}</h3>
                        <div className="leaders">
                            {data[role].length === 0 ? (
                                <p>{emptyMessage || "Geen leiders voor deze groep"}</p>
                            ) : (
                                data[role].map((leader: Leader) => (
                                    <LeaderComponent leader={leader} key={leader.id} />
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
