import React from 'react';
import FormContext from '../../contexts/FormContext';

interface FormProps {
    onSubmit?: () => void;
    customClassName?: string;
    children: any;
}

const Form: React.FC<FormProps> = ({ onSubmit, customClassName = "", children }) => {
    return (
        <FormContext.Provider value={true}>
            <form className={`form ${customClassName}`} onSubmit={onSubmit}>
                {children}
            </form>
        </FormContext.Provider>
    );
}

export default Form;
