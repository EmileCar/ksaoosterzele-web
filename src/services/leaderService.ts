import API_BASE_URL from "../config";
import ErrorResponse from "../types/ErrorResponse";
import { ChangeLeaderGroup, LeaderGroup, LeaderRole, LeadersGroupedResult, SendLeader } from "../types/Leader";
import { formatCustomDate } from "../utils/datetimeUtil";

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
            body: JSON.stringify({
                ...request,
                birthdate: formatCustomDate(request.birthdate),
            }),
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
        const response = await fetch(`${API_BASE_URL}?page=leader_role&leader_id=${leaderId}&role_id=${roleId}`, {
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

export async function changeGroupOfLeader(request: ChangeLeaderGroup) : Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=leader_group${request.leaderId ? `&leader_id=${request.leaderId}` : ''}${request.groupId ? `&group_id=${request.groupId}` : ''}`, {
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

export async function getLeaderGroups(leaderId: number) : Promise<LeaderGroup[]> {
    try {
        const response = await fetch(`${API_BASE_URL}?page=leader_groups&leader_id=${leaderId}`, {
            method: 'GET',
            credentials: 'include',
        });

        if(!response.ok) {
            throw await ErrorResponse.createFromResponse(response);
        }

        const data = await response.json();
        const leaderGroups =  data.map((leaderGroup: any) => new LeaderGroup(leaderGroup));
        return leaderGroups;
    } catch (error) {
        throw error;
    }
}