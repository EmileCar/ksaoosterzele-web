import React from 'react';
import FormContext from '../../contexts/FormContext';
import { classNames } from '../../utils/classNameUtil';

interface FormProps {
    onSubmit?: () => void;
    customClassName?: string;
    children: any;
    disabled?: boolean;
}

const Form: React.FC<FormProps> = ({ onSubmit, customClassName = "", disabled, children }) => {
    return (
        <FormContext.Provider value={true}>
            <form
                className={classNames(
                    'form',
                    customClassName,
                    disabled && 'disabled'
                )}
                onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit(); }}
            >
                {children}
            </form>
        </FormContext.Provider>
    );
}

export default Form;
