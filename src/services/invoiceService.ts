import API_BASE_URL from "../config";
import ErrorResponse from "../types/ErrorResponse";
import Event, { SendEvent } from "../types/Event";
import Invoice, { InvoiceSummary, SendInvoice } from "../types/Invoice";
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

export async function getInvoicesOfLeader(leaderId: number): Promise<Invoice[]> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=invoices_leader&leader_id=${leaderId}`, {
            method: 'GET',
            credentials: 'include',
        });

        if(!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }

        const data = await response.json();
        const invoices = data.map((data: any) => new Invoice(data));
        return invoices;
    } catch (error) {
        throw error;
    }
}