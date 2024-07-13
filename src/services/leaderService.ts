import API_BASE_URL from "../config";
import ErrorResponse from "../types/ErrorResponse";
import { LeadersByRoleResult } from "../types/Leader";

export async function getLeadersByRole() : Promise<LeadersByRoleResult> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=working_year_leaders`, {
            method: 'GET',
            credentials: 'include',
        });

        if(!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }

        const data = await response.json();
        const result = new LeadersByRoleResult(data);
        return result;
    } catch (error) {
        throw error;
    }
}
