import React, { createContext, useContext, useEffect, useState } from "react";
import { sendInschrijving, updateInschrijving } from "../services/registrationService";
import { Navigate, useNavigate } from "react-router-dom";
import Registration from "../types/Registration";
import Group from "../types/Group";

interface RegistrationContextType {
    inschrijving: Registration | null;
    setInschrijving: React.Dispatch<React.SetStateAction<Registration | null>>;
    updateRegistrationValue: (key: string, value: any) => void;
    errorStates: any;
}

const RegistrationContext = React.createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider = ({ children } : { children: React.ReactNode }) => {
    const [inschrijving, setInschrijving] = useState<Registration | null>(null);
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
        setInschrijving(prevInschrijving => {
            if (prevInschrijving) {
                const updatedInschrijving = new Registration({ ...prevInschrijving, [key]: value });
                console.log(updatedInschrijving);
                return updatedInschrijving;
            }
            return null;
        });
    };

    return (
        <RegistrationContext.Provider value={{ inschrijving, setInschrijving, updateRegistrationValue, errorStates }}>
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