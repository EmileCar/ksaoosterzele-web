import '../../media/Media.css';
import { useState } from "react";
import Button from "../../../components/button/Button";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import MediaItemPopup from "../../../components/collages/popups/CollagePopup";
import { useCollageContext } from '../../../contexts/CollageContext';
import MediaSearchOptions from '../../../components/collages/MediaSearchOptions';
import CollageGallery from '../../../components/collages/gallery/CollageGallery';

const MediaAdmin = () => {
	const { fetchedCollages, refetch, showSearchOptions, setShowSearchOptions, ToggleMediaSearchButton } = useCollageContext();
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
				<ToggleMediaSearchButton />
				<Button text="+ Collage toevoegen" onClick={() => setShowCreatePopup(true)} hover />
				<div className="media__search-options--admincontainer">
					{fetchedCollages && fetchedCollages.length > 0 && <MediaSearchOptions />}
				</div>
			</div>
			<CollageGallery />
			{showCreatePopup && <MediaItemPopup onClose={closeHandler} />}
		</>
	);
};

export default MediaAdmin;