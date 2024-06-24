import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import EventsListAdmin from "../../../components/events/list/EventsListAdmin";

const EventsAdmin = () => {
    return (
        <>
            <div className="admin__top">
                <SectionTitle title="Evenementen beheren">
                    <p>Maak hier nieuwe activiteiten/evenmenten aan of pas bestaande activiteiten aan.</p>
                </SectionTitle>
            </div>
            <EventsListAdmin />
        </>
    );
}

export default EventsAdmin;