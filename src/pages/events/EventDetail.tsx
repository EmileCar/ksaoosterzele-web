import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { getEvent } from "../../services/eventService";
import useFetch from "../../hooks/useFetch";
import PageLayout from "../../layouts/PageLayout";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import "./Events.css";
import FetchedDataLayout from "../../layouts/FetchedDataLayout";
import { formatDate, formatTime, isDatabaseDateTimeInPast, isDateTimeInPast } from "../../utils/datetimeUtil";
import EventInfo from "../../components/events/EventInfo";

const EventDetail = () => {
		const { id } = useParams();
		const fetchEvent = useCallback(() => getEvent(id as unknown as number), [id]);
		const { pending, data: event, error } = useFetch(fetchEvent);

		return (
			<PageLayout>
				<div className="top__nav--buttons">
					<Link to="/evenementen" className="cursive">{`<< Terug naar activiteiten`}</Link>
				</div>
				<FetchedDataLayout isPending={pending} error={error}>
					<div className="eventDetail-container">
						{event && (
							<>
								<img
									src={`../assets/events/${event.imageFileName}`}
									alt={event.name}
								/>
								<div className="info-side">
									<div className="event__info">
										<SectionTitle title={event.name}>
											<EventInfo event={event} />
										</SectionTitle>
										<div className="event__content">
											<p>{event.description}</p>
										</div>
									</div>
									<div className="event__content">
										{event.url && (
											<a href={event.url} className="event__detail url cursive">
												{"Link naar evenement >>"}
											</a>
										)}
									</div>
								</div>
							</>
						)}
					</div>
				</FetchedDataLayout>
			</PageLayout>
		);
};

export default EventDetail;