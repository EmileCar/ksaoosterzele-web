import { Link } from "react-router-dom";
import Collage from "../../../types/Collage";
import CollageType from "../../../types/CollageType";
import defaultThumbnail from '../../../assets/img/default.jpg';
import { useState } from "react";
import Button from "../../button/Button";
import MediaItemPopup from "../popups/MediaItemPopup";
import ConfirmCollageDeletionPopup from "../popups/ConfirmCollageDeletionPopup";

const CollageGalleryItemAdmin = ({ collage, reload } : { collage: Collage , reload: () => void }) => {
    const [showChangePopup, setShowChangePopup] = useState<boolean>(false);
	const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);

    const handlePopupClose = () => {
		setShowChangePopup(false);
		setShowDeletePopup(false);
		reload();
	};

    return (
        <div className="collage-gallery_item collage-gallery_item-admin">
            <img
                src={`assets/media/collages/${collage.name}/thumbnail.png`}
                // src={`${isAdmin ? "../" : ""}assets/media/collages/${collage.name}/thumbnail.png`}
                alt={collage.name}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultThumbnail;
                }}
            />
            <div>
                <h3>{collage.displayName}</h3>
                {collage.active ? <small className="collage-active">Actief</small> : <small className="collage-active collage-inactive">Niet zichtbaar</small>}
            </div>
            <div className='collage-buttons'>
				<Button text="Aanpassen" onClick={() => setShowChangePopup(true)} darken fullWidth/>
				<Button text="Verwijderen" onClick={() => setShowDeletePopup(true)} darken fullWidth customClassName='collage-buttons_button verwijderen'/>
			</div>
            {showChangePopup && <MediaItemPopup collage={collage} onClose={handlePopupClose} />}
            {showDeletePopup && <ConfirmCollageDeletionPopup collage={collage} onClose={handlePopupClose} />}
        </div>
    );
};

export default CollageGalleryItemAdmin;