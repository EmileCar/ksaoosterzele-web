import React from "react";

interface InputProps {
    type: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    customClassName?: string;
}

const Input: React.FC<InputProps> = ({
    type,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    disabled,
    customClassName = ""
}) => {
    return (
        <input
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={`input ${customClassName}`}
        />
    );
}

export default Input;