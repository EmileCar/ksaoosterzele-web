import API_BASE_URL from "../config";
import ErrorResponse from "../types/ErrorResponse";
import Group from "../types/Group";

export async function getGroups(): Promise<Group[]> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=groups`, {
            method: 'GET',
            credentials: 'include',
        });

        if(!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }

        const data = await response.json();
        const groups = data.map((groupData: any) => new Group(groupData));
        return groups;
    } catch (error) {
        throw error;
    }
}
