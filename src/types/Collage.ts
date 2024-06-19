import CollageType from "./CollageType";

class Collage {
    id: number | null;
    displayName: string;
    name: string;
    date: Date;
    active: boolean;
    types: CollageType[];

    constructor(collageData?: any) {
        this.id = collageData.id || null;
        this.displayName = collageData.display_name || null;
        this.name = collageData.internal_name || null;
        this.date = new Date(collageData.date) || new Date();
        this.active = collageData.active || false;
        this.types = collageData.types || [];
    }

    // validate(){
    //     let errors = {};

    //     if(this.displayName === ""){
    //         errors.displayName = "Zichtbare naam mag niet leeg zijn";
    //     }

    //     if(this.name === ""){
    //         errors.name = "Naam mag niet leeg zijn";
    //     }

    //     if(this.date === ""){
    //         errors.date = "Datum mag niet leeg zijn";
    //     }

    //     return errors;
    // }
}

export default Collage;