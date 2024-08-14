import React, { createContext, useContext, useEffect, useState } from "react";
import { sendInschrijving } from "../services/registrationService";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { SendRegistration } from "../types/Registration";

interface RegistrationContextType {
    values: any;
    handleValueChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    setErrors: (errors: any) => void;
    errorStates: any;
    submitValues: () => void;
    isPending: boolean;
    changeValue: (name: string, value: any) => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider = ({ children } : { children: React.ReactNode }) => {
    const { values, errorStates, handleValueChange, setErrors, changeValue, submitPending, handleSubmitForm } = useForm<SendRegistration>(new SendRegistration({}), sendInschrijving);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("---------")
        console.log(values);
        console.log(values.notEmpty())
    } , [values]);

    const submitValues = async () => {
        await handleSubmitForm("POST", () => {
            localStorage.setItem("inschrijvingData", JSON.stringify(values));
            navigate('/inschrijven/bevestiging');
        });
    }

    return (
        <RegistrationContext.Provider value={{ values, handleValueChange, setErrors, errorStates, submitValues, isPending: submitPending, changeValue }}>
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