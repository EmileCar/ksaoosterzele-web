import { useState } from "react";

interface AutoCompleteProps {
    value: string[];
    placeholder?: string;
    suggestions: string[];
    completeMethod: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    inputClassName?: string;
    dropdown?: boolean;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
    value,
    placeholder,
    suggestions,
    completeMethod,
    onChange,
    name,
    inputClassName = "",
    dropdown = false
}) => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="input-wrapper input autocomplete">
            <input
                type="text"
                className={`input ${inputClassName}`}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                name={name}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
            {showDropdown && (
                <div className="autocomplete-dropdown">
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className="autocomplete-item">
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AutoComplete;