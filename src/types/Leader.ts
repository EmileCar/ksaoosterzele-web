import Group from "./Group";

class LeadersGroupedResult {
    [role: string]: Leader[];

    constructor(data: { [role: string]: any[] }) {
        for (const role in data) {
            if (data.hasOwnProperty(role)) {
                this[role] = data[role].map(leader => new Leader(leader));
            }
        }
    }
}

class Leader {
    id: number | null;
    firstName: string;
    lastName: string;
    birthdate: Date | null;
    phoneNumber: string | null;
    email: string | null;
    imageFileName: string | null;
    description: string | null;
    role_id: number;
    group: Group | null;

    constructor(leaderData?: any) {
        this.id = leaderData.id || null;
        this.firstName = leaderData.first_name || null;
        this.lastName = leaderData.last_name || null;
        this.birthdate = leaderData.birthdate || null;
        this.phoneNumber = leaderData.phone_number || null;
        this.email = leaderData.email || null;
        this.imageFileName = leaderData.image_file_name || null;
        this.description = leaderData.description || null;
        this.role_id = leaderData.role_id || null;
        this.group = leaderData.group ? new Group(leaderData.group) : null;
    }
}

class SendLeader {
    id: number | null;
    firstName: string;
    lastName: string;
    birthdate: Date;
    phoneNumber: string;
    email: string;
    imageFileName: string;
    description: string;
    roleId: number;

    constructor(leaderData?: any) {
        this.id = leaderData.id || null;
        this.firstName = leaderData.firstName || null;
        this.lastName = leaderData.lastName || null;
        this.birthdate = leaderData.birthdate ? new Date(leaderData.birthdate) : new Date();
        this.phoneNumber = leaderData.phoneNumber || null;
        this.email = leaderData.email || null;
        this.imageFileName = leaderData.imageFileName || null;
        this.description = leaderData.description || null;
        this.roleId = leaderData.role_id || 1;
    }
}

class LeaderRole {
    id: number | null;
    name: string;

    constructor(leaderRoleData?: any) {
        this.id = leaderRoleData.id || null;
        this.name = leaderRoleData.name || null;
    }
}

class LeaderGroup {
    id: number | null;
    name: string;
    workingYearName: string;

    constructor(leaderRoleData?: any) {
        this.id = leaderRoleData.id || null;
        this.name = leaderRoleData.group || null;
        this.workingYearName = leaderRoleData.working_year || null;
    }
}

class ChangeLeaderGroup {
    leaderId: number;
    groupId: number;

    constructor(data: any) {
        this.leaderId = data.id || null;
        this.groupId = data.group && data.group.id || null;
    }
}

export default Leader;
export { LeadersGroupedResult, SendLeader, LeaderRole, LeaderGroup, ChangeLeaderGroup };