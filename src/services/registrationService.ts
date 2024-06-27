import API_BASE_URL from "../config";
import ErrorResponse from '../types/ErrorResponse';
import Registration, { SendRegistration } from "../types/Registration";

export async function sendInschrijving(request: SendRegistration) {
    try {
        const response = await fetch(`${API_BASE_URL}?page=registration`, {
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

export async function getRegistrations() : Promise<Registration[]> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=registrations`, {
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
        const registrations = data.map((registration: any) => new Registration(registration));
        return registrations;
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