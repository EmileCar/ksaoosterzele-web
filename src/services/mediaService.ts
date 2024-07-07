import API_BASE_URL from "../config";
import ErrorResponse from '../types/ErrorResponse';
import Collage, { SendCollage } from '../types/Collage';
import { formatCustomDate, formatCustomDateTime } from "../utils/datetimeUtil";
import CollageType from "../types/CollageType";

export async function getCollages(all: boolean = false) : Promise<Collage[]> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=collages${all ? "&all=1" : ""}`, {
            method: 'GET',
            credentials: 'include',
        });

        if(!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }

        const data = await response.json();
        const collages = data.map((collageData: any) => new Collage(collageData));
        return collages;
    } catch (error) {
        throw error;
    }
}

export async function getCollage(collageId: number) {
    try {
        const response = await fetch(`${API_BASE_URL}?page=collage&id=${collageId}`, {
            method: 'GET',
            credentials: 'include',
        });

        if(!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }

        const data = await response.json();
        return new Collage(data);
    } catch (error) {
        throw error;
    }
}

export async function getCollageTypes() : Promise<CollageType[]> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=collage_types`, {
            method: 'GET',
            credentials: 'include',
        });

        if(!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }

        const data = await response.json();
        const types = data.map((type: any) => new CollageType(type));
        return types;
    } catch (error) {
        throw error;
    }
}

export async function sendCollage(request: SendCollage, method: string) : Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=collage`, {
            method: method ?? 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            ...request,
            date: formatCustomDate(request.date),
            }),
            credentials: 'include',
        });

        if (!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }
    } catch (error) {
        throw error;
    }
}

export async function uploadImages(id: number, imageFiles: FileList) : Promise<void> {
    try {
        const formData = new FormData();
        for (let i = 0; i < imageFiles.length; i++) {
            formData.append('images[]', imageFiles[i]);
        }

        const response = await fetch(`${API_BASE_URL}?page=collage_images&id=${id}`, {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });

        if (!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }
    } catch (error) {
        throw error;
    }
}

// export async function updateCollage(collageData, imageFiles) {
//     try {
//         const response = await fetch(`${API_BASE_URL}?page=collage`, {
//             method: 'PUT',
//             body: JSON.stringify(collageData),
//             credentials: 'include',
//         });

//         if(!response.ok) {
//             throw new Error('Er is iets misgegaan bij het updaten van de collage.');
//         }

//         if(imageFiles.length > 0) {
//             const formData = new FormData();
//             for (let i = 0; i < imageFiles.length; i++) {
//                 formData.append('images[]', imageFiles[i]);
//             }

//             const responseImages = await fetch(`${API_BASE_URL}?page=collage_images&id=${collageData.id}`, {
//                 method: 'POST',
//                 body: formData,
//                 credentials: 'include',
//             });

//             if (!responseImages.ok) {
//                 throw new Error('Er is iets misgegaan bij het toevoegen van de afbeeldingen.');
//             }

//             return responseImages.json();
//         }
//     } catch (error) {
//         throw error;
//     }
// }


export async function deleteCollage(collageId : number) : Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=collage&id=${collageId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if(!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }
    } catch (error) {
        throw error;
    }
}

export async function deleteImageOfCollage(collageId : number, imageName : string) {
    try {
        const response = await fetch(`${API_BASE_URL}?page=collage_image&id=${collageId}&image=${imageName}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if(!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }
    } catch (error) {
        throw error;
    }
}