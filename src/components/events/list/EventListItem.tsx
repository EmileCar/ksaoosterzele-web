import Event from '../../../types/Event';
import './EventsList.css';
import { Link } from 'react-router-dom';
import Default from '../../../assets/img/default.jpg';
import EventInfo from '../EventInfo';

const EventListItem = ({ event, enableWrap = false } : { event: Event, enableWrap?: boolean }) => {

	return (
		<Link className={`event-list_item ${enableWrap && "wrap-item"}`} to={`/evenement/${event.id}`}>
			<div className='event-list_item--image'>
				<img
					src={`assets/events/${event.imageFileName}` ?? Default}
					alt={event.name}
					onError={(e) => {
						e.currentTarget.src = Default;
					}}
					height={180}
				/>
			</div>

			<div className='event-list_item--body'>
				<h3>{event.name}</h3>
				<EventInfo event={event} />
			</div>
		</Link>
)};

export default EventListItem;
