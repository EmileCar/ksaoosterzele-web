import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../config';
import ErrorResponse from '../../types/ErrorResponse';

interface ImageUploaderProps {
    existingImagePath?: string;
    destination?: string;
    onImageSelect: (file: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ existingImagePath, destination = '', onImageSelect }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(existingImagePath ? `../assets/${destination}/${existingImagePath}` : null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (previewUrl && imageFile) {
            checkIfImageAlreadyExists().catch((error) => {
                console.log(error);
                setError(error.message);
            });
        }
    }, [previewUrl]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            onImageSelect(file);
        } else {
            onImageSelect(null);
        }
    };

    const checkIfImageAlreadyExists = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}?page=check_if_image_exists&folder=${destination}&name=${imageFile?.name}`, {
                method: 'GET',
                credentials: 'include',
            });

            if(!response.ok) {
                throw await ErrorResponse.createFromResponse(response);
            }

            const data = await response.json();

            if (data.exists) {
                setError('Afbeelding met deze naam bestaat al');
            } else {
                setError(null);
            }
        } catch (error) {
            throw error;
        }
    };

    return (
        <>
            <div className="input image-uploader">
                <input className='inherit-font' type="file" accept="image/*" onChange={handleImageChange} />
                {previewUrl && (
                    <div className="image-preview__container">
                        <i className='pi pi-image image-preview-icon'></i>
                        <img className='image-preview' src={previewUrl} alt="Preview" />
                    </div>
                )}
            </div>
            {existingImagePath && <p className="" style={{ display: 'block', fontWeight: 200}}>Huidige afbeelding: {existingImagePath}</p>}
            {error && <p className="error-image" style={{ display: 'block'}}>{error}</p>}
        </>
    );
};

export default ImageUploader;