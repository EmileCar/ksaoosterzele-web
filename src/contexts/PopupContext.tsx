import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PopupContextProps {
    registerPopup: (popup: React.ReactNode) => void;
    closePopup: () => void;
}

export const PopupContext = createContext<PopupContextProps>({
    registerPopup: () => {},
    closePopup: () => {},
});

export const PopupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [popup, setPopup] = useState<React.ReactNode>(null);
    const location = useLocation();

    const registerPopup = (popup: React.ReactNode) => {
        setPopup(popup);
    };

    const closePopup = () => {
        setPopup(null);
    };

    useEffect(() => {
        if (popup) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [popup]);

    useEffect(() => {
        closePopup();
    }, [location]);

    return (
        <PopupContext.Provider value={{ registerPopup, closePopup }}>
            <div className='page-root'>
                {children}
            </div>
            {popup && popup}
        </PopupContext.Provider>
    );
};

export const usePopupContext = () => {
    return useContext(PopupContext);
};
