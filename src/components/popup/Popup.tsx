import React from "react";
import "./Popup.css";
import SectionTitle from "../sectionTitle/SectionTitle";
import LoadingText from "../loading/LoadingText";

interface PopupProps {
    children: React.ReactNode;
    title: string;
    onClose?: () => void;
    isPending?: boolean;
    globalError?: string;
}

const Popup: React.FC<PopupProps> = ({ children, title, onClose, isPending, globalError }) => {
    const closeHandler = () => {
        if (onClose) onClose();
    };

    return (
        <div className="overlay" onClick={closeHandler}>
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={closeHandler}>
                    &times;
                </span>
                <SectionTitle title={title ? title : "Geen naam"} />
                {isPending && <LoadingText />}
                {globalError && <div className="error" style={{ marginBottom: "1rem" }}>{globalError}</div>}
                {children ? children : <p>Lege popup. Hier heb je niks te zoeken...</p>}
            </div>
        </div>
    );
};

export default Popup;