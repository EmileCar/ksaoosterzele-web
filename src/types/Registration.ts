import Group from "./Group";

class Registration {
    id: number | null;
    group: Group;
    firstName: string;
    lastName: string;
    birthdate: Date;
    gender: string;
    birthplace: string;
    parentFirstName: string;
    parentLastName: string;
    address: string;
    postalCode: number;
    town: string;
    phoneNumber: string;
    telephoneNumber: string;
    email: string;
    secondParentFirstName: string;
    secondParentLastName: string;
    secondAddress: string;
    secondPostalCode: number;
    secondTown: string;
    secondPhoneNumber: string;
    secondTelephoneNumber: string;
    secondEmail: string;
    allowMedia: boolean;

    constructor(registrationData?: any) {
        this.id = registrationData.id || null;
        this.group = registrationData.tak || null;

        this.firstName = registrationData.first_name || null;
        this.lastName = registrationData.last_name || null;
        this.birthdate = registrationData.birthdate || null;
        this.gender = registrationData.gender || null;
        this.birthplace = registrationData.birthplace || null;

        this.parentFirstName = registrationData.parent_first_name || null;
        this.parentLastName = registrationData.parent_last_name || null;
        this.address = registrationData.address || null;
        this.postalCode = registrationData.postal_code || null;
        this.town = registrationData.town || null;
        this.phoneNumber = registrationData.phone_number || null;
        this.telephoneNumber = registrationData.telephone_number || null;
        this.email = registrationData.email || null;

        this.secondParentFirstName = registrationData.second_parent_first_name || null;
        this.secondParentLastName = registrationData.second_parent_last_name || null;
        this.secondAddress = registrationData.second_address || null;
        this.secondPostalCode = registrationData.second_postal_code || null;
        this.secondTown = registrationData.second_town || null;
        this.secondPhoneNumber = registrationData.second_phone_number || null;
        this.secondTelephoneNumber = registrationData.second_telephone_number || null;
        this.secondEmail = registrationData.second_email || null;

        this.allowMedia = registrationData.allow_media || null;
    }

    validateTeaser() {
        const errors = [];
        if (!this.group) {
            errors.push('Tak is verplicht');
        }
        return errors;
    }
}

export default Registration;
