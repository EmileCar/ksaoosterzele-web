import Event from '../../../types/Event';
import './EventsList.css';
import { Link } from 'react-router-dom';
import Default from '../../../assets/img/default.jpg';
import { formatDate, formatTime } from '../../../utils/datetimeUtil';

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
          	<div className="event-details">
            	<p className='event-details_item'><span className='pi pi-calendar'></span>{formatDate(event.datetime)}</p>
            	<p className='event-details_item'><span className='pi pi-clock'></span>{formatTime(event.datetime)?? "???"}</p>
            	<p className='event-details_item'><span className='pi pi-map-marker'></span>{event.location ?? "???"}</p>
            	{event.entryPrice && <p className='event-details_item'><span className='pi pi-money-bill'></span>€{event.entryPrice}</p>}
          	</div>
        </div>
    </Link>
)};

export default EventListItem;
