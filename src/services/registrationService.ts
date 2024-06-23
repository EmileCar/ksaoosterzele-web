import API_BASE_URL from "../config";
import ErrorResponse from '../types/ErrorResponse';
import Registration, { SendRegistration } from "../types/Registration";

export async function sendInschrijving(request: SendRegistration) {
    try {
        const response = await fetch(`${API_BASE_URL}?page=inschrijving`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if(!response.ok){
            throw await ErrorResponse.createFromResponse(response);
        }
    } catch (error) {
        throw error;
    }
}

export async function getInschrijvingen() {
    try {
        const response = await fetch(`${API_BASE_URL}?page=inschrijvingen`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function updateInschrijving(registration: Registration) {
    try {
        const response = await fetch(`${API_BASE_URL}?page=inschrijving`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(registration),
        });

        if (!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }
    } catch (errors) {
        throw errors;
    }
}