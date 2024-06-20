import API_BASE_URL from "../config";
import ErrorResponse from '../types/ErrorResponse';
import Collage from '../types/Collage';

export async function getCollages(all: boolean = false) {
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

export async function getCollageTypes() {
    try {
        const response = await fetch(`${API_BASE_URL}?page=collage_types`, {
            method: 'GET',
            credentials: 'include',
        });

        if(!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

// export async function getCollage(collageId) {
//     try {
//         const response = await fetch(`${API_BASE_URL}?page=collage&id=${collageId}`, {
//             method: 'GET',
//             credentials: 'include',
//         });

//         if(!response.ok) {
//             throw await ErrorResponseModel.createFromResponse(response);
//         }

//         const data = await response.json();
//         return new CollageModel(data);
//     } catch (error) {
//         throw error;
//     }
// }

// export async function addCollage(collageData) {
//     try {
//         const response = await fetch(`${API_BASE_URL}?page=collage`, {
//             method: 'POST',
//             body: JSON.stringify(collageData),
//             credentials: 'include',
//         });

//         if(!response.ok) {
//             throw await ErrorResponseModel.createFromResponse(response);
//         }

//         return response.json();
//     } catch (error) {
//         throw error;
//     }
// }

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


// export async function deleteCollage(collageId) {
//     try {
//         const response = await fetch(`${API_BASE_URL}?page=collage&id=${collageId}`, {
//             method: 'DELETE',
//             credentials: 'include',
//         });

//         if(!response.ok) {
//             throw await ErrorResponseModel.createFromResponse(response);
//         }
//     } catch (error) {
//         throw error;
//     }
// }

// export async function getImagesOfCollage(collageId) {
//     try {
//         const response = await fetch(`${API_BASE_URL}?page=collage_images&id=${collageId}`, {
//             method: 'GET',
//             credentials: 'include',
//         });

//         return response.json();
//     } catch (error) {
//         throw error;
//     }
// }

// export async function deleteImageOfCollage(collageId, imageName) {
//     try {
//         const response = await fetch(`${API_BASE_URL}?page=collage_image&id=${collageId}&image=${imageName}`, {
//             method: 'DELETE',
//             credentials: 'include',
//         });

//         if(!response.ok) {
//             throw await ErrorResponseModel.createFromResponse(response);
//         }
//     } catch (error) {
//         throw error;
//     }
// }