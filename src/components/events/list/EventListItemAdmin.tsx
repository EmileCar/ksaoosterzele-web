import Event from '../../../types/Event';
import './EventsList.css';
import Default from '../../../assets/img/default.jpg';
import EventPopup from '../popups/EventPopup';
import ConfirmEventDeletionPopup from '../popups/ConfirmEventDeletionPopup';
import Button from '../../button/Button';
import { usePopupContext } from '../../../contexts/PopupContext';
import EventInfo from '../EventInfo';

const EventListItemAdmin = ({ event, enableWrap = false, reload } : { event: Event, enableWrap?: boolean, isAdmin?: boolean, reload: () => void }) => {
	const { registerPopup } = usePopupContext();

	const openEditPopup = () => {
		registerPopup(<EventPopup event={event} onClose={reload} />);
	}

	const openDeletePopup = () => {
		registerPopup(<ConfirmEventDeletionPopup event={event} onClose={reload} />);
	}

	return (
		<div className={`event-list_item admin ${enableWrap && "wrap-item"}`}>
			<div className='event-list_item--image'>
				<img
					src={`../assets/events/${event.imageFileName}` ?? Default}
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
			<div className='event-buttons'>
				<Button text="Aanpassen" onClick={openEditPopup} darken fullWidth/>
				<Button text="Verwijderen" onClick={openDeletePopup} darken fullWidth customClassName='event-buttons_button verwijderen'/>
			</div>
		</div>
	)
};

export default EventListItemAdmin;
