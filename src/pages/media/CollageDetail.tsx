import { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCollage } from "../../services/mediaService";
import "./Media.css";
import useFetch from "../../hooks/useFetch";
import PageLayout from "../../layouts/PageLayout";
import FetchedDataLayout from "../../layouts/FetchedDataLayout";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import defaultThumbnail from '../../assets/img/default.jpg';

const CollageDetail = () => {
    const { id } = useParams();
    const fetchEvent = useCallback(() => getCollage(id as unknown as number), [id]);
    const { pending, data: collage, error } = useFetch(fetchEvent);
    const [detail, setDetail] = useState<string | null>(null);

    return (
        <PageLayout>
            <div className="top__nav--buttons">
                <Link to="/media" className="cursive link-back">{"<<Terug naar media"}</Link>
            </div>
            <FetchedDataLayout isPending={pending} error={error}>
                {collage && (
                    <>
                        <SectionTitle title={collage.displayName}>
                            <p>Bekijk hier de fotos en videos van {collage.displayName ?? "deze collage"}</p>
                        </SectionTitle>
                        <div className="page__section--content">
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
                        </div>
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
            </FetchedDataLayout>
        </PageLayout>
    );
}

export default CollageDetail;