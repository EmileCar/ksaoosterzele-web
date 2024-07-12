class LeadersByRoleResult {
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
    birthdate: Date;
    phoneNumber: string;
    email: string;
    imageFileName: string;

    constructor(leaderData?: any) {
        this.id = leaderData.id || null;
        this.firstName = leaderData.first_name || null;
        this.lastName = leaderData.last_name || null;
        this.birthdate = leaderData.birthdate || null;
        this.phoneNumber = leaderData.phone_number || null;
        this.email = leaderData.email || null;
        this.imageFileName = leaderData.image_file_name || null;
    }
}

export default Leader;
export { LeadersByRoleResult };