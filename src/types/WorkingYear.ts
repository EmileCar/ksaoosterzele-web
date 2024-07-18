class WorkingYear {
    id: number | null;
    name: string;
    startYear: number;
    registrationCount: number;
    leaderCount: number;

    constructor(workingYearData?: any) {
        this.id = workingYearData.id || null;
        this.name = workingYearData.name || null;
        this.startYear = workingYearData.start_year || null;
        this.registrationCount = workingYearData.registration_count || null;
        this.leaderCount = workingYearData.leader_count || null;
    }
}

class SendWorkingYear {
    name: string;
    startYear: number;

    constructor(workingYearData?: any) {
        this.name = workingYearData.name || null;
        this.startYear = workingYearData.startYear || null;
    }
}

export default WorkingYear;
export { SendWorkingYear };