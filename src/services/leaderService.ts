import API_BASE_URL from "../config";
import ErrorResponse from "../types/ErrorResponse";
import { LeadersGroupedResult } from "../types/Leader";

export async function getLeadersOfWorkingYear() : Promise<LeadersGroupedResult> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=working_year_leaders`, {
            method: 'GET',
            credentials: 'include',
        });

        if(!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }

        const data = await response.json();
        const result = new LeadersGroupedResult(data);
        return result;
    } catch (error) {
        throw error;
    }
}


export async function getLeadersByRole() : Promise<LeadersGroupedResult> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=leaders_by_role`, {
            method: 'GET',
            credentials: 'include',
        });

        if(!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }

        const data = await response.json();
        const result = new LeadersGroupedResult(data);
        return result;
    } catch (error) {
        throw error;
    }
}