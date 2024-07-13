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
    phoneNumber: string;
    email: string;
    imageFileName: string;
    description: string;
    role: LeaderRole;

    constructor(leaderData?: any) {
        this.id = leaderData.id || null;
        this.firstName = leaderData.first_name || null;
        this.lastName = leaderData.last_name || null;
        this.birthdate = leaderData.birthdate || null;
        this.phoneNumber = leaderData.phone_number || null;
        this.email = leaderData.email || null;
        this.imageFileName = leaderData.image_file_name || null;
        this.description = leaderData.description || null;
        this.role = new LeaderRole(leaderData.role) || null;
    }
}

class SendLeader {
    id: number | null;
    firstName: string;
    lastName: string;
    birthdate: Date | null;
    phoneNumber: string;
    email: string;
    imageFileName: string;
    description: string;

    constructor(leaderData?: any) {
        this.id = leaderData.id || null;
        this.firstName = leaderData.firstName || null;
        this.lastName = leaderData.lastName || null;
        this.birthdate = leaderData.birthdate ? new Date(leaderData.birthdate) : null;
        this.phoneNumber = leaderData.phoneNumber || null;
        this.email = leaderData.email || null;
        this.imageFileName = leaderData.imageFileName || null;
        this.description = leaderData.description || null;
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

export default Leader;
export { LeadersGroupedResult, SendLeader };