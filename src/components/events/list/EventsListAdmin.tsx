import "./EventsList.css";
import Event, { SendEvent } from "../../../types/Event";
import useFetch from "../../../hooks/useFetch";
import { getEvents } from "../../../services/eventService";
import { useCallback, useState } from "react";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import EventListItemAdmin from "./EventListItemAdmin";
import EventPopup from "../popups/EventPopup";

/**
 * Renders a list of events
 *
 * @component
 * @param {number} limit - The maximum number of events to display (optional)
 * @returns {JSX.Element} The rendered component.
 */
const EventsListAdmin = ({ limit }: { limit?: number }): JSX.Element => {
  const fetchEvents = useCallback(() => getEvents(limit), [limit]);
  const { pending, data: events, error, refetch } = useFetch<Event[]>(fetchEvents);
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  const closeHandler = () => {
    refetch();
    setShowCreatePopup(false);
  }

  return (
    <div className="events__container">
      <button onClick={() => setShowCreatePopup(true)} className="button button-admin inherit-font">+ Activiteit toevoegen</button>
      <FetchedDataLayout isPending={pending} error={error}>
        {events && events.length === 0 && (
          <p>
            Er zijn geen activiteiten gepland.
          </p>
        )}
        <div className={`events-list events-list_admin`}>
          {events &&
            events.map((event) => (
              <EventListItemAdmin key={event.id} event={event} enableWrap reload={refetch} />
            ))}
        </div>
      </FetchedDataLayout>
      {showCreatePopup && <EventPopup onClose={closeHandler} />}
    </div>
  );
};

export default EventsListAdmin;
