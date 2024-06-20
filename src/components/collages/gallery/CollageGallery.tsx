import './CollageGallery.css';
import { useCollageContext } from "../../../contexts/CollageContext";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import Collage from "../../../types/Collage";
import MediaSearchOptions from "../MediaSearchOptions";
import CollageGalleryItem from "./CollageGalleryItem";

const CollageGallery = () => {
    const { pending, error, collages, fetchedCollages } = useCollageContext();

    return (
        <div className="collages__container">
            <FetchedDataLayout isPending={pending} error={error}>
                {fetchedCollages && fetchedCollages.length === 0 ? (
                <p>
                    Er zijn geen collages beschikbaar.
                </p>
                ): (collages && (
                    <>
                        <MediaSearchOptions />
                        <div className="collage_gallery">
                            {
                                collages.length > 0 ? (
                                    collages.map((collage: Collage) => (
                                        <CollageGalleryItem key={collage.id} collage={collage} />
                                    ))
                                ) : (
                                    <p>Geen collages gevonden</p>
                                )
                            }
                        </div>
                    </>
                ))}
            </FetchedDataLayout>
        </div>
    );
}

export default CollageGallery;