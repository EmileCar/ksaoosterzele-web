
import EventsList from "../../components/events/eventsList/EventsList";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import PageLayout from "../../layouts/PageLayout";

const Events = () => {
	return (
		<PageLayout>
			<SectionTitle title="Evenementen">
				<p>
					Hier kun je onze alle activiteiten en evenementen zien die wij
					organiseren, klik op een activiteit om meer informatie te krijgen!
				</p>
				<div className="events__text">
					<p>Het ledenboekje van dit semester vind je hier:</p>
					<a
						href="assets/ledenboekjes/ksaboekje-sep-dec-2023.pdf"
						className="cursive"
						download
					>
						KSA prikbordboekje september-december 2023.pdf
					</a>
				</div>
			</SectionTitle>
			<div className="page__section--content">
				<EventsList />
			</div>
		</PageLayout>
	);
};

export default Events;
