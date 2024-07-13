import { getLeadersByRole } from "../../../services/leaderService";
import useFetch from "../../../hooks/useFetch";
import Leader, { LeadersByRoleResult } from "../../../types/Leader";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import './LeadersByRoleList.css';
import DefaultLeider from '../../../assets/img/default-leider.jpeg';

const LeadersByRoleList = (): JSX.Element => {
    const { pending, data, error } = useFetch<LeadersByRoleResult>(getLeadersByRole);

    return (
        <FetchedDataLayout isPending={pending} error={error}>
            <div className="leader__roles">
                {data && Object.keys(data).map(role => (
                    <div key={role} className="leader__role">
                        <h3>{role}</h3>
                        {data[role].map((leader: Leader) => (
                            <div className="leader" key={leader.id}>
                                <img
                                    src={`assets/leiders/${leader.imageFileName}`}
                                    className="leader-img"
                                    alt={leader.firstName}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = DefaultLeider;
                                    }}
                                />
                                <div className="card-body">
                                    <h4 className="leader-name">{leader.firstName} {leader.lastName}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </FetchedDataLayout>
    );
};

export default LeadersByRoleList;