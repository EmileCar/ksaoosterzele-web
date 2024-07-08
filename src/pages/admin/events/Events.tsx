import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import { useCallback, useState } from "react";
import { getAdminEvents, getEvents } from "../../../services/eventService";
import useFetch from "../../../hooks/useFetch";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import Button from "../../../components/button/Button";
import EventListItemAdmin from "../../../components/events/list/EventListItemAdmin";
import EventPopup from "../../../components/events/popups/EventPopup";
import Event from "../../../types/Event";

const EventsAdmin = () => {
    const [showPastEvents, setShowPastEvents] = useState(false);
    const fetchEvents = useCallback(() => getAdminEvents(showPastEvents), [showPastEvents]);
    const { pending, data: events, error, refetch } = useFetch<Event[]>(fetchEvents);
    const [showCreatePopup, setShowCreatePopup] = useState(false);

    const closeHandler = () => {
        refetch();
        setShowCreatePopup(false);
    };

    return (
        <>
            <SectionTitle title="Evenementen beheren">
                <p>Maak hier nieuwe activiteiten/evenmenten aan of pas bestaande activiteiten aan.</p>
            </SectionTitle>
            <div className="admin__actions">
                <Button text="+ Evenement toevoegen" onClick={() => setShowCreatePopup(true)} hover/>
                <Button text={showPastEvents ? 'Toon komende evenementen' : 'Toon verleden evenementen'} onClick={() => setShowPastEvents((prev) => !prev)} customClassName={showPastEvents ? 'past-events' : 'upcoming-events'} hover />
            </div>
            <FetchedDataLayout isPending={pending} error={error}>
                {events && events.length === 0 && (
                <p>
                    {showPastEvents ? 'Geen verleden evenementen gevonden.' : 'Geen komende evenementen gevonden.'}
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
        </>
    );
}

export default EventsAdmin;