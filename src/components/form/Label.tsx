import React from "react";
import "./form.css";

interface LabelProps {
    text: string;
    customClassName?: string;
    children?: React.ReactNode;
    errorMessage?: string;
    required?: boolean;
}

const Label: React.FC<LabelProps> = ({
    text,
    customClassName = '',
    children,
    errorMessage,
    required
}) => {
    return (
        <label className={`label ${customClassName} ${errorMessage ? "error" : ''}`}>
            {text} {required && <span className="verplicht">*</span>}
            {children}
            {errorMessage && <small className="error-message">{errorMessage}</small>}
        </label>
    );
}

export default Label;