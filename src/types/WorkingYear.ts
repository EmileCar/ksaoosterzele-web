class WorkingYear {
    id: number | null;
    name: string;
    startYear: number;
    current: boolean;

    constructor(workingYearData?: any) {
        this.id = workingYearData.id || null;
        this.name = workingYearData.name || null;
        this.startYear = workingYearData.start_year || null;
        this.current = workingYearData.current || null;
    }
}

export default WorkingYear;