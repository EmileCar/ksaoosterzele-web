import React, { useState } from "react";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import EventPopup from "../../../components/events/popups/EventPopup";
import EventsListAdmin from "../../../components/events/list/EventsListAdmin";

const EventsAdmin = () => {
    const [showCreatePopup, setShowCreatePopup] = useState(false);

    const closeHandler = () => {
        setShowCreatePopup(false);
    }

    return (
        <>
            <div className="admin__top">
                <SectionTitle title="Activiteiten beheren">
                    <p>Maak hier nieuwe activiteiten/evenmenten aan of pas bestaande activiteiten aan.</p>
                </SectionTitle>
                <button onClick={() => setShowCreatePopup(true)} className="button button-admin inherit-font">+ Activiteit toevoegen</button>
            </div>
            <EventsListAdmin />
            {showCreatePopup && <EventPopup onClose={closeHandler} />}
        </>
    );
}

export default EventsAdmin;