import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import { useCallback, useState } from "react";
import { getEvents } from "../../../services/eventService";
import useFetch from "../../../hooks/useFetch";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import Button from "../../../components/button/Button";
import EventListItemAdmin from "../../../components/events/list/EventListItemAdmin";
import EventPopup from "../../../components/events/popups/EventPopup";
import Event from "../../../types/Event";

const EventsAdmin = () => {
    const fetchEvents = useCallback(() => getEvents(), []);
    const { pending, data: events, error, refetch } = useFetch<Event[]>(fetchEvents);
    const [showCreatePopup, setShowCreatePopup] = useState(false);

    const closeHandler = () => {
        refetch();
        setShowCreatePopup(false);
    }

    return (
        <>
            <div className="admin__top">
                <SectionTitle title="Evenementen beheren">
                    <p>Maak hier nieuwe activiteiten/evenmenten aan of pas bestaande activiteiten aan.</p>
                </SectionTitle>
            </div>
            <div className="events__container">
                <div className="admin__actions">
                    <Button text="+ Activiteit toevoegen" onClick={() => setShowCreatePopup(true)} hover/>
                </div>
                <FetchedDataLayout isPending={pending} error={error}>
                    {events && events.length === 0 && (
                    <p>
                        Er zijn geen activiteiten gepland.
                    </p>
                    )}
                    <div className={`events-list events-list_admin`}>
                    {events &&
                        events.map((event: Event) => (
                        <EventListItemAdmin key={event.id} event={event} enableWrap reload={refetch} />
                        ))}
                    </div>
                </FetchedDataLayout>
                {showCreatePopup && <EventPopup onClose={closeHandler} />}
            </div>
        </>
    );
}

export default EventsAdmin;