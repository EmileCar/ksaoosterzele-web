import './CollageGallery.css';
import { useCollageContext } from "../../../contexts/CollageContext";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import Collage from "../../../types/Collage";
import CollageGalleryItem from "./CollageGalleryItem";
import CollageGalleryItemAdmin from './CollageGalleryItemAdmin';
import GroupedList from '../../groupedList/GroupedList';

const CollageGallery = () => {
    const { pending, error, groupedCollages, isAdmin, refetch } = useCollageContext();

    const renderGroupedCollages = (collage: Collage) => {
        return isAdmin ? (
            <CollageGalleryItemAdmin key={collage.id} collage={collage} reload={refetch} />
        ) : (
            <CollageGalleryItem key={collage.id} collage={collage} />
        )
    }

    return (
        <div className="collages__container">
            <FetchedDataLayout isPending={pending} error={error}>
                {groupedCollages && Object.keys(groupedCollages).length === 0 ? (
                    <p>Er zijn geen collages beschikbaar.</p>
                ) : (
                    <>
                        <GroupedList
                            groupedItems={groupedCollages!}
                            renderItem={renderGroupedCollages}
                            emptyMessage="Er zijn geen collages beschikbaar."
                        />
                    </>
                )}
            </FetchedDataLayout>
        </div>
    );
}

export default CollageGallery;
