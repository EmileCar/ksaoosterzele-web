class Group {
    id: number | null;
    name: string;
    startAge: number;
    endAge: number;
    description: string;
    ageRange: string;
    imageFileName: string;

    constructor(groupData: any) {
        this.id = groupData.id || null;
        this.name = groupData.name || null;
        this.startAge = groupData.start_age || null;
        this.endAge = groupData.end_age || null;
        this.description = groupData.description || null;
        this.ageRange = groupData.age_range || null;
        this.imageFileName = groupData.image_file_name || null;
    }
}

export default Group;
