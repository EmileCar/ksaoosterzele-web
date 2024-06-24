import API_BASE_URL from "../config";
import ErrorResponse from "../types/ErrorResponse";
import Account from "../types/Account";

export async function getAccount(): Promise<Account | null> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=account`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }

        if (response.status === 204) {
            return null;
        }

        const data = await response.json();
        const account = new Account(data);
        return account;
    } catch (error) {
        throw error;
    }
}

export async function validateCredentials(username: string, password: string): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=validate_credentials`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
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

export async function logout(): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=remove_credentials`, {
            credentials: 'include',
            method: 'DELETE',
        });

        if (!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }
    } catch (error) {
        throw error;
    }
}