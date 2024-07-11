import React, { createContext, useState } from 'react';

interface PopupContextProps {
    isActive: boolean;
    openPopup: () => void;
    closePopup: () => void;
}

export const PopupContext = createContext<PopupContextProps>({
    isActive: false,
    openPopup: () => {},
    closePopup: () => {},
});

export const PopupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isActive, setIsActive] = useState(false);

    const openPopup = () => {
        setIsActive(true);
    };

    const closePopup = () => {
        setIsActive(false);
    };

    return (
        <PopupContext.Provider value={{ isActive, openPopup, closePopup }}>
            {isActive ? (
                <>
                    <div style={{ height:"100vh", overflow: "hidden", position: "relative" }}>
                        {children}
                    </div>
                </>

            ) : (
                <React.Fragment>{children}</React.Fragment>
            )}
        </PopupContext.Provider>
    );
};