import React from 'react';
import './Button.css';

interface ButtonProps {
    text: string;
    onClick: () => void;
    fullWidth?: boolean;
    disabled?: boolean;
    uppercase?: boolean;
    customClassName?: string;
    hover?: boolean;
    darken?: boolean;
    round?: boolean;
    inverted?: boolean;
    submit?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    text,
    onClick,
    fullWidth = false,
    disabled = false,
    uppercase = false,
    customClassName = '',
    hover = false,
    darken = false,
    round = false,
    inverted = false,
    submit = false,
}) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onClick();
    };

    return (
        <button
            onClick={handleClick}
            className={`button inherit-font
                ${customClassName}
                ${hover ? 'hover' : ''}
                ${darken ? 'darken' : ''}
                ${uppercase ? 'uppercase' : ''}
                ${inverted ? 'inverted' : ''}
                ${submit ? 'submit' : ''}
                ${fullWidth ? 'full-width' : ''}`}
            disabled={disabled}
            style={{ borderRadius: round ? '50px' : '5px' }}
        >
            {text}
        </button>
    );
};

export default Button;
