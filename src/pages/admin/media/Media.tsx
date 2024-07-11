import '../../media/Media.css';
import Button from "../../../components/button/Button";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import CollagePopup from "../../../components/collages/popups/CollagePopup";
import { useCollageContext } from '../../../contexts/CollageContext';
import MediaSearchOptions from '../../../components/collages/MediaSearchOptions';
import CollageGallery from '../../../components/collages/gallery/CollageGallery';
import CollageTypesPopup from '../../../components/collages/popups/CollageTypePopup';
import { usePopupContext } from '../../../contexts/PopupContext';

const MediaAdmin = () => {
	const { fetchedCollages, refetch, ToggleMediaSearchButton } = useCollageContext();
	const { registerPopup } = usePopupContext();

	const openCreatePopup = () => {
		registerPopup(<CollagePopup onClose={refetch} />);
	}

	const openCollageTypesPopup = () => {
		registerPopup(<CollageTypesPopup/>);
	}

	return (
		<>
			<SectionTitle title="Media beheren">
				<p>Maak hier nieuwe collages aan of pas bestaande collages aan.</p>
			</SectionTitle>
			<div className="admin__actions">
				<Button text="+ Collage toevoegen" onClick={openCreatePopup} hover />
				<Button text="Collage types beheren" onClick={openCollageTypesPopup} hover />
				<ToggleMediaSearchButton />
				<div className="media__search-options--admincontainer">
					{fetchedCollages && fetchedCollages.length > 0 && <MediaSearchOptions />}
				</div>
			</div>
			<CollageGallery />
		</>
	);
};

export default MediaAdmin;