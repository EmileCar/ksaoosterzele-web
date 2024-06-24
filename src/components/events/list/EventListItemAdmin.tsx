import Event from '../../../types/Event';
import './EventsList.css';
import { Link } from 'react-router-dom';
import Default from '../../../assets/img/default.jpg';
import { formatDate, formatTime } from '../../../utils/datetimeUtil';
import { useEffect, useState } from 'react';
import EventPopup from '../popups/EventPopup';
import ConfirmEventDeletionPopup from '../popups/ConfirmEventDeletionPopup';

const EventListItemAdmin = ({ event, enableWrap = false, reload } : { event: Event, enableWrap?: boolean, isAdmin?: boolean, reload: () => void }) => {
	const [showChangePopup, setShowChangePopup] = useState<boolean>(false);
	const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);

	const handlePopupClose = () => {
		setShowChangePopup(false);
		setShowDeletePopup(false);
		reload();
	};

	return (
		<div className={`event-list_item admin ${enableWrap && "wrap-item"}`}>
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
			<div className='event-buttons'>
				<button className='event-buttons_button aanpassen' onClick={() => setShowChangePopup(true)}>Aanpassen</button>
				<button className='event-buttons_button verwijderen' onClick={() => setShowDeletePopup(true)}>Verwijderen</button>
			</div>
			{showChangePopup && <EventPopup event={event} onClose={handlePopupClose} />}
			{showDeletePopup && <ConfirmEventDeletionPopup event={event} onClose={handlePopupClose} />}
		</div>
	)
};

export default EventListItemAdmin;
