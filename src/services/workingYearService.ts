import API_BASE_URL from "../config";
import ErrorResponse from "../types/ErrorResponse";
import WorkingYear, { SendWorkingYear } from "../types/WorkingYear";

export async function getWorkingYears() : Promise<WorkingYear[]> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=working_years`, {
            method: 'GET',
            credentials: 'include',
        });

        if(!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }

        const data = await response.json();
        const result = data.map((workingYearData: any) => new WorkingYear(workingYearData));
        return result;
    } catch (error) {
        throw error;
    }
}

export async function sendWorkingYear(request: SendWorkingYear, method: string) : Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=working_years`, {
            method: method ?? 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(request),
        });

        if(!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }
    } catch (error) {
        throw error;
    }
}
