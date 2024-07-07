import React, { useCallback, useEffect, useState } from "react";
import "./ImageList.css";
import { deleteImageOfCollage } from "../../services/mediaService";
import useFetch from "../../hooks/useFetch";
import Collage from "../../types/Collage";
import FetchedDataLayout from "../../layouts/FetchedDataLayout";
import Default from '../../assets/img/default.jpg';

const ImageList = ({ collage, images } : { collage: Collage, images: string[] }) => {
    const [detail, setDetail] = useState<string | null>()

    const deleteImage = async (imageName: string) => {
        
    };

    return (
        <ul className="image-list">
            {images.map((image) => (
                <img
                    key={image}
                    src={`../../assets/media/collages/${collage.name}/thumbnails/${image}`}
                    alt={collage.displayName + " foto"}
                    width={200}
                    height={150}
                    onError={(e) => {
                        e.currentTarget.src = Default;
                    }}
                    className="image"
                    onClick={() => setDetail(image)}
                />
            ))}
            {detail && (
                <div className="overlay overlay-media" onClick={() => setDetail(null)}>
                    <span className="close-media" onClick={() => setDetail(null)}>
                        &times;
                    </span>
                    <img
                        src={`../../assets/media/collages/${collage.name}/${detail}`}
                        alt={collage.displayName + " foto"}
                        onError={(e) => {
                            e.currentTarget.src = Default;
                        }}
                        className="detail__image"
                    />
                </div>
            )}
        </ul>
)}

export default ImageList;