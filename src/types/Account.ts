class Account {
    id: number | null;
    username: string;
    email: string;
    role: AccountRole;

    constructor(accountData?: any) {
        this.id = accountData.id || null;
        this.username = accountData.username || null;
        this.email = accountData.email || null;
        this.role = new AccountRole(accountData.role) || null;
    }
}

class AccountRole {
    id: number | null;
    name: string;

    constructor(accountRoleData?: any) {
        this.id = accountRoleData.id || null;
        this.name = accountRoleData.name || null;
    }
}

export default Account;