import React from "react";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import Popup from "../../../components/popup/Popup";

const EventsAdmin = () => {
    //const { setPopup } = usePopupContext();

    const openAddEventPopup = () => {
        //setPopup(<Popup title="Nieuwe activiteit"><EventPopup /></Popup>);
    }

    return (
        <>
            <div className="admin__top">
                <SectionTitle title="Activiteiten beheren">
                    <p>Maak hier nieuwe activiteiten/evenmenten aan of pas bestaande activiteiten aan.</p>
                </SectionTitle>
                <button onClick={() => openAddEventPopup()} className="button button-admin inherit-font">+ Activiteit toevoegen</button>
            </div>
            {/* <EventsListAdmin/> */}
        </>
    );
}

export default EventsAdmin;