import { useNavigate } from "react-router-dom";
import Collage from "../../../types/Collage";
import defaultThumbnail from '../../../assets/img/default.jpg';
import Button from "../../button/Button";
import ConfirmCollageDeletionPopup from "../popups/ConfirmCollageDeletionPopup";
import { usePopupContext } from "../../../contexts/PopupContext";
import CollagePopup from "../popups/CollagePopup";
import './CollageGallery.css';

const CollageGalleryItemAdmin = ({ collage, reload } : { collage: Collage , reload: () => void }) => {
    const { registerPopup } = usePopupContext();
    const navigate = useNavigate();

    const openEditPopup = () => {
        registerPopup(<CollagePopup collage={collage} onClose={reload}/>);
    }

    const openRemovePopup = () => {
        registerPopup(<ConfirmCollageDeletionPopup collage={collage} onClose={reload}/>);
    }

    return (
        <div className="collage-gallery_item collage-gallery_item-admin">
            <img
                src={`../assets/media/collages/${collage.name}/thumbnail.png`}
                alt={collage.name}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultThumbnail;
                }}
            />
            <div>
                <h4>{collage.displayName}</h4>
                {collage.active ? <small className="collage-active">Actief</small> : <small className="collage-active collage-inactive">Niet zichtbaar</small>}
            </div>
            <div className='collage-buttons'>
				<Button icon="pi-pencil" onClick={openEditPopup} darken fullWidth/>
				<Button icon="pi-trash" onClick={openRemovePopup} darken fullWidth customClassName='collage-buttons_button verwijderen'/>
                <Button icon="pi-images" onClick={() => navigate(`/admin/media/${collage.id}`)} darken fullWidth customClassName='collage-buttons_button content'/>
			</div>
        </div>
    );
};

export default CollageGalleryItemAdmin;