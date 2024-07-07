import { useParams } from "react-router-dom";
import "./Media.css"
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import { useCallback, useRef, useState } from "react";
import { getCollage, uploadImages } from "../../../services/mediaService";
import useFetch from "../../../hooks/useFetch";
import Label from "../../../components/form/Label";
import ImageList from "../../../components/collages/ImageList";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import Form from "../../../components/form/Form";
import Button from "../../../components/button/Button";

const CollageMedia = () => {
    const { id } = useParams();
    const fetchCollage = useCallback(() => getCollage(id as unknown as number), [id]);
    const { pending, data: collage, error } = useFetch(fetchCollage);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [totalSize, setTotalSize] = useState(0);
    const [uploadingError, setUploadingError] = useState<string | null>(null);
    const [uploadingPending, setUploadingPending] = useState<boolean>(false)

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

    const uploadImagesFunc = async () => {
        if(fileInputRef.current){
            const selectedFiles = fileInputRef.current.files;

            await uploadImages(collage?.id!, selectedFiles!).then(() => {
                console.log("log")
            }).catch((error) => {
                setUploadingError(error.message)
            })
        }
    }

    return (
        <>
            <SectionTitle title={collage?.name || "Collage media"}>
                <p>Voeg fotos toe of pas de collage van inhoud aan.</p>
            </SectionTitle>
            <FetchedDataLayout isPending={pending} error={error}>
                {collage &&
                    <>
                        <Form customClassName="upload-form">
                            {uploadingError && <p className="error">{uploadingError}</p>}
                            <Label text={`Voeg afbeeldingen toe`} errorMessage={""}>
                                <input ref={fileInputRef} style={{cursor: "pointer"}} type="file" name="images" accept="image/*,video/mp4,video/x-m4v,video/*" multiple className="input inherit-font" onChange={handleFileInputChange} />
                            </Label>
                            {totalSize > 0 && (
                                <>
                                    <p>Te uploaden grootte: {(totalSize / (1024 * 1024)).toFixed(2)} MB</p>
                                    <Button text="Uploaden" onClick={() => uploadImagesFunc()} darken/>
                                </>
                            )}
                        </Form>
                        <ImageList collage={collage} images={collage.images!} />
                    </>
                }
            </FetchedDataLayout>
        </>

    );
}

export default CollageMedia;