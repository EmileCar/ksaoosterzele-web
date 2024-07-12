import Event from "../../types/Event";
import { formatDate, formatTime, isDateTimeInPast } from "../../utils/datetimeUtil";
import "./EventInfo.css";

const EventInfo = ({ event }: { event: Event }) => {
    return (
        <div className="event-info">
            <p className={`event-info_item ${isDateTimeInPast(event.datetime) ? 'error' : ''}`}><span className='pi pi-calendar' />{formatDate(event.datetime)}</p>
            <p className='event-info_item'><span className='pi pi-clock' />{formatTime(event.datetime)?? "???"}</p>
            <p className='event-info_item'><span className='pi pi-map-marker' />{event.location ?? "???"}</p>
            {event.entryPrice && <p className='event-info_item'><span className='pi pi-money-bill'/>€{event.entryPrice}</p>}
        </div>
    );
}

export default EventInfo;