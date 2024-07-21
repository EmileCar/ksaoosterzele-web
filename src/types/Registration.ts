import Group from "./Group";

class Registration {
    id: number | null;
    group: Group | null;
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
    createdAt: Date;
    updatedAt: Date;

    constructor(registrationData?: any) {
        this.id = registrationData.id || null;
        this.group = registrationData.group ? new Group(registrationData.group) : null;
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
        this.createdAt = new Date(registrationData.created_at) || null;
        this.updatedAt = new Date(registrationData.updated_at) || null;
    }
}

class SendRegistration {
    id: number | null;
    groupId: number;
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

    constructor(registration?: any) {
        this.id = registration?.id || null;
        this.groupId = registration?.group?.id ?? null;
        this.firstName = registration.firstName || null;
        this.lastName = registration.lastName || null;
        this.birthdate = registration.birthdate || null;
        this.gender = registration.gender || null;
        this.birthplace = registration.birthplace || null;
        this.parentFirstName = registration.parentFirstName || null;
        this.parentLastName = registration.parentLastName || null;
        this.address = registration.address || null;
        this.postalCode = registration.postalCode || null;
        this.town = registration.town || null;
        this.phoneNumber = registration.phoneNumber || null;
        this.telephoneNumber = registration.telephoneNumber || null;
        this.email = registration.email || null;
        this.secondParentFirstName = registration.secondParentFirstName || null;
        this.secondParentLastName = registration.secondParentLastName || null;
        this.secondAddress = registration.secondAddress || null;
        this.secondPostalCode = registration.secondPostalCode || null;
        this.secondTown = registration.secondTown || null;
        this.secondPhoneNumber = registration.secondPhoneNumber || null;
        this.secondTelephoneNumber = registration.secondTelephoneNumber || null;
        this.secondEmail = registration.secondEmail || null;
        this.allowMedia = registration.allowMedia || null;
    }
}

export default Registration;
export { SendRegistration };