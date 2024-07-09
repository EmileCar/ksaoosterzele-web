import './CollageGallery.css';
import { useCollageContext } from "../../../contexts/CollageContext";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import Collage from "../../../types/Collage";
import CollageGalleryItem from "./CollageGalleryItem";
import CollageGalleryItemAdmin from './CollageGalleryItemAdmin';

const CollageGallery = () => {
    const { pending, error, groupedCollages, isAdmin, refetch } = useCollageContext();

    const renderGroupedCollages = () => {
        return Object.keys(groupedCollages).map(groupKey => (
            <div key={groupKey} className="collage_group">
                <h3>{groupKey}</h3>
                <div className="collage_gallery horizontal-scroll">
                    {
                        groupedCollages[groupKey].map((collage: Collage) => (
                            isAdmin ? (
                                <CollageGalleryItemAdmin key={collage.id} collage={collage} reload={refetch} />
                            ) : (
                                <CollageGalleryItem key={collage.id} collage={collage} />
                            )
                        ))
                    }
                </div>
            </div>
        ));
    }

    return (
        <div className="collages__container">
            <FetchedDataLayout isPending={pending} error={error}>
                {groupedCollages && Object.keys(groupedCollages).length === 0 ? (
                    <p>Er zijn geen collages beschikbaar.</p>
                ) : (
                    <>
                        {renderGroupedCollages()}
                    </>
                )}
            </FetchedDataLayout>
        </div>
    );
}

export default CollageGallery;
