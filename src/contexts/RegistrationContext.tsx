import React, { createContext, useContext, useEffect, useState } from "react";
import { sendInschrijving, updateInschrijving } from "../services/registrationService";
import { Navigate, useNavigate } from "react-router-dom";
import Registration, { SendRegistration } from "../types/Registration";
import Group from "../types/Group";
import FetchedDataLayout from "../layouts/FetchedDataLayout";
import useForm from "../hooks/useForm";

interface RegistrationContextType {
    values: any;
    handleValueChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    errorStates: any;
    submitValues: () => void;
    isPending: boolean;
    setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
    setErrors: (errors: any) => void;
    changeValue: (name: string, value: any) => void;
}

const RegistrationContext = React.createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider = ({ children } : { children: React.ReactNode }) => {
    const { values, errorStates, handleValueChange, setErrors, changeValue } = useForm<SendRegistration>(new SendRegistration({}));
   
    const [isPending, setIsPending] = useState<boolean>(false);
    const navigate = useNavigate();

    const submitValues = async () => {
        setIsPending(true);
        setErrors(null);
        await sendInschrijving(values).catch((errors: any) => {
            console.log(errors)
            setTimeout(() => {
                setIsPending(false);
                setErrors(errors.errorFields);
            }, 800)
        });
        setIsPending(false);
    }

    return (
        <RegistrationContext.Provider value={{ values, handleValueChange, setErrors, errorStates, submitValues, isPending, setIsPending, changeValue }}>
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