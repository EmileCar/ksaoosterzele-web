import '../../media/Media.css';
import { useCallback, useState } from "react";
import Button from "../../../components/button/Button";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import { getCollages } from "../../../services/mediaService";
import useFetch from "../../../hooks/useFetch";
import Collage from "../../../types/Collage";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import MediaItemPopup from "../../../components/collages/popups/CollagePopup";
import CollageGalleryItemAdmin from "../../../components/collages/gallery/CollageGalleryItemAdmin";
import { useCollageContext } from '../../../contexts/CollageContext';
import MediaSearchOptions from '../../../components/collages/MediaSearchOptions';

const MediaAdmin = () => {
	const { pending, error, collages, fetchedCollages, refetch, showSearchOptions, setShowSearchOptions } = useCollageContext();
	const [showCreatePopup, setShowCreatePopup] = useState(false);

	const closeHandler = () => {
		setShowCreatePopup(false);
		refetch();
	}

	return (
		<>
			<SectionTitle title="Media beheren">
				<p>Maak hier nieuwe collages aan of pas bestaande collages aan.</p>
			</SectionTitle>
			<div className="admin__actions">
				{fetchedCollages && fetchedCollages.length > 0 && (
					<Button
						text=" Zoekopties"
						onClick={() => setShowSearchOptions(!showSearchOptions)}
						icon={showSearchOptions ? "pi pi-angle-double-up" : "pi pi-angle-double-down"}
						hover
					/>
				)}
				<Button text="+ Collage toevoegen" onClick={() => setShowCreatePopup(true)} hover />
				<div className="media__search-options--admincontainer">
					{fetchedCollages && fetchedCollages.length > 0 && <MediaSearchOptions />}
				</div>
			</div>
			<FetchedDataLayout isPending={pending} error={error}>
				{fetchedCollages && fetchedCollages.length === 0 && (
					<p>
						Er zijn nog geen collages aangemaakt.
					</p>
				)}
				<div className="collage_gallery">
					{
						collages && collages.length > 0 ? (
							collages.map((collage: Collage) => (
								<CollageGalleryItemAdmin key={collage.id} collage={collage} reload={closeHandler} />
							))
						) : (
							<p>Geen collages gevonden</p>
						)
					}
				</div>
			</FetchedDataLayout>
			{showCreatePopup && <MediaItemPopup onClose={closeHandler} />}
		</>
	);
};

export default MediaAdmin;