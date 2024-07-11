import { Link } from "react-router-dom";
import Collage from "../../../types/Collage";
import defaultThumbnail from '../../../assets/img/default.jpg';

const CollageGalleryItem = ({ collage } : { collage: Collage }) => {
    return (
        <Link to={`/collage/${collage.id}`} className="collage-gallery_item">
            <img
                src={`assets/media/collages/${collage.name}/thumbnail.png`}
                alt={collage.name}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultThumbnail;
                }}
            />
            <h3>{collage.displayName}</h3>
        </Link>
    );
};

export default CollageGalleryItem;