import DefaultLeider from '../../../assets/img/default-leider.jpeg';
import { usePopupContext } from '../../../contexts/PopupContext';
import Leader from '../../../types/Leader';
import LeaderPopup from '../popups/LeaderPopup';

const LeadersGroupedListItemAdmin = ({ leader }: { leader: Leader }) => {
    const { registerPopup } = usePopupContext();

    const openEditLeaderPopup = () => {
        registerPopup(<LeaderPopup leader={leader} onClose={() => {}} />);
    }

    return (
        <div className="leader admin" onClick={openEditLeaderPopup}>
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
    );
}

export default LeadersGroupedListItemAdmin;