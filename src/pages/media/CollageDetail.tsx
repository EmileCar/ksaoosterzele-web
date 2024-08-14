import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { getCollage } from "../../services/mediaService";
import useFetch from "../../hooks/useFetch";
import PageLayout from "../../layouts/PageLayout";
import FetchedDataLayout from "../../layouts/FetchedDataLayout";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import ImageList from "../../components/collages/ImageList";
import ReturnLink from "../../components/returnlink/ReturnLink";

const CollageDetail = () => {
    const { id } = useParams();
    const fetchEvent = useCallback(() => getCollage(id as unknown as number), [id]);
    const { pending, data: collage, error } = useFetch(fetchEvent);

    return (
        <PageLayout>
            <ReturnLink url="/media" text="Terug naar media" />
            <FetchedDataLayout isPending={pending} error={error}>
                {collage && (
                    <>
                        <SectionTitle title={collage.displayName}>
                            <p>Bekijk hier de fotos en videos van {collage.displayName ?? "deze collage"}</p>
                        </SectionTitle>
                        <div className="page__section--content">
                            <ImageList collage={collage} images={collage.images ?? []} />
                        </div>
                    </>
                )}
            </FetchedDataLayout>
        </PageLayout>
    );
}

export default CollageDetail;