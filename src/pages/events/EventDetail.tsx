import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../../services/eventService";
import useFetch from "../../hooks/useFetch";
import PageLayout from "../../layouts/PageLayout";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import "./Events.css";
import FetchedDataLayout from "../../layouts/FetchedDataLayout";
import EventInfo from "../../components/events/EventInfo";
import ReturnLink from "../../components/returnlink/ReturnLink";

const EventDetail = () => {
		const { id } = useParams();
		const fetchEvent = useCallback(() => getEvent(id as unknown as number), [id]);
		const { pending, data: event, error } = useFetch(fetchEvent);

		return (
			<PageLayout>
				<ReturnLink url="/events" text="Terug naar evenementen" />
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