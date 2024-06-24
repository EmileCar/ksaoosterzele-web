import Event from '../../../types/Event';
import './EventsList.css';
import { Link } from 'react-router-dom';
import Default from '../../../assets/img/default.jpg';
import { formatDate, formatTime } from '../../../utils/datetimeUtil';

const EventListItem = ({ event, enableWrap = false, isAdmin = false } : { event: Event, enableWrap?: boolean, isAdmin?: boolean }) => {
	const handleClick = (e: any) => {
		if (isAdmin) {
			e.preventDefault();
		}
	}
	
	return (
		<Link onClick={handleClick} className={`event-list_item ${enableWrap && "wrap-item"} ${!isAdmin && "clickable"}`} to={`/evenement/${event.id}`}>
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
				<div className="event-details">
					<p className='event-details_item'><span className='pi pi-calendar'></span>{formatDate(event.datetime)}</p>
					<p className='event-details_item'><span className='pi pi-clock'></span>{formatTime(event.datetime)?? "???"}</p>
					<p className='event-details_item'><span className='pi pi-map-marker'></span>{event.location ?? "???"}</p>
					{event.entryPrice && <p className='event-details_item'><span className='pi pi-money-bill'></span>€{event.entryPrice}</p>}
				</div>
			</div>
			{isAdmin &&
				<div className='event-buttons'>
					<Link to={`/evenement/${event.id}/aanpassen`} className='event-buttons_button aanpassen'>Aanpassen</Link>
					<Link to={`/evenement/${event.id}/verwijderen`} className='event-buttons_button verwijderen'>Verwijderen</Link>
				</div>
			}
		</Link>
	)
};

export default EventListItem;
