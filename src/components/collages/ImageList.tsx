import { useState } from "react";
import "./ImageList.css";
import Collage from "../../types/Collage";
import defaultThumbnail from '../../assets/img/default.jpg';

const ImageList = ({ collage, images, isAdmin = false } : { collage: Collage, images: string[], isAdmin?: boolean }) => {
    const [detail, setDetail] = useState<string | null>()

    const deleteImage = async (imageName: string) => {

    };

    return (
        <>
            <ul className="image-list">
                {collage.images && collage.images.map((image) => (
                    <img
                        key={image}
                        src={`../../assets/media/collages/${collage.name}/thumbnails/${image}`}
                        alt={collage.displayName + " foto"}
                        width={200}
                        height={150}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = defaultThumbnail;
                        }}
                        className="image"
                        onClick={() => setDetail(image)}
                    />
                ))}
            </ul>
            {detail && (
                <div className="overlay overlay-media" onClick={() => setDetail(null)}>
                    <span className="close-media" onClick={() => setDetail(null)}>
                        &times;
                    </span>
                    <img
                        src={`../../assets/media/collages/${collage.name}/${detail}`}
                        alt={collage.displayName + " foto"}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = defaultThumbnail;
                        }}
                        className="detail__image"
                    />
                </div>
            )}
        </>
)}

export default ImageList;