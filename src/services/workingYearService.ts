import API_BASE_URL from "../config";
import ErrorResponse from "../types/ErrorResponse";
import WorkingYear from "../types/WorkingYear";

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
