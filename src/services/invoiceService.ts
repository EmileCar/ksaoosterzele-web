import API_BASE_URL from "../config";
import ErrorResponse from "../types/ErrorResponse";
import Event, { SendEvent } from "../types/Event";
import { InvoiceSummary, SendInvoice } from "../types/Invoice";
import { formatCustomDateTime } from "../utils/datetimeUtil";

export async function getInvoiceSummary(): Promise<InvoiceSummary[]> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=invoice_summary`, {
            method: 'GET',
            credentials: 'include',
        });

        if(!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }

        const data = await response.json();
        const invoiceSummaries = data.map((data: any) => new InvoiceSummary(data));
        return invoiceSummaries;
    } catch (error) {
        throw error;
    }
}

export async function sendInvoice(request: SendInvoice, method: string) : Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=invoice`, {
            method: method ?? 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            ...request,
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

export async function getEvent(id: number): Promise<Event> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=event&id=${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }

        const data = await response.json();
        return new Event(data);
    } catch (error) {
        throw error;
    }
}

export async function getImagePaths(): Promise<string[]> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=event_images`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }

        const data = response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Er was een probleem bij het ophalen van de afbeeldingen.');
    }
}

export async function deleteEvent(id: number): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=event&id=${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }
    } catch (error) {
        throw error;
    }
}

export async function getAdminEvents(getPastEvents?: boolean): Promise<Event[]> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=all_events${getPastEvents ? '&past=true' : ''}`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }

        const data = await response.json();
        const events = data.map((eventData: any) => new Event(eventData));
        return events;
    } catch (error) {
        throw new Error('Er was een probleem bij het ophalen van de activiteiten.');
    }
}