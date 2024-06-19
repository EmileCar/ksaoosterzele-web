import Collage from "../../../types/Collage";
import CollageType from "../../../types/CollageType";

const CollageGalleryItem = ({ collage } : { collage: Collage }) => {
    return (
        <div className="collage__container">
            <div className="collage__header">
                <h2>{collage.name}</h2>
                <p>{collage.date.toDateString()}</p>
            </div>
            <div className="collage__content">
                <div className="collage__image">
                    <img src={collage.name} alt={collage.name} />
                </div>
                <div className="collage__details">
                    <div className="collage__types">
                        {collage.types.map((type: CollageType) => (
                            <span key={type.id}>{type.name}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollageGalleryItem;