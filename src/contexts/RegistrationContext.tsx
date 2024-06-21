import React, { createContext, useContext, useEffect, useState } from "react";
import { sendInschrijving, updateInschrijving } from "../services/registrationService";
import { Navigate, useNavigate } from "react-router-dom";
import Registration from "../types/Registration";
import Group from "../types/Group";

interface RegistrationContextType {
    inschrijving: any;
    setInschrijving: React.Dispatch<React.SetStateAction<any>>;
    updateRegistrationValue: (key: string, value: any) => void;
    errorStates: any;
    submitValues: () => void;
}

const RegistrationContext = React.createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider = ({ children } : { children: React.ReactNode }) => {
    const [inschrijving, setInschrijving] = useState<any>(null);
    const [errorStates, setErrorStates] = useState({
        firstName: "",
        lastName: "",
        birthdate: "",
        gender: "",
        birthplace: "",
        parentFirstName: "",
        parentLastName: "",
        address: "",
        postalCode: "",
        town: "",
        phoneNumber: "",
        email: "",
        secondParentFirstName: "",
        secondParentLastName: "",
        secondAddress: "",
        secondPostalCode: "",
        secondTown: "",
        secondPhoneNumber: "",
        secondEmail: "",
        allowMedia: "",
    });

    const updateRegistrationValue = (key: string, value: any) => {
        const updatedInschrijving = { ...inschrijving };
        updatedInschrijving[key] = value;
        setInschrijving(updatedInschrijving);
    };

    const submitValues = async () => {
        if (inschrijving) {
            console.log(inschrijving);
            console.log("JEEEEJ");
        }
    }

    return (
        <RegistrationContext.Provider value={{ inschrijving, setInschrijving, updateRegistrationValue, errorStates, submitValues }}>
            <div className="inschrijven__container">
                {/* {popupActive && <ConfirmPopup />} */}
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