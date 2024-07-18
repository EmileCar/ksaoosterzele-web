import API_BASE_URL from "../config";
import ErrorResponse from "../types/ErrorResponse";
import { LeaderRole, LeadersGroupedResult, SendLeader } from "../types/Leader";

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

export async function sendLeader(request: SendLeader, method: string) : Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=leader`, {
            method: method ?? 'POST',
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

export async function getLeaderRoles() : Promise<LeaderRole[]> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=leader_roles`, {
            method: 'GET',
            credentials: 'include',
        });

        if(!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }

        const data = await response.json();
        const roles =  data.map((role: any) => new LeaderRole(role));
        return roles;
    } catch (error) {
        throw error;
    }
}


export async function changeRoleOfLeader(leaderId: number, roleId: number) : Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=leader&leader_id=${leaderId}&role_id=${roleId}`, {
            method: 'PATCH',
            credentials: 'include',
        });

        if(!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }
    } catch (error) {
        throw error;
    }
}