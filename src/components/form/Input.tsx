import React from "react";
import "./form.css";
import { useFormContext } from "../../contexts/FormContext";

interface InputProps {
    type: string;
    name: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    customClassName?: string;
    focus?: boolean;
}

const Input: React.FC<InputProps> = ({
    type,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    disabled,
    customClassName = "",
    focus = false
}) => {
    useFormContext();

    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={`input ${customClassName}`}
            autoFocus={focus}
        />
    );
}

export default Input;