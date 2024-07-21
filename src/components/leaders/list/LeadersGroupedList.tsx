import Leader, { LeadersGroupedResult } from "../../../types/Leader";
import './LeadersGroupedList.css';
import React from "react";

interface LeadersGroupedListProps {
    leaders: LeadersGroupedResult;
    refetch?: () => void;
    isAdmin?: boolean;
    emptyMessage?: string;
    LeaderComponent: React.FC<{ leader: Leader, refetch: () => void }>;
}

const LeadersGroupedList: React.FC<LeadersGroupedListProps> = ({ leaders, refetch, isAdmin = false, emptyMessage, LeaderComponent }) => {

    return (
        <div className={`leaders-grouped`}>
            {leaders && Object.keys(leaders).map(role => (
                <div key={role} className={`leaders-group ${isAdmin ? "admin" : ""}`}>
                    <h3>{role}</h3>
                    <div className="leaders">
                        {leaders[role].length === 0 ? (
                            <p>{emptyMessage || "Geen leiders voor deze groep"}</p>
                        ) : (
                            leaders[role].map((leader: Leader) => (
                                <LeaderComponent leader={leader} key={leader.id} refetch={refetch || (() => {})} />
                            ))
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LeadersGroupedList;
