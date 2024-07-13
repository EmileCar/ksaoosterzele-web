import DefaultLeider from '../../../assets/img/default-leider.jpeg';
import { usePopupContext } from '../../../contexts/PopupContext';
import Leader, { LeaderRole } from '../../../types/Leader';
import LeaderPopup from '../popups/LeaderPopup';

const LeadersGroupedListItemAdmin = ({ leader, roles }: { leader: Leader, roles: LeaderRole[] }) => {
    const { registerPopup } = usePopupContext();

    const openEditLeaderPopup = () => {
        registerPopup(<LeaderPopup leader={leader} onClose={() => {}} />);
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!(e.target as HTMLElement).closest('.change-role')) {
            openEditLeaderPopup();
        }
    }

    const changeGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
        
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
                {leader.group && <p className="leader-group">Leider bij de {leader.group.name}</p>}
            </div>
            <div className='change-role form'>
                <select className='inherit-font input' name='role' value={leader.role_id ?? ""} onChange={changeGroup}>
                    <option value=''>Geen groep</option>
                    {roles && roles.map(role => (
                        <option key={role.id} value={role.id?.toString()}>{role.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default LeadersGroupedListItemAdmin;
