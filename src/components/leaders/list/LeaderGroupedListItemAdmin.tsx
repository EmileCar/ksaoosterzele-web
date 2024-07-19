import { useState } from 'react';
import DefaultLeider from '../../../assets/img/default-leider.jpeg';
import { usePopupContext } from '../../../contexts/PopupContext';
import Leader, { LeaderRole } from '../../../types/Leader';
import LeaderPopup from '../popups/LeaderPopup';
import { changeRoleOfLeader } from '../../../services/leaderService';
import { useGlobalErrorContext } from '../../../contexts/GlobalErrorContext';

interface LeadersGroupedListItemAdminProps {
    leader: Leader;
    roles: LeaderRole[];
    leaderRolesPending: boolean;
    refetch: () => void;
}

const LeadersGroupedListItemAdmin: React.FC<LeadersGroupedListItemAdminProps> = ({ leader, roles, leaderRolesPending, refetch }) => {
    const { registerPopup } = usePopupContext();
    const { setError } = useGlobalErrorContext();
    const [ isPending, setIsPending ] = useState<boolean>(false);

    const openEditLeaderPopup = () => {
        registerPopup(<LeaderPopup leader={leader} onClose={() => {}} />);
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!(e.target as HTMLElement).closest('.change-role')) {
            openEditLeaderPopup();
        }
    }

    const changeGroup = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIsPending(true);
        await changeRoleOfLeader(leader.id!, e.target.value as unknown as number).then(() => {
            refetch();
            setIsPending(false);
        }).catch(() => {
            setError(`Er is iets misgegaan bij het veranderen van de rol van leider ${leader.firstName}.`);
            setIsPending(false);
        });
    }

    const renderLeaderGroup = () => {
        let text;
        let isGood = true;

        if (leader.group) {
            text = "Leider bij de " + leader.group.name;
        } else if (leader.role_id == 1 || leader.role_id == 2) {
            text = "Geen tak";
            isGood = false;
        } else {
            return null;
        }

        return (
            <p className={`leader-group ${!isGood && "error"}`}>{text}</p>
        );
    }

    return (
        <div className="leader admin" onClick={handleClick}>
            <img
                src={`assets/leiders/${leader.imageFileName}`}
                className="leader-img"
                alt={leader.firstName}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = DefaultLeider;
                }}
            />
            <div className="leader-info">
                <h4 className="leader-name">{leader.firstName} {leader.lastName}</h4>
                {renderLeaderGroup()}
            </div>
            <div className='change-role form'>
                <select className='inherit-font input' name='role' value={leader.role_id ?? ""} onChange={changeGroup}>
                    {(leaderRolesPending || isPending) ? (
                        <option value='' disabled>Laden...</option>
                    ) : (
                        <>
                            <option value=''>Geen groep</option>
                            {roles && roles.map(role => (
                                <option key={role.id} value={role.id!.toString()}>{role.name}</option>
                            ))}
                        </>
                    )}
                </select>
            </div>
        </div>
    );
}

export default LeadersGroupedListItemAdmin;
