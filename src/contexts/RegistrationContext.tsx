import React, { createContext, useContext, useState } from "react";
import { sendInschrijving } from "../services/registrationService";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { SendRegistration } from "../types/Registration";

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

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider = ({ children } : { children: React.ReactNode }) => {
    const { values, errorStates, handleValueChange, setErrors, changeValue } = useForm<SendRegistration>(new SendRegistration({}));

    const [isPending, setIsPending] = useState<boolean>(false);
    const navigate = useNavigate();

    const submitValues = async () => {
        setIsPending(true);
        setErrors(null);
        await sendInschrijving(values, "POST").then(() => {
            setIsPending(false);
            localStorage.setItem("inschrijvingData", JSON.stringify(values));
            navigate('/inschrijven/bevestiging');
        }).catch((errors: any) => {
            setTimeout(() => {
                setErrors(errors.errorFields);
                setIsPending(false);
            }, 800)
        });
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