import React, { createContext, useContext, useEffect, useState } from "react";
import { sendInschrijving, updateInschrijving } from "../services/registrationService";
import { Navigate, useNavigate } from "react-router-dom";
import Registration from "../types/Registration";
import Group from "../types/Group";

const RegistrationContext = createContext<any>(null);

export const RegistrationProvider = ({ children } : { children: React.ReactNode }) => {
    const [inschrijving, setInschrijving] = useState<Registration | null>(null);

    return (
        <RegistrationContext.Provider value={{ inschrijving, setInschrijving }}>
            <div className="inschrijven__container">
                {/* {popupActive && <ConfirmPopup />} */}
                {children}
            </div>
        </RegistrationContext.Provider>
    );
};

export const useRegistrationContext = () => useContext(RegistrationContext);