import React, { useCallback, useEffect, useState } from "react";
import "./ImageList.css";
import { deleteImageOfCollage, getImagesOfCollage } from "../../services/mediaService";
import useFetch from "../../hooks/useFetch";
import Collage from "../../types/Collage";
import FetchedDataLayout from "../../layouts/FetchedDataLayout";

const ImageList = ({ collage, setErrorStates } : { collage: Collage, setErrorStates: any }) => {
    const fetchCollageImages = useCallback(() => getImagesOfCollage(collage.id as unknown as number), [collage]);
    const { pending, data: images, error, refetch } = useFetch(fetchCollageImages);

    const deleteImage = async (imageName: string) => {
        await deleteImageOfCollage(collage.id!, imageName).catch((error) => {
            setErrorStates({ global: error.message });
        })
    };

    return (
        <FetchedDataLayout isPending={pending} error={error}>
            {images && images.map((image: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined, index: React.Key | null | undefined) => {
                return (
                    <div key={index} className={`image ${(pending === image) && "disabled"}`} style={{ position: "relative" }}>
                        <img
                            src={`../assets/media/collages/${collage.name}/thumbnails/${image}`}
                            alt={image as string}
                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { (e.target as HTMLImageElement).src = "default" }}
                        />
                        <div>
                            <p>{image}</p>
                            <p className="delete" onClick={() => deleteImage(image as string)}>Verwijder</p>
                        </div>
                    </div>
                );
            })}
        </FetchedDataLayout>
    );
}

export default ImageList;