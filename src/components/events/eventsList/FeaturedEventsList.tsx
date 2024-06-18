import "./EventsList.css";
import Event from "../../../types/Event";
import useFetch from "../../../hooks/useFetch";
import { getEvents } from "../../../services/eventsService";
import { useCallback } from "react";
import EventListItem from "./EventListItem";

/**
 * Renders a list of featured events
 *
 * @component
 * @param {number} limit - The maximum number of events to display (optional)
 * @returns {JSX.Element} The rendered component.
 */
const FeaturedEventsList = ({ limit } : { limit?: number }): JSX.Element => {
    const fetchEvents = useCallback(() => getEvents(limit), [limit]);
    const { pending, data, error } = useFetch<Event[]>(fetchEvents);

    return (
        <div className="events__container">
            {pending && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {data &&
            data.length === 0 &&
                <p>
                    Er zijn geen activiteiten gepland in de toekomst. Raadpleeg onze <a href="https://www.facebook.com/KSA.Oosterzele/" className="cursive" target="_blank">facebookpagina</a> voor actuele info.
                </p>
            }
            <div className="events-list">
                {data && data.map((event) =>
                    <EventListItem key={event.id} event={event} enableWrap/>
                )}
            </div>
        </div>
    );
}

export default FeaturedEventsList;