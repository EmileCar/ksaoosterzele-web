import DefaultLeider from '../../../assets/img/default-leider.jpeg';
import Leader from '../../../types/Leader';

const LeadersGroupedListItem = ({ leader }: { leader: Leader }) => {
    return (
        <div className="leader">
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
                {leader.group && <p className="leader-group">{leader.group}</p>}
            </div>
        </div>
    );
}

export default LeadersGroupedListItem;