import React, { useState, useEffect, useRef } from "react";

interface AutoCompleteProps {
    value: string[] | string;
    placeholder?: string;
    suggestions: string[];
    completeMethod: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    dropdown?: boolean;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
    value,
    placeholder,
    suggestions,
    completeMethod,
    onChange,
    name,
    dropdown = false
}) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (inputValue === "") {
            setFilteredSuggestions(suggestions);
        } else {
            setFilteredSuggestions(suggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(inputValue.toLowerCase())
            ));
        }
    }, [inputValue, suggestions]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        completeMethod(event);
    };

    const handleSuggestionClick = (suggestion: string) => {
        if (Array.isArray(value)) {
            const newValues = [...value, suggestion];
            onChange({ target: { value: newValues, name } } as unknown as React.ChangeEvent<HTMLInputElement>);
        } else {
            onChange({ target: { value: suggestion, name } } as unknown as React.ChangeEvent<HTMLInputElement>);
        }
        setInputValue("");
        setShowSuggestions(false);
    };

    const handleRemoveValue = (index: number) => {
        if (Array.isArray(value)) {
            const newValues = value.filter((_, i) => i !== index);
            onChange({ target: { value: newValues, name } } as unknown as React.ChangeEvent<HTMLInputElement>);
        }
    };

    return (
        <div className="autocomplete-wrapper" ref={wrapperRef}>
            {Array.isArray(value) && (
                <div className="autocomplete-values">
                    {value.map((val, index) => (
                        <div key={index} className="autocomplete-value">
                            {val}
                            <span onClick={() => handleRemoveValue(index)} className="autocomplete-value-delete">&times;</span>
                        </div>
                    ))}
                </div>
            )}
            <input
                type="text"
                className="inherit-font autocomplete-input"
                value={inputValue}
                placeholder={placeholder}
                onChange={handleInputChange}
                name={name}
                onFocus={() => setShowSuggestions(true)}
            />
            {showSuggestions && (
                <div className="autocomplete-suggestions">
                    {filteredSuggestions.length === 0 ? (
                        <div className="autocomplete-suggestion no-suggestions">
                            Geen beschikbare types
                        </div>
                    ) : filteredSuggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="autocomplete-suggestion"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
            {dropdown &&
                <div className="autocomplete-dropdown" onClick={() => setShowSuggestions(!showSuggestions)}>
                    <i className="pi pi-chevron-down" style={{color: "white"}}></i>
                </div>
            }
        </div>
    );
}

export default AutoComplete;
