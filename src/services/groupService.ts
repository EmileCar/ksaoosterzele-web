import API_BASE_URL from "../config";
import ErrorResponse from "../types/ErrorResponse";
import Group from "../types/Group";

export async function getGroups(select?: boolean): Promise<Group[]> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=groups${select? '&select=true' : ''}`, {
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
