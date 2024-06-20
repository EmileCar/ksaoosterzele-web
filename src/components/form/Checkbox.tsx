import React from "react";

interface CheckboxProps {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
    customClassName?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
    name,
    value,
    onChange,
    checked,
    customClassName = ""
}) => {
    return (
        <>
            <input
                id="customCheckbox"
                className={`custom-checkbox ${customClassName}`}
                onChange={onChange}
                type="checkbox"
                name={name}
                value={value}
                checked={checked}
            />
            <label htmlFor="customCheckbox" className="checkbox-label"></label>
        </>
    );
}

export default Checkbox;
