import { useCollageContext } from "../../../contexts/CollageContext";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import Collage from "../../../types/Collage";
import CollageGalleryItem from "./CollageGalleryItem";

const CollageGallery = () => {
    const { pending, error, collages } = useCollageContext();

    return (
        <div className="collages__container">
            <FetchedDataLayout isPending={pending} error={error}>
                {collages && collages.map((collage: Collage) => (
                    <CollageGalleryItem key={collage.id} collage={collage} />
                ))}
            </FetchedDataLayout>
        </div>
    );
}

export default CollageGallery;