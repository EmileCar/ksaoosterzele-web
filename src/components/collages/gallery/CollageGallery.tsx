import './CollageGallery.css';
import { useCollageContext } from "../../../contexts/CollageContext";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import Collage from "../../../types/Collage";
import CollageGalleryItem from "./CollageGalleryItem";
import CollageGalleryItemAdmin from './CollageGalleryItemAdmin';

const CollageGallery = () => {
    const { pending, error, collages, fetchedCollages, isAdmin, refetch } = useCollageContext();

    return (
        <div className="collages__container">
            <FetchedDataLayout isPending={pending} error={error}>
                {fetchedCollages && fetchedCollages.length === 0 ? (
                <p>
                    Er zijn geen collages beschikbaar.
                </p>
                ): (collages && (
                    <>
                        <div className="collage_gallery">
                            {
                                collages.length > 0 ? (
                                    collages.map((collage: Collage) => (
                                        isAdmin ? (
                                            <CollageGalleryItemAdmin key={collage.id} collage={collage} reload={refetch}/>
                                        ) : (
                                            <CollageGalleryItem key={collage.id} collage={collage} />
                                        )
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