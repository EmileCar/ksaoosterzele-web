class CollageType {
    id: number | null;
    name: string;

    constructor(collageTypeData?: any) {
        this.id = collageTypeData.id || null;
        this.name = collageTypeData.name || null;
    }
}

export default CollageType;