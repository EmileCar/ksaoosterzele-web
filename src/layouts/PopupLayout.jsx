import React from "react";
import { usePopupContext } from "../contexts/PopupContext";

const PopupLayout = ({ children, closeHandler }) => {
    return (
        <div className="overlay" onClick={closeHandler}>
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={closeHandler}>
                    &times;
                </span>
                {children}
            </div>
        </div>
    );
}

export default PopupLayout;