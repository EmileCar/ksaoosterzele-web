import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { getEvent } from "../../services/eventService";
import useFetch from "../../hooks/useFetch";
import PageLayout from "../../layouts/PageLayout";
import SectionTitle from "../../components/sectionTitle/SectionTitle";

const EventDetail = () => {
    const { id } = useParams();
    const fetchEvent = useCallback(() => getEvent(id as unknown as number), [id]);
    const { pending, data: event, error } = useFetch(fetchEvent);

    return (
        <PageLayout>
            {pending && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="top__nav--buttons">
                <Link to="/evenementen" className="cursive">{`<< Terug naar activiteiten`}</Link>
            </div>
            <div className="page--event__detail">
          {event && (
            <>
              <div className="event__image">
                <img src={event.imageFileName} alt={event.name} />
              </div>
              <div className="right-side">
                <div className="event__info">
                  <SectionTitle title={event.name} />
                  <div className="event__details">
                    {event.datetime ? (
                      <p className="event__detail date">{event.datetime.toString()}</p>
                    ) : (
                      <p className="event__detail date">???</p>
                    )}
                    {/* {event.time && <p className="event__detail time">{event.time}</p>} */}
                    {event.location ? (
                      <p className="event__detail location">{event.location}</p>
                    ) : (
                      <p className="event__detail location">???</p>
                    )}
                    {/* {new Date(event.timestamp).getDate() + 1 > new Date() && (
                      <p className="event__detail urgent">Deze activiteit is in het verleden</p>
                    )} */}
                    {event.description && (
                      <p className="event__detail description">{event.description}</p>
                    )}
                  </div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  {event.url && (
                    <a href={event.url} className="event__detail url cursive">
                      Facebook link
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        </PageLayout>
    );
};

export default EventDetail;