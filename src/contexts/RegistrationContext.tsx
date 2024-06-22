import React, { createContext, useContext, useEffect, useState } from "react";
import { sendInschrijving, updateInschrijving } from "../services/registrationService";
import { Navigate, useNavigate } from "react-router-dom";
import Registration from "../types/Registration";
import Group from "../types/Group";
import FetchedDataLayout from "../layouts/FetchedDataLayout";

interface RegistrationContextType {
    inschrijving: any;
    setInschrijving: React.Dispatch<React.SetStateAction<any>>;
    updateRegistrationValue: (key: string, value: any) => void;
    errorStates: any;
    submitValues: () => void;
    isPending: boolean;
    setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegistrationContext = React.createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider = ({ children } : { children: React.ReactNode }) => {
    const [inschrijving, setInschrijving] = useState<any>(null);
    const [errorStates, setErrorStates] = useState<any>({
        groupError: "",
        firstNameError: "",
        lastNameError: "",
        birthdateError: "",
        genderError: "",
        birthplaceError: "",
        parentFirstNameError: "",
        parentLastNameError: "",
        addressError: "",
        postalCodeError: "",
        townError: "",
        phoneNumberError: "",
        telephoneNumberError: "",
        emailError: "",
        secondParentFirstNameError: "",
        secondParentLastNameError: "",
        secondAddressError: "",
        secondPostalCodeError: "",
        secondTownError: "",
        secondPhoneNumberError: "",
        secondTelephoneNumberError: "",
        secondEmailError: "",
        allowMediaError: "",
    });
    const [isPending, setIsPending] = useState<boolean>(false);
    const navigate = useNavigate();

    const updateRegistrationValue = (key: string, value: any) => {
        const updatedInschrijving = { ...inschrijving };
        updatedInschrijving[key] = value;
        console.log(updatedInschrijving);
        setInschrijving(updatedInschrijving);
        setErrorStates({ ...errorStates, [`${key}Error`]: "" });
    };

    const submitValues = async () => {
        try {
            setIsPending(true);
            setErrorStates({});
            const registration = new Registration(inschrijving);
            console.log(registration);
            await sendInschrijving(registration);
            // GOOD
            navigate("/inschrijven/success");
        } catch (errors: any) {
            setTimeout(() => {
                setIsPending(false);
                setErrorStates(errors.errorFields);
            }, 800)
        }
    }

    return (
        <RegistrationContext.Provider value={{ inschrijving, setInschrijving, updateRegistrationValue, errorStates, submitValues, isPending, setIsPending }}>
            <div className="inschrijven__container" style={{marginTop: "2rem"}}>
                {children}
            </div>
        </RegistrationContext.Provider>
    );
};

export const useRegistrationContext = () => {
    const context = useContext(RegistrationContext);
    if (context === undefined) {
      throw new Error('useRegistrationContext must be used within a RegistrationProvider');
    }
    return context;
};