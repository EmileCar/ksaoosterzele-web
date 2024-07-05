import { useParams } from "react-router-dom";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import { useCallback, useRef, useState } from "react";
import { getCollage } from "../../../services/mediaService";
import useFetch from "../../../hooks/useFetch";
import Label from "../../../components/form/Label";
import ImageList from "../../../components/collages/ImageList";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";

const CollageMedia = () => {
    const { id } = useParams();
    const fetchCollage = useCallback(() => getCollage(id as unknown as number), [id]);
    const { pending, data: collage, error } = useFetch(fetchCollage);
    const fileInputRef = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const [errorStates, setErrorStates] = useState({});

    const handleFileInputChange = (e: any) => {
        const files = e.target.files;
        setTotalSize(calculateTotalSize(files));
    };

    const calculateTotalSize = (files : any) => {
        let total = 0;
        for (let i = 0; i < files.length; i++) {
            total += files[i].size;
        }
        return total;
    };

    return (
        <>
            <div className="admin__top">
                <SectionTitle title={collage?.name || "Collage media"}>
                    <p>Voeg fotos toe of pas de collage van inhoud aan.</p>
                </SectionTitle>
            </div>
            <FetchedDataLayout isPending={pending} error={error}>
                {collage ?
                    <>
                        <Label text={`Voeg afbeeldingen toe`} errorMessage={""}>
                            <input ref={fileInputRef} type="file" name="images" accept="image/*,video/mp4,video/x-m4v,video/*" multiple className="input" onChange={handleFileInputChange} />
                        </Label>
                        {totalSize > 0 && (
                            <p>Te uploaden grootte: {(totalSize / (1024 * 1024)).toFixed(2)} MB</p>
                        )}
                        <ImageList collage={collage} setErrorStates={setErrorStates} />
                    </>
                :
                    <>
                        <p className="error">De collage is niet gevonden</p>
                    </>
            }
            </FetchedDataLayout>
        </>

    );
}

export default CollageMedia;